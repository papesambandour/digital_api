import { HttpService } from '@nestjs/common';
import { OperationEnumPhone, TypeEvenEnum, TypeOperationEnum } from './Models/Entities/Enum.entity';
import { Connection } from 'typeorm';
import { Phones } from './Models/Entities/Phones.entity';
import { Transactions } from './Models/Entities/Transactions.entity';
import { ApiManagerInterface } from './Controllers/api-service/api-manager-interface/api-manager-interface.service';
import { SousServices } from './Models/Entities/SousServices.entity';
import { ApiServiceService } from './Controllers/api-service/api-service.service';
export declare class HelperService {
    private readonly connection;
    private httpService;
    constructor(connection: Connection, httpService: HttpService);
    notifyAdmin(message: string, typeEvent: TypeEvenEnum, data?: {}): Promise<void>;
    setSoldeTableOnly(value: number, tableName: string, id: number, field: string): Promise<any>;
    setSoldeTableFromValue(value: number, tableName: string, id: number, field: string): Promise<any>;
    incrementSolde(value: number, tableName: string, id: number, field: string): Promise<any>;
    operationPhone(phone: Phones, soldeApi: number, amount: number, transactionId: number, typeOperation: TypeOperationEnum, comment: string, operationId?: number | null, operation?: OperationEnumPhone): Promise<void>;
    waitSome(seconde: number): Promise<unknown>;
    mysqlDate(d: Date): string;
    getApiManagerInterface(codeService: string, apiService: ApiServiceService): Promise<ApiManagerInterface>;
    getTransactionById(transactionId: number): Promise<Transactions>;
    getTransactionByGeneratedId(transactionId: string): Promise<Transactions>;
    setIsCallbackReadyValue(transactionId: any): Promise<void>;
    sendCallBack(transaction: Transactions): Promise<any>;
    private static addMinuteToDate;
    setSoldeTableForDebitOnly(sousServices: SousServices, value: number, tableName: string, id: number, field?: string): Promise<any>;
    operationPartnerDoTransaction(transaction: Transactions): Promise<void>;
    operationPartnerCancelTransaction(transaction: Transactions): Promise<void>;
    updateApiBalance(apiManager: ApiManagerInterface, usedPhoneId: number): Promise<void>;
    base64(str: any): Promise<string>;
    sendSms(tos: string[], message: string, sender: string): Promise<void>;
    getStatusAfterExec(execResult: 'success' | 'timeout' | 'failed', service: SousServices): {
        preStatus: any;
        status: any;
    };
    checkServiceConfig(): Promise<void>;
    private disableSousService;
}
