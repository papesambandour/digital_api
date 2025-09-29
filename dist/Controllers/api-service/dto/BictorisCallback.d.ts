export interface BictorisCallbackData {
    id: string;
    merchantId: string;
    type: string;
    amount: number;
    currency: string;
    paymentReference: string;
    customerId?: string | null;
    customerObject?: {
        id?: string | null;
        name?: string | null;
        phone?: string | null;
        email?: string | null;
        address?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
        locale?: string | null;
        createdAt?: string | null;
        updatedAt?: string | null;
    };
    pspName?: string | null;
    paymentMeans?: string | null;
    paymentChannel?: string | null;
    merchantFees?: number;
    customerFees?: number;
    transactionFeeAmountHT?: number | null;
    transactionFeeAmountTax?: number | null;
    merchantReference: string;
    orderType?: string | null;
    orderId?: string | null;
    orderDetails?: any | null;
    status: 'succeeded' | 'failed' | 'cancelled' | 'pending' | 'processing' | 'reversed' | 'authorized';
    deviceId?: string;
    originIp?: string | null;
    timestamp: string;
}
