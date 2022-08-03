import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketBodyMessage, SocketInternal } from '../Models/MobileSocket/SocketModel';
import { SocketServiceService } from './SocketService.service';
export declare class SocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private socketServiceService;
    server: Server;
    constructor(socketServiceService: SocketServiceService);
    static logger: Logger;
    smsReceivedPhone(client: Socket, socketBody: SocketBodyMessage): Promise<void>;
    joinRoom(client: Socket, room: string): Promise<void>;
    leaveRoom(client: Socket, room: string): Promise<void>;
    afterInit(server: Server): void;
    static socket: Server;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    static socketInternals: SocketInternal[];
    static getSocket(room: string): any;
}
