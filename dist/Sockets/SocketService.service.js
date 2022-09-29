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
const config_1 = require("../sdk/Discord/config");
const main_1 = require("../main");
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
        Phones_entity_1.Phones.update({
            number: phone.number,
        }, {
            socket: Enum_entity_1.SocketState.DISCONNECTED,
        }).then((data) => console.log('Phone update', data));
        this.activityPhone(phone.id, Enum_entity_1.EnumActivitiesPhones.LEAVE_ROOM).then((data) => console.log('Activity phone inserted', data));
        sockets_gateway_1.SocketsGateway.socket.to(room).emit('leaveRoom', phone);
    }
    async smsReceived(client, socketBody) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        try {
            socketBody = JSON.parse(socketBody
                .toString()
                .replace(/(\r\n|\n|\r)/gm, ' ')
                .replace(/<n>/g, ' '));
        }
        catch (e) {
            console.log(e);
            console.log('Erreur SMS recever : ', socketBody);
        }
        if (!socketBody) {
            console.log(`Message erreur from Sim `, socketBody.toString());
            return false;
        }
        else {
            console.log(`Message recever SMS`);
        }
        console.log('\n\n\nSOCKET BODY', typeof socketBody, Object.keys(socketBody), socketBody, '\n\n\n');
        const shaSubContent = this.helper.sha256((_b = (_a = socketBody === null || socketBody === void 0 ? void 0 : socketBody.data) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.substr(0, 155));
        const sms = new DtoMessageUssds_1.DtoMessageUssds();
        sms.content = (_c = socketBody === null || socketBody === void 0 ? void 0 : socketBody.data) === null || _c === void 0 ? void 0 : _c.content;
        sms.shaSubContent = shaSubContent;
        await this.helper.waitUntilSecondBetween(0, 53);
        sms.subCreatedAt = this.helper.getNowDateWithoutSecond();
        sms.createdAt = new Date();
        sms.sender = (_d = socketBody === null || socketBody === void 0 ? void 0 : socketBody.data) === null || _d === void 0 ? void 0 : _d.numero;
        sms.messagerie = (_e = socketBody === null || socketBody === void 0 ? void 0 : socketBody.data) === null || _e === void 0 ? void 0 : _e.numeroCentre;
        let infoTransaction;
        const phones = await Phones_entity_1.Phones.find({
            where: {
                number: typeorm_1.Equal(socketBody.room),
            },
        });
        let phone = phones[0];
        if (!phone) {
            return this.helper.notifyAdmin(`Socket-Phone ${main_1.serializeData(socketBody)} non trouve apres un sms recu: \n${sms.content}`, Enum_entity_1.TypeEvenEnum.SOCKET_NOT_FOUND);
        }
        const phonesId = phones.map((phone) => phone.id);
        sms.phonesId = phone.id;
        let resMessage;
        try {
            resMessage = await MessageUssds_entity_1.MessageUssds.insert(sms);
            if (!((_f = resMessage === null || resMessage === void 0 ? void 0 : resMessage.raw) === null || _f === void 0 ? void 0 : _f.insertId)) {
                return;
            }
        }
        catch (e) {
            return;
        }
        const checkDouble = await MessageUssds_entity_1.MessageUssds.findOne({
            where: {
                shaSubContent: shaSubContent,
                phonesId: phone.id,
                id: typeorm_1.Not(resMessage.raw.insertId),
                transactionsId: typeorm_1.Not(typeorm_1.IsNull()),
            },
        });
        if (checkDouble) {
            await MessageUssds_entity_1.MessageUssds.update(checkDouble.id, {
                duplicate: 1,
            });
            return console.log('check double failed');
        }
        console.log('SMS INSERT', resMessage);
        sms.id = resMessage.raw.insertId;
        console.log('Phone', phone.number);
        const sousServicesPhones = await SousServicesPhones_entity_1.SousServicesPhones.find({
            where: {
                phonesId: typeorm_1.In(phonesId),
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
                        infoTransaction = this.typeInfoTransaction(res);
                        infoTransaction.sousService = sousServices[i];
                        break;
                    }
                }
                if (infoTransaction) {
                    const sousServicesPhones = await SousServicesPhones_entity_1.SousServicesPhones.findOne({
                        where: {
                            sousServicesId: typeorm_1.Equal(infoTransaction.sousService.id),
                            phonesId: typeorm_1.In(phonesId),
                        },
                    });
                    phone = await Phones_entity_1.Phones.findOne({
                        where: {
                            number: typeorm_1.Equal(socketBody.room),
                            id: typeorm_1.Equal(sousServicesPhones.phonesId),
                        },
                    });
                    await MessageUssds_entity_1.MessageUssds.update(sms.id, {
                        phonesId: phone.id,
                        isMatched: 1,
                    });
                    const transaction = await Transactions_entity_1.Transactions.findOne({
                        where: {
                            amount: typeorm_1.Equal(infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.amount),
                            phone: typeorm_1.Equal(infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.phone),
                            sousServicesId: typeorm_1.Equal((_g = infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.sousService) === null || _g === void 0 ? void 0 : _g.id),
                            statut: typeorm_1.In([Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING]),
                            phonesId: typeorm_1.Equal(phone.id),
                        },
                        order: {
                            createdAt: 'DESC',
                        },
                        relations: ['sousServices'],
                    });
                    console.log('Transaction filter', {
                        amount: infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.amount,
                        phone: infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.phone,
                        sousServicesId: (_h = infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.sousService) === null || _h === void 0 ? void 0 : _h.id,
                        statut: [Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING],
                        phonesId: phone.id,
                        sousservice: infoTransaction.sousService,
                        sms: sms,
                    });
                    if (!transaction) {
                        console.log('Transaction not match', infoTransaction);
                        this.checkIfMatchWithFailedTransaction(infoTransaction, phone, sms.content).then();
                        return false;
                    }
                    const senderValid = String(infoTransaction.sousService.senderSmsAuthorize)
                        .split(',')
                        .map((op) => op.trim())
                        .includes((_j = socketBody === null || socketBody === void 0 ? void 0 : socketBody.data) === null || _j === void 0 ? void 0 : _j.numero);
                    const centerValid = String(infoTransaction.sousService.centerSmsAuthorize)
                        .split(',')
                        .map((op) => op.trim())
                        .includes((_k = socketBody === null || socketBody === void 0 ? void 0 : socketBody.data) === null || _k === void 0 ? void 0 : _k.numeroCentre);
                    if (!senderValid || !centerValid) {
                        this.helper
                            .notifyAdmin(`Un sms avec une source inconnu a été recu pour la transaction #${transaction.id},\nSender_recu: ${socketBody.data.numero}, Sender_attendu: ${infoTransaction.sousService.centerSmsAuthorize}\nCentre_recu: ${socketBody.data.numeroCentre}, Centre_attendu: ${infoTransaction.sousService.centerSmsAuthorize}\nMessage: ${sms.content}`, Enum_entity_1.TypeEvenEnum.UN_ALLOWED_SMS_SOURCE, null, true)
                            .then();
                        return false;
                    }
                    await Transactions_entity_1.Transactions.update(transaction.id, {
                        dateSuccess: new Date(),
                        statut: Enum_entity_1.StatusEnum.SUCCESS,
                        preStatut: Enum_entity_1.StatusEnum.SUCCESS,
                        message: sms === null || sms === void 0 ? void 0 : sms.content,
                        statutSmsResponse: Enum_entity_1.EnumValidationStatus.SUCCESS,
                        sousServiceTransactionId: infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.transactionId,
                    });
                    await transaction.reload();
                    await MessageUssds_entity_1.MessageUssds.update(sms.id, {
                        sousServicesId: (_l = infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.sousService) === null || _l === void 0 ? void 0 : _l.id,
                        transactionsId: transaction.id,
                        isMatched: 1,
                    });
                    if (+infoTransaction.sousService.hasSoldeApi) {
                        await this.helper.setSoldeTableFromValue(infoTransaction.new_balance, 'phones', phone.id, 'solde_api');
                    }
                    await this.helper.handleSuccessTransactionCreditDebit(transaction);
                    await this.helper.setIsCallbackReadyValue(transaction);
                }
                else {
                    await MessageUssds_entity_1.MessageUssds.update(sms.id, {
                        isMatched: 0,
                    });
                    await this.helper.notifyAdmin(`Le phone ${phone.number} a envoyé un message qui ne match pas: \n${sms.content}`, Enum_entity_1.TypeEvenEnum.NO_MATCH_SMS, socketBody, false, config_1.discordApiConfig().mismatchMessageAlertChanelName);
                }
            }
        }
        else {
            await this.helper.notifyAdmin(`Le phone ${phone.number} est en marche sans service configuré`, Enum_entity_1.TypeEvenEnum.NO_SERVICE_CONFIGURE_TO_PHONE);
        }
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
            await this.helper.waitSome(10);
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
        await Phones_entity_1.Phones.update({
            number: phone.number,
            state: Enum_entity_1.StateEnum.ACTIVED,
        }, {
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
        console.log(`Client disconnected: ${client.id} from ${(_b = (_a = client === null || client === void 0 ? void 0 : client.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.device}`);
        console.log('SocketsGateway.socketInternals', sockets_gateway_1.SocketsGateway.socketInternals);
        const socketDisconnected = (_c = sockets_gateway_1.SocketsGateway === null || sockets_gateway_1.SocketsGateway === void 0 ? void 0 : sockets_gateway_1.SocketsGateway.socketInternals) === null || _c === void 0 ? void 0 : _c.find((socketIntern) => (socketIntern === null || socketIntern === void 0 ? void 0 : socketIntern.id) == (client === null || client === void 0 ? void 0 : client.id));
        console.log('socket intern socketDisconnected', socketDisconnected);
        Phones_entity_1.Phones.findOne({
            where: {
                number: typeorm_1.Equal((socketDisconnected === null || socketDisconnected === void 0 ? void 0 : socketDisconnected.room) || ((_e = (_d = client === null || client === void 0 ? void 0 : client.rooms) === null || _d === void 0 ? void 0 : _d.values()) === null || _e === void 0 ? void 0 : _e.next().value)),
            },
        })
            .then((phone) => {
            this.helper
                .notifyAdmin(`Le télépho ${phone.number} c'est déconnecté`, Enum_entity_1.TypeEvenEnum.PHONE_DISCONNECTED, {}, true)
                .then();
            console.log('|PPP|', phone);
            this.activityPhone(phone.id, Enum_entity_1.EnumActivitiesPhones.LEAVE_ROOM).then((data) => console.log('Activity phone inserted', data));
            Phones_entity_1.Phones.update({
                number: phone.number,
            }, {
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
    typeInfoTransaction(res) {
        function parseNumber(n) {
            return parseFloat(String(n).replace(/ /g, ''));
        }
        return {
            phone: res.phone,
            amount: parseNumber(res.amount),
            phoneSim: res.phoneSim,
            transactionId: res.transactionId,
            fee: parseNumber(res.fee),
            commission: parseNumber(res.commission),
            amount_debit_from_phone: parseNumber(res.amount),
            new_balance: parseNumber(res.new_balance),
            sousService: res.sousService,
        };
    }
    async checkIfMatchWithFailedTransaction(infoTransaction, phone, smsContent) {
        var _a;
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                amount: typeorm_1.Equal(infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.amount),
                phone: typeorm_1.Equal(infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.phone),
                sousServicesId: typeorm_1.Equal((_a = infoTransaction === null || infoTransaction === void 0 ? void 0 : infoTransaction.sousService) === null || _a === void 0 ? void 0 : _a.id),
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.FAILLED]),
                phonesId: typeorm_1.Equal(phone.id),
                reachedTimeout: typeorm_1.Equal(1),
            },
            order: {
                createdAt: 'DESC',
            },
            relations: ['sousServices'],
        });
        if (transaction) {
            await this.helper.createClaimForTransaction(transaction, `Reception Sms confirmaton`, `La transaction ${transaction.id} a recu une confirmation de reception en retard:\n${smsContent}`);
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