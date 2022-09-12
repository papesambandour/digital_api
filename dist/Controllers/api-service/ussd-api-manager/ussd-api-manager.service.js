"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssdApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Transactions_entity_1 = require("../../../Models/Entities/Transactions.entity");
const sockets_gateway_1 = require("../../../Sockets/sockets.gateway");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const UssdExecutionMessages_entity_1 = require("../../../Models/Entities/UssdExecutionMessages.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
class UssdApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async initTransaction(params) {
        const phone = await this.loadBalancingPhone();
        const baseResponse = {
            phone: params.dto.phone,
            amount: params.dto.amount.toString(),
            externalTransactionId: params.dto.externalTransactionId,
            codeService: params.dto.codeService,
            callbackUrl: params.dto.callbackUrl,
        };
        if (!phone) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE,
            }, baseResponse);
        }
        const transaction = await this.createTransaction(phone);
        let runSuccess;
        if (this.apiService.sousServices.executeType === 'SEND_USSD_CODE_SMS') {
            runSuccess = await this.executeSms(transaction, phone, params);
        }
        else {
            runSuccess = await this.executeUssdCall(phone, transaction);
        }
        if (!runSuccess) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                transaction: transaction,
                transactionId: transaction.transactionId,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE.replace('pho', 'pho-2'),
                usedPhoneId: phone.id,
                refundOnFailed: true,
            }, baseResponse);
        }
        return Object.assign({
            status: Enum_entity_1.StatusEnum.PENDING,
            codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
            partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE,
            transaction: transaction,
            transactionId: transaction.transactionId,
            usedPhoneId: phone.id,
        }, baseResponse);
    }
    async checkStatusTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async confirmTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async handleCallbackTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async refundTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async executeUssdCall(phone, transaction) {
        let ussdCode = this.getUssDCode(this.apiService.sousServices.ussdCode, phone);
        ussdCode += `-${transaction.id}`;
        const socket = sockets_gateway_1.SocketsGateway.getSocket(phone.number);
        let clearId;
        if (socket) {
            return new Promise(async (resolve) => {
                console.log('SOCKET', socket);
                socket.on('finishExecUssd', async (data) => {
                    clearTimeout(clearId);
                    console.log('DATA_SOCKET', data);
                    socket.removeAllListeners('finishExecUssd');
                    resolve(await this.finishExecUssd(data, transaction));
                    this.activePhone(this.apiService.phone.id, this.apiService.phone.number).then((value) => value);
                });
                socket.emit('execUssd', ussdCode);
                clearId = setTimeout(() => {
                    console.log('WAIT RETOUR USSD');
                    const statues = this.helper.getStatusAfterExec('timeout', this.apiService.sousServices);
                    const preStatus = statues['preStatus'];
                    const status = statues['status'];
                    this.apiService.connection
                        .query(`update transactions
                             set pre_statut= '${preStatus}',
                                 ussd_response_match= 0,
                                 statut_ussd_response= '${Enum_entity_1.EnumValidationStatus.TIME_OUT}',
                                 code_ussd_response= '${Enum_entity_1.EnumCodeUssdResponse.TIME_OUT}'
                             where id = ${this.apiService.transactionId}
                               AND statut <> '${status}'`)
                        .then((value) => value);
                    resolve(this.helper.isNotCancelable(preStatus, status));
                    this.activePhone(this.apiService.phone.id, this.apiService.phone.number).then((value) => value);
                }, Enum_entity_1.CONSTANT.WAIT_SOCKET_PHONE() * 1000);
                console.log('SOCKET CALL', ussdCode);
            });
        }
        console.log('SOCKET INJOIGNABLE');
        const statues = this.helper.getStatusAfterExec('timeout', this.apiService.sousServices);
        const preStatus = statues['preStatus'];
        const status = statues['status'];
        this.activePhone(this.apiService.phone.id, this.apiService.phone.number).then((value) => value);
        await Transactions_entity_1.Transactions.update(transaction.id, {
            statut: status,
            preStatut: preStatus,
            errorMessage: 'Telephone injoignable',
            dateFailled: new Date(),
        });
        return false;
    }
    async finishExecUssd(socketBodyFinish, transaction) {
        try {
            socketBodyFinish = JSON.parse(socketBodyFinish + '');
        }
        catch (e) {
            console.log(`Message erreur from Sim USSD`, socketBodyFinish.toString());
            return true;
        }
        UssdExecutionMessages_entity_1.UssdExecutionMessages.insert({
            transationsId: this.apiService.transactionId,
            phonesId: this.apiService.phone.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            message: main_1.serializeData(socketBodyFinish),
            state: Enum_entity_1.StateEnum.ACTIVED,
        }).then((value) => value);
        console.log('ussdMesage-', socketBodyFinish);
        const statutUssdResponse = socketBodyFinish.state === 'FAILED'
            ? Enum_entity_1.EnumCodeUssdResponse.ERROR
            : Enum_entity_1.EnumCodeUssdResponse.SUCCESS;
        const regex = new RegExp(this.apiService.sousServices.messageRetourUssd);
        const regexMatched = regex.test(socketBodyFinish.data);
        let matchError = null;
        if (!regexMatched) {
            matchError = await this.helper.getErrorType(socketBodyFinish.data, this.apiService.operationInDto.codeService, this.apiService.operationInDto.amount.toString());
            if (matchError) {
                await this.helper.provideErrorType(transaction, null, matchError);
            }
            else {
                this.helper.alertForUnknownResponse(socketBodyFinish.data, this.apiService.operationInDto.codeService, this.apiService.transactionId);
            }
        }
        const statues = this.helper.getStatusAfterExec(regexMatched || !matchError ? 'success' : 'failed', this.apiService.sousServices);
        const preStatus = statues['preStatus'];
        const status = statues['status'];
        await this.apiService.connection.query(`update transactions
                 set date_processing= '${this.helper.mysqlDate(new Date())}',
                     date_pre_success= '${this.helper.mysqlDate(new Date())}',
                     code_ussd_response= '${statutUssdResponse}',
                     ussd_response_match= 0,
                     statut_ussd_response= '${Enum_entity_1.EnumValidationStatus.SUCCESS}',
                     statut= '${status}',
                     pre_statut= '${preStatus}'
                 where id = ${this.apiService.transactionId}
                   AND statut <> '${Enum_entity_1.StatusEnum.SUCCESS}'`);
        return this.helper.isNotCancelable(preStatus, status);
    }
    getUssDCode(regexCodeUss, phone) {
        return regexCodeUss
            .replace('amount', String(this.apiService.operationInDto.amount))
            .replace('number', this.apiService.operationInDto.phone)
            .replace('mvm_number', phone.number)
            .replace('code', phone.codeSecret);
    }
    getBalance(params) {
        console.log(params);
        return Promise.resolve({
            success: false,
            newBalance: null,
        });
    }
    async executeSms(transaction, phone, params) {
        const ussdCode = this.getUssDCode(this.apiService.sousServices.ussdCode, phone);
        transaction.message = ussdCode;
        transaction.needCheckTransaction = 1;
        transaction.deepLinkUrl = `tel:${encodeURIComponent(ussdCode)}`;
        await transaction.save();
        const deepLink = `${process.env.APP_INTERNAL_URL}/deep/${transaction.transactionId}`;
        const messageNotification = this.helper.getDeepLinkNotificationMessage(transaction, deepLink);
        this.helper
            .sendSms([
            `+${this.apiService.sousServices.executeCountryCallCodeWithoutPlus}${params.dto.phone}`,
        ], messageNotification, this.apiService.sousServices.executeSmsSender, true)
            .then();
        this.activePhone(this.apiService.phone.id, this.apiService.phone.number).then((value) => value);
        const statues = this.helper.getStatusAfterExec('success', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        await transaction.save();
        return true;
    }
}
exports.UssdApiManagerService = UssdApiManagerService;
//# sourceMappingURL=ussd-api-manager.service.js.map