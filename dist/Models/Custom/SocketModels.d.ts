import { SousServices } from '../Entities/SousServices.entity';
export declare class PositionKey {
    phone: number;
    amount: number;
    transactionId: number;
    fee: number;
    commission: number;
    amount_debit_from_phone: number;
    new_balance: number;
}
export declare class InfoTransaction {
    phone: number;
    amount: number;
    phoneSim: number;
    transactionId: string;
    fee: number;
    commission: number;
    amount_debit_from_phone: number;
    new_balance: number;
    sousService: SousServices;
}
