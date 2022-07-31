import { OperationEnumPhone, TypeEvenEnum, TypeOperationEnum } from './Models/Entities/Enum.entity';
import { Connection } from 'typeorm';
import { Phones } from './Models/Entities/Phones.entity';
export declare class HelperService {
    private readonly connection;
    constructor(connection: Connection);
    notifyAdmin(message: string, typeEvent: TypeEvenEnum, data?: {}): Promise<void>;
    setSoldeTable(value: number, tableName: string, id: number, field: string): Promise<any>;
    operationPhone(phone: Phones, amount: number, typeOperation: TypeOperationEnum, comment: string, operationId?: number | null, operation?: OperationEnumPhone): Promise<void>;
}
