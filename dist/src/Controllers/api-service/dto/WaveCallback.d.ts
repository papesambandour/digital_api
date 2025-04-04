export declare class WaveData {
    id: string;
    amount: number | string;
    checkout_status?: string;
    client_reference: string | null;
    currency?: string;
    error_url?: string;
    last_payment_error?: string | null | any;
    business_name?: string;
    payment_status?: string;
    success_url?: string;
    wave_launch_url?: string;
    when_completed?: string;
    when_created?: string;
    when_expires?: string;
    transaction_id?: string;
}
export declare class WaveCallbackData {
    id: string;
    type: 'checkout.session.completed' | 'b2b.payment_received' | string;
    data: WaveData;
}
