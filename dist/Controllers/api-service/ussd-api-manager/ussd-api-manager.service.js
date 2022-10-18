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
const typeorm_1 = require("typeorm");
class UssdApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    constructor() {
        super(...arguments);
        this.data = undefined;
    }
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
        let transaction;
        let runSuccess;
        try {
            transaction = await this.createTransaction(phone);
            if (this.apiService.sousServices.executeType === 'SEND_USSD_CODE_SMS') {
                runSuccess = await this.helper.runWithMaxWaitMs(async () => {
                    return await this.executeSms(transaction, phone, params);
                }, Enum_entity_1.CONSTANT.WAIT_SOCKET_PHONE() * 1000);
            }
            else {
                runSuccess = await this.helper.runWithMaxWaitMs(async () => {
                    return await this.executeUssdCall(phone, transaction);
                }, Enum_entity_1.CONSTANT.WAIT_SOCKET_PHONE() * 1000);
            }
        }
        catch (e) {
            console.error(e);
        }
        this.activePhone(phone.id, phone.number).then();
        if (!runSuccess) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                transaction: transaction,
                transactionId: transaction.transactionId,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE.replace('pho', 'pho-2'),
                usedPhoneId: phone.id,
            }, baseResponse);
        }
        if (!transaction) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                transaction: transaction,
                transactionId: transaction === null || transaction === void 0 ? void 0 : transaction.transactionId,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_UNKNOWN_MESSAGE,
                usedPhoneId: phone.id,
            }, baseResponse);
        }
        if (!runSuccess) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                transaction: transaction,
                transactionId: transaction === null || transaction === void 0 ? void 0 : transaction.transactionId,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE.replace('pho', 'pho-2'),
                usedPhoneId: phone.id,
            }, baseResponse);
        }
        return Object.assign({
            status: Enum_entity_1.StatusEnum.PENDING,
            codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
            partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE,
            transaction: transaction,
            transactionId: transaction.transactionId,
            usedPhoneId: phone.id,
            data: this.data || undefined,
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
        try {
            let ussdCode = this.getUssDCode(this.apiService.sousServices.ussdCode, phone);
            ussdCode += `-${transaction.id}`;
            console.log(ussdCode, 'ussd');
            const socket = await sockets_gateway_1.SocketsGateway.getSocket(phone.number);
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
                    let ackReceive = false;
                    socket.emit('execUssd', ussdCode, (ack) => {
                        console.log('ack', ack);
                        ackReceive = true;
                    });
                    clearId = setTimeout(async () => {
                        try {
                            console.log('WAIT RETOUR USSD');
                            const statues = this.helper.getStatusAfterExec('timeout', this.apiService.sousServices);
                            const preStatus = statues['preStatus'];
                            const status = statues['status'];
                            console.log('setting ressponse phone');
                            const query = `update transactions
                                 set pre_statut= '${preStatus}',
                                     ussd_response_match= 0,
                                     statut_ussd_response= '${ackReceive
                                ? Enum_entity_1.EnumValidationStatus.TIME_OUT_WITH_ACK
                                : Enum_entity_1.EnumValidationStatus.TIME_OUT}',
                                     code_ussd_response= '${ackReceive
                                ? Enum_entity_1.EnumCodeUssdResponse.TIME_OUT_WITH_ACK
                                : Enum_entity_1.EnumCodeUssdResponse.TIME_OUT}'
                                 where id = ${this.apiService.transactionId}
                                   AND statut <> '${status}'`;
                            console.log('setting ressponse phone', query);
                            await this.apiService.connection.query(query);
                            await transaction.reload();
                            resolve(this.helper.isNotCancelable(preStatus, status));
                            console.log('activing phone');
                            this.activePhone(this.apiService.phone.id, this.apiService.phone.number).then((value) => value);
                            this.rebootPhoneIfTimeOutAck(phone, transaction.id, ackReceive).then();
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }, Enum_entity_1.CONSTANT.WAIT_SOCKET_PHONE() * 1000);
                    console.log('SOCKET CALL', ussdCode);
                });
            }
            const preStatus = Enum_entity_1.StatusEnum.FAILLED;
            const status = Enum_entity_1.StatusEnum.FAILLED;
            this.activePhone(this.apiService.phone.id, this.apiService.phone.number).then((value) => value);
            await Transactions_entity_1.Transactions.update(transaction.id, {
                statut: status,
                preStatut: preStatus,
                errorMessage: 'Telephone injoignable',
                dateFailled: new Date(),
            });
            await transaction.reload();
            return this.helper.isNotCancelable(preStatus, status);
        }
        catch (e) {
            console.log('eerror', e);
        }
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
            sousServicesId: transaction.sousServicesId,
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
            if (matchError === null || matchError === void 0 ? void 0 : matchError.rebootOnError) {
                sockets_gateway_1.SocketsGateway.rebootPhone(this.apiService.phone).then();
            }
            if (matchError) {
                await this.helper.provideErrorType(transaction, null, matchError);
            }
            else {
                this.helper.alertForUnknownResponse(socketBodyFinish.data, this.apiService.operationInDto.codeService, this.apiService.transactionId);
            }
        }
        const execSuccess = regexMatched || !matchError;
        const statues = this.helper.getStatusAfterExec(execSuccess ? 'success' : 'failed', this.apiService.sousServices);
        const preStatus = statues['preStatus'];
        const status = statues['status'];
        await Transactions_entity_1.Transactions.update({
            statut: typeorm_1.Not(Enum_entity_1.StatusEnum.SUCCESS),
            id: transaction.id,
        }, {
            dateProcessing: new Date(),
            datePreSuccess: new Date(),
            codeUssdResponse: statutUssdResponse,
            ussdResponseMatch: regexMatched ? 1 : 0,
            statutUssdResponse: Enum_entity_1.EnumValidationStatus.SUCCESS,
            statut: status,
            preStatut: preStatus,
            message: execSuccess ? socketBodyFinish.data : null,
            errorMessage: !execSuccess ? socketBodyFinish.data : null,
        });
        await transaction.reload();
        return this.helper.isNotCancelable(preStatus, status);
    }
    getUssDCode(regexCodeUss, phone) {
        return regexCodeUss
            .replace(/amount/g, String(this.apiService.operationInDto.amount))
            .replace(/mvm_number/g, phone.number)
            .replace(/number/g, this.apiService.operationInDto.phone)
            .replace(/code/g, phone.codeSecret);
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
        const messageNotification = await this.helper.getDeepLinkNotificationMessage(transaction, deepLink);
        this.activePhone(this.apiService.phone.id, this.apiService.phone.number).then((value) => value);
        const statues = this.helper.getStatusAfterExec('success', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        await transaction.save();
        this.data = {
            notificationMessage: messageNotification,
            amount: transaction.amount,
            deepLinkUrl: deepLink,
            _be_removed_deepLinkUrl: `tel:${encodeURIComponent(ussdCode)}`,
            launch_url: `tel:${encodeURIComponent(ussdCode)}`,
            ussd_code: ussdCode,
        };
        return true;
    }
}
exports.UssdApiManagerService = UssdApiManagerService;
//# sourceMappingURL=ussd-api-manager.service.js.map