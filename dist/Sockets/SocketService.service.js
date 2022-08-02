"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServiceService = void 0;
const common_1 = require("@nestjs/common");
const Transactions_entity_1 = require("../Models/Entities/Transactions.entity");
const Enum_entity_1 = require("../Models/Entities/Enum.entity");
const Phones_entity_1 = require("../Models/Entities/Phones.entity");
const typeorm_1 = require("typeorm");
const DtoActivitiesPhones_1 = require("../Models/Dto/DtoActivitiesPhones");
const ActivitiesPhones_entity_1 = require("../Models/Entities/ActivitiesPhones.entity");
const sockets_gateway_1 = require("./sockets.gateway");
const SocketModels_1 = require("../Models/Custom/SocketModels");
const DtoMessageUssds_1 = require("../Models/Dto/DtoMessageUssds");
const MessageUssds_entity_1 = require("../Models/Entities/MessageUssds.entity");
const SousServicesPhones_entity_1 = require("../Models/Entities/SousServicesPhones.entity");
const SousServices_entity_1 = require("../Models/Entities/SousServices.entity");
const helper_service_1 = require("../helper.service");
let SocketServiceService = class SocketServiceService {
    constructor(httpService, helper) {
        this.httpService = httpService;
        this.helper = helper;
    }
    async leaveRoom(client, room) {
        var _a, _b;
        sockets_gateway_1.SocketsGateway.logger.log(`Client leaveRoom ${room.toUpperCase()} : ${client.id} from ${(_b = (_a = client === null || client === void 0 ? void 0 : client.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.device}`);
        client.leave(room);
        const phone = await Phones_entity_1.Phones.findOne({
            where: {
                number: typeorm_1.Equal(room),
            },
        });
        Phones_entity_1.Phones.update(phone.id, {
            socket: Enum_entity_1.SocketState.DISCONNECTED,
        }).then((data) => console.log('Phone update', data));
        this.activityPhone(phone.id, Enum_entity_1.EnumActivitiesPhones.LEAVE_ROOM).then((data) => console.log('Activity phone inserted', data));
        sockets_gateway_1.SocketsGateway.socket.to(room).emit('leaveRoom', phone);
    }
    async smsReceived(client, socketBody) {
        var _a, _b, _c, _d;
        try {
            socketBody = JSON.parse(socketBody.toString());
        }
        catch (e) {
            console.log('Erreur SMS recever : ', socketBody);
        }
        if (!socketBody) {
            console.log(`Message erreur from Sim `, socketBody.toString());
            return false;
        }
        else {
            console.log(`Message recever SMS`);
        }
        console.log('\n\n\nSOCKET BODY', socketBody, '\n\n\n');
        const sms = new DtoMessageUssds_1.DtoMessageUssds();
        sms.content = (_a = socketBody === null || socketBody === void 0 ? void 0 : socketBody.data) === null || _a === void 0 ? void 0 : _a.content;
        sms.createdAt = new Date();
        let infoTransaction;
        const phone = await Phones_entity_1.Phones.findOne({
            where: {
                number: typeorm_1.Equal(socketBody.room),
            },
        });
        sms.phonesId = phone.id;
        const resMessage = await MessageUssds_entity_1.MessageUssds.insert(sms);
        console.log('SMS INSERT', resMessage);
        sms.id = resMessage.raw.insertId;
        console.log('Phone', phone.number);
        const sousServicesPhones = await SousServicesPhones_entity_1.SousServicesPhones.find({
            where: {
                phonesId: typeorm_1.Equal(phone.id),
            },
        });
        if (sousServicesPhones.length) {
            const sousServices = await SousServices_entity_1.SousServices.find({
                where: {
                    id: typeorm_1.In(sousServicesPhones.map((ssp) => ssp.sousServicesId)),
                    ussdCode: typeorm_1.Not(typeorm_1.IsNull()),
                    regexMessageValidation: typeorm_1.Not(typeorm_1.IsNull()),
                    positionValidationIndex: typeorm_1.Not(typeorm_1.IsNull()),
                    validLength: typeorm_1.Not(typeorm_1.IsNull()),
                },
            });
            console.log('sousServices', sousServices);
            if (sousServices.length) {
                for (let i = 0; i < sousServices.length; i++) {
                    const res = this.getInfoTransaction(sms.content, sousServices[i].regexMessageValidation, JSON.parse(sousServices[i].positionValidationIndex), sousServices[i].validLength);
                    if (res) {
                        infoTransaction = res;
                        infoTransaction.sousService = sousServices[i];
                        break;
                    }
                }
                const dataLimit = new Date();
                dataLimit.setDate(dataLimit.getDate() - Enum_entity_1.CONSTANT.MAX_TIME_VALIDATION_TRX);
                if (infoTransaction) {
                    const transaction = await Transactions_entity_1.Transactions.findOne({
                        where: {
                            amount: typeorm_1.Equal(infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.amount),
                            phone: typeorm_1.Equal(infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.phone),
                            sousServicesId: typeorm_1.Equal((_b = infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.sousService) === null || _b === void 0 ? void 0 : _b.id),
                            statut: typeorm_1.In([Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING]),
                            phonesId: typeorm_1.Equal(phone.id),
                            createdAt: typeorm_1.MoreThanOrEqual(dataLimit),
                        },
                        order: {
                            createdAt: 'DESC',
                        },
                    });
                    console.log('Transaction filter', {
                        amount: infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.amount,
                        phone: infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.phone,
                        sousServicesId: (_c = infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.sousService) === null || _c === void 0 ? void 0 : _c.id,
                        statut: [Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING],
                        phonesId: phone.id,
                        createdAt: dataLimit,
                        sousservice: infoTransaction.sousService,
                        sms: sms,
                    });
                    await Transactions_entity_1.Transactions.update(transaction.id, {
                        dateSuccess: new Date(),
                        statut: Enum_entity_1.StatusEnum.SUCCESS,
                        message: sms === null || sms === void 0 ? void 0 : sms.content,
                        sousServiceTransactionId: infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.transactionId,
                    });
                    await MessageUssds_entity_1.MessageUssds.update(sms.id, {
                        sousServicesId: (_d = infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.sousService) === null || _d === void 0 ? void 0 : _d.id,
                        isMatched: 1,
                    });
                    if (infoTransaction.sousService.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
                        await this.helper.setSoldeTable(-transaction.amount, 'phones', phone.id, 'solde');
                        if (+infoTransaction.sousService.hasSoldeApi) {
                            await this.helper.setSoldeTable(infoTransaction.new_balance, 'phones', phone.id, 'solde_api');
                        }
                        await this.helper.operationPhone(phone, infoTransaction.new_balance, -transaction.amount, transaction.id, infoTransaction.sousService.typeOperation, `Operation de ${infoTransaction.sousService.typeOperation} pour ${infoTransaction.sousService.name} avec le telephone ${phone.number}`);
                    }
                    else if (infoTransaction.sousService.typeOperation ==
                        Enum_entity_1.TypeOperationEnum.CREDIT) {
                        await this.helper.setSoldeTable(transaction.amount -
                            transaction.feeAmount +
                            transaction.commissionAmount, 'parteners', transaction.partenersId, 'solde');
                        await this.helper.setSoldeTable(transaction.amount, 'phones', phone.id, 'solde');
                        if (+infoTransaction.sousService.hasSoldeApi) {
                            await this.helper.setSoldeTable(infoTransaction.new_balance, 'phones', phone.id, 'solde_api');
                        }
                        await this.helper.operationPhone(phone, infoTransaction.new_balance, transaction.amount, transaction.id, infoTransaction.sousService.typeOperation, `Operation de ${infoTransaction.sousService.typeOperation} pour ${infoTransaction.sousService.name} avec le telephone ${phone.number}`);
                    }
                    else {
                        await this.helper.notifyAdmin(`Le service ${infoTransaction.sousService.name} est mal configuré le type d'operation(${infoTransaction.sousService.typeOperation}) est  non pris en charge `, Enum_entity_1.TypeEvenEnum.NO_MATCH_SMS, infoTransaction.sousService);
                    }
                    this.sendCallBack(transaction.id, Enum_entity_1.StatusEnum.SUCCESS).then((data) => {
                        console.log('Res callback', data);
                    });
                }
                else {
                    await MessageUssds_entity_1.MessageUssds.update(sms.id, {
                        isMatched: 0,
                    });
                    await this.helper.notifyAdmin(`Le phone ${phone.number} a envoyé un message qui ne match pas: `, Enum_entity_1.TypeEvenEnum.NO_MATCH_SMS, socketBody);
                }
            }
        }
        else {
            await this.helper.notifyAdmin(`Le phone ${phone.number} est en marche sans service configuré`, Enum_entity_1.TypeEvenEnum.NO_SERVICE_CONFIGURE_TO_PHONE);
        }
    }
    async getTransactionById(transactionId) {
        return await Transactions_entity_1.Transactions.findOne({
            where: {
                id: typeorm_1.Equal(transactionId),
            },
            relations: ['sousServices'],
        });
    }
    async joinRoom(client, room) {
        var _a, _b;
        const code = room.split('-')[1];
        room = room.split('-')[0];
        const phone = await Phones_entity_1.Phones.findOne({
            where: {
                number: typeorm_1.Equal(room),
                codeSecret: code,
                state: Enum_entity_1.StateEnum.ACTIVED,
            },
            relations: ['sousServicesPhones'],
        });
        if (!phone) {
            console.log('Phone not found');
            client.emit('failledToJoinedRoom');
            return false;
        }
        sockets_gateway_1.SocketsGateway.logger.log(`Client joinRoom ${room.toUpperCase()} : ${client === null || client === void 0 ? void 0 : client.id} from ${(_b = (_a = client === null || client === void 0 ? void 0 : client.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.device}`);
        sockets_gateway_1.SocketsGateway.socketInternals = sockets_gateway_1.SocketsGateway.socketInternals.filter((so) => so.room !== room);
        sockets_gateway_1.SocketsGateway.socketInternals.push({
            room: room,
            id: client === null || client === void 0 ? void 0 : client.id,
        });
        client.join(room);
        await Phones_entity_1.Phones.update(phone === null || phone === void 0 ? void 0 : phone.id, {
            socket: Enum_entity_1.SocketState.CONNECTED,
        });
        this.activityPhone(phone.id, Enum_entity_1.EnumActivitiesPhones.JOIN_ROOM).then((data) => console.log('Activity phone inserted', data));
        sockets_gateway_1.SocketsGateway.socket
            .to(room)
            .emit('roomJoined', `${phone === null || phone === void 0 ? void 0 : phone.codeSecret}-${phone === null || phone === void 0 ? void 0 : phone.codeSecret}`);
        console.log('SocketsGateway.socketInternals', sockets_gateway_1.SocketsGateway.socketInternals);
    }
    afterInit(server) {
        sockets_gateway_1.SocketsGateway.logger.log('Init');
        sockets_gateway_1.SocketsGateway.socket = server;
    }
    handleDisconnect(client) {
        var _a, _b, _c, _d, _e, _f;
        sockets_gateway_1.SocketsGateway.logger.log(`Client disconnected: ${client.id} from ${(_b = (_a = client === null || client === void 0 ? void 0 : client.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.device}`);
        console.log('SocketsGateway.socketInternals', sockets_gateway_1.SocketsGateway.socketInternals);
        const socketDisconnected = (_c = sockets_gateway_1.SocketsGateway === null || sockets_gateway_1.SocketsGateway === void 0 ? void 0 : sockets_gateway_1.SocketsGateway.socketInternals) === null || _c === void 0 ? void 0 : _c.find((socketIntern) => (socketIntern === null || socketIntern === void 0 ? void 0 : socketIntern.id) == (client === null || client === void 0 ? void 0 : client.id));
        console.log('socket intern socketDisconnected', socketDisconnected);
        Phones_entity_1.Phones.findOne({
            where: {
                number: typeorm_1.Equal((socketDisconnected === null || socketDisconnected === void 0 ? void 0 : socketDisconnected.room) || ((_e = (_d = client === null || client === void 0 ? void 0 : client.rooms) === null || _d === void 0 ? void 0 : _d.values()) === null || _e === void 0 ? void 0 : _e.next().value)),
            },
        })
            .then((phone) => {
            console.log('|PPP|', phone);
            this.activityPhone(phone.id, Enum_entity_1.EnumActivitiesPhones.LEAVE_ROOM).then((data) => console.log('Activity phone inserted', data));
            Phones_entity_1.Phones.update(phone === null || phone === void 0 ? void 0 : phone.id, {
                socket: Enum_entity_1.SocketState.DISCONNECTED,
            }).then((data) => {
                console.log('Phone updated', data);
            });
        })
            .catch((error) => {
            console.log(error.message);
        });
        sockets_gateway_1.SocketsGateway.socketInternals = (_f = sockets_gateway_1.SocketsGateway === null || sockets_gateway_1.SocketsGateway === void 0 ? void 0 : sockets_gateway_1.SocketsGateway.socketInternals) === null || _f === void 0 ? void 0 : _f.filter((socketIntern) => (socketIntern === null || socketIntern === void 0 ? void 0 : socketIntern.id) != (client === null || client === void 0 ? void 0 : client.id));
    }
    handleConnection(client, ...args) {
        var _a, _b;
        console.log('args', args);
        sockets_gateway_1.SocketsGateway.logger.log(`Client connected: ${client.id} from ${(_b = (_a = client === null || client === void 0 ? void 0 : client.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.device}`);
    }
    async sendCallBack(transactionId, statut) {
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                id: typeorm_1.Equal(transactionId),
            },
        });
        if (!transaction) {
            console.log('Pas de transaction');
            return false;
        }
        let data = {};
        try {
            data = JSON.parse(transaction.data);
        }
        catch (e) {
            data = {};
        }
        const dataSended = {
            code: 2000,
            msg: transaction.commentaire,
            error: false,
            status: statut,
            transaction: {
                phone: transaction.phone,
                amount: transaction.amount,
                codeService: transaction.codeSousService,
                nameService: transaction.sousServiceName,
                commission: transaction.commissionAmount,
                transactionId: transaction.transactionId,
                status: statut,
                externalTransactionId: transaction.externalTransactionId,
                callbackUrl: transaction.urlIpn,
                data: data,
            },
        };
        try {
            const dataResponse = await this.httpService
                .post(transaction.urlIpn, dataSended)
                .toPromise();
            await Transactions_entity_1.Transactions.update(transaction.id, {
                dataSended: JSON.stringify(dataSended),
                dataResponseCallback: `Code Statut=>${dataResponse.status} | ` +
                    dataResponse.data.toString(),
                callbackIsSend: 1,
            });
            return dataResponse.data;
        }
        catch (e) {
            console.log('Erreur callback');
            await Transactions_entity_1.Transactions.update(transaction.id, {
                dataSended: JSON.stringify(dataSended),
                dataResponseCallback: e === null || e === void 0 ? void 0 : e.message,
                callbackIsSend: 2,
            });
            return e.message || 'error';
        }
    }
    async activityPhone(phonesId, activity) {
        const activityPhone = new DtoActivitiesPhones_1.DtoActivitiesPhones();
        activityPhone.activity = activity;
        activityPhone.createdAt = new Date();
        activityPhone.phonesId = phonesId;
        await ActivitiesPhones_entity_1.ActivitiesPhones.insert(activityPhone);
    }
    getInfoTransaction(messageContent, regexMessage, positionKey, valideLengh) {
        console.log('messageContent', messageContent);
        console.log('regexMessage', regexMessage);
        console.log('positionKey', positionKey);
        const regex = new RegExp(regexMessage);
        const res = messageContent.match(regex);
        if (res) {
            console.log('res', res.length);
            console.log('res', res);
            if (res.length === valideLengh) {
                const infoMessage = new SocketModels_1.InfoTransaction();
                for (const key in positionKey) {
                    if (+key != -1)
                        infoMessage[key] = res[positionKey[key]];
                    else
                        infoMessage[key] = null;
                }
                console.log('matched', infoMessage);
                return infoMessage;
            }
            else {
                console.log('Length no valide');
                return null;
            }
        }
        else {
            console.log('no matched');
            return null;
        }
    }
};
SocketServiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        helper_service_1.HelperService])
], SocketServiceService);
exports.SocketServiceService = SocketServiceService;
//# sourceMappingURL=SocketService.service.js.map