import { HttpService } from '@nestjs/common';
import { EnumActivitiesPhones } from '../Models/Entities/Enum.entity';
import { Server, Socket } from 'socket.io';
import { InfoTransaction, PositionKey } from '../Models/Custom/SocketModels';
import { SocketBodyMessage } from '../Models/MobileSocket/SocketModel';
import { HelperService } from '../helper.service';
export declare class SocketServiceService {
    private httpService;
    private helper;
    constructor(httpService: HttpService, helper: HelperService);
    leaveRoom(client: Socket, room: string): Promise<void>;
    smsReceived(client: Socket, socketBody: SocketBodyMessage): Promise<boolean>;
    joinRoom(client: Socket, room: string): Promise<boolean>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    activityPhone(phonesId: number, activity: EnumActivitiesPhones): Promise<void>;
    getInfoTransaction(messageContent: string, regexMessage: string, positionKey: PositionKey, valideLengh: number): InfoTransaction;
}
