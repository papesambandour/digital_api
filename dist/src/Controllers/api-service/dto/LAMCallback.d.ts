export declare class LamAirtimeCallbackData {
    service_id: string;
    gu_transaction_id: string;
    solde: number;
    commission: number;
    real: string;
    message: string;
    call_back_url: string;
    partner_transaction_id: string;
    status: 'PENDING' | 'SUCCESSFUL' | 'FAILLED';
}
