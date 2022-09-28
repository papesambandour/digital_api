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
exports.SocketsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const SocketModel_1 = require("../Models/MobileSocket/SocketModel");
const SocketService_service_1 = require("./SocketService.service");
let SocketsGateway = class SocketsGateway {
    constructor(socketServiceService) {
        this.socketServiceService = socketServiceService;
    }
    static async getSocket(room) {
        var _a;
        console.log('this.socket.sockets');
        const sockets = this.socket.sockets;
        const fetchSocket = sockets.get((_a = this.socketInternals.find((socket) => socket.room == room)) === null || _a === void 0 ? void 0 : _a.id);
        const socketIds = Array.from(await this.socket.to(room).allSockets()).reverse();
        for (const sIds of socketIds) {
            const findSocket = sockets.get(sIds);
            if (findSocket.connected) {
                return findSocket;
            }
        }
        return null;
    }
    async smsReceivedPhone(client, socketBody) {
        await this.socketServiceService.smsReceived(client, socketBody);
    }
    async joinRoom(client, room) {
        await this.socketServiceService.joinRoom(client, room);
    }
    async leaveRoom(client, room) {
        await this.socketServiceService.leaveRoom(client, room);
    }
    afterInit(server) {
        this.socketServiceService.afterInit(server);
    }
    handleDisconnect(client) {
        this.socketServiceService.handleDisconnect(client);
    }
    handleConnection(client, ...args) {
        this.socketServiceService.handleConnection(client, args);
    }
};
SocketsGateway.logger = new common_1.Logger('SocketsGateway');
SocketsGateway.socketInternals = [];
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], SocketsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('smsReceived'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, SocketModel_1.SocketBodyMessage]),
    __metadata("design:returntype", Promise)
], SocketsGateway.prototype, "smsReceivedPhone", null);
__decorate([
    websockets_1.SubscribeMessage('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketsGateway.prototype, "joinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketsGateway.prototype, "leaveRoom", null);
SocketsGateway = __decorate([
    websockets_1.WebSocketGateway({
        namespace: '/phone',
        pingTimeout: 7500,
        pingInterval: 5000,
        transports: ['websocket', 'polling'],
    }),
    __metadata("design:paramtypes", [SocketService_service_1.SocketServiceService])
], SocketsGateway);
exports.SocketsGateway = SocketsGateway;
//# sourceMappingURL=sockets.gateway.js.map