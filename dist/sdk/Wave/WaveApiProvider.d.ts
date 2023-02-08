import { WaveMoneySnCashOutApiManagerService } from '../../Controllers/api-service/wave-money-sn-cash-out-api-manager/wave-money-sn-cash-out-api-manager.service';
import { BalanceParams, BalanceResponse, CheckParams, CheckResponse, RefundParams, RefundResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
import { Parteners } from '../../Models/Entities/Parteners.entity';
import { OperationInDto } from '../../Controllers/api-service/dto/OperationInDto';
export declare type WAVE_COUNTRY = 'sn' | 'ci';
export declare enum WAVE_BILL_ID {
    RAPIDO = "BT_rapido:U_R-mFhH9faepR",
    WOYOFAL = "BT_woyofal:U_2Tp0QIvJu9ar",
    SENEAU = "BT_sde:U_cjGgzHOfIp4k",
    SENELEC = "BT_senelec:U_R-mFhH9faepR",
    XEWEUL = "BT_xeweul:U_2Tp0QIvJu9ar",
    AQUATECH = "BT_aquatech:U_2Tp0QIvJu9ar",
    OOLUSOLAR = "BT_oolu:U_2Tp0QIvJu9ar",
    BAOBAP_PLUS = "BT_baobab_plus:U_2Tp0QIvJu9ar",
    UVS = "BT_uvs_sn:U_2Tp0QIvJu9ar",
    UCAD = "BT_university_fee_sn:U_2Tp0QIvJu9ar",
    DER_FJ = "BT_der:U_2Tp0QIvJu9ar",
    CAMPUSEN = "BT_campusen_sn:U_2Tp0QIvJu9ar"
}
export default class WaveApiProvider {
    static baseUrl: string;
    static WAVE_DATE_FORMAT: string;
    static now(): string;
    static SendWaveMoneyBusiness({ toPhoneNumber, sender, amount, sessionId, walletId, }: {
        toPhoneNumber: any;
        sender?: string;
        amount: any;
        sessionId: any;
        walletId: any;
    }): Promise<{
        success: boolean;
        code: string;
        message: string;
        newBalance: number;
        fullResponse: any;
        reference: any;
    } | {
        success: boolean;
        code: any;
        message: any;
        newBalance: any;
        fullResponse: any;
        reference: string;
    }>;
    static waveFeeCalculator(amount: any, feePercent?: number): {
        sentAmount: any;
        receiveAmount: any;
    };
    static makeCheckout({ idemPotency, amount, token, success_url, error_url, client_reference, aggregated_merchant_id, }: {
        idemPotency: any;
        amount: any;
        token: any;
        success_url: any;
        error_url: any;
        client_reference: any;
        aggregated_merchant_id: any;
    }): Promise<any>;
    static sendPayOutApi({ idemPotency, currency, client_reference, mobile, sender, receive_amount, national_id, name, token, aggregated_merchant_id, }: {
        idemPotency: any;
        currency: any;
        client_reference: any;
        mobile: any;
        sender: any;
        receive_amount: any;
        national_id: any;
        name: any;
        token: any;
        aggregated_merchant_id: any;
    }): Promise<{
        success: boolean;
        payoutId: any;
        reference: any;
        message?: undefined;
        code?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        payoutId: any;
        reference: any;
        message: string;
        code?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        payoutId: any;
        reference: any;
        message: string;
        code: string;
        error?: undefined;
    } | {
        payoutId: string;
        reference: string;
        success: boolean;
        error: any;
        message: string;
        code: string;
    }>;
    static verifyCheckout({ id, token, idemPotency }: {
        id: any;
        token: any;
        idemPotency: any;
    }): Promise<any>;
    static apiManagerCheckCashOutStatusTransaction(apiManagerService: WaveMoneySnCashOutApiManagerService, params: CheckParams, country: WAVE_COUNTRY): Promise<CheckResponse>;
    static getBalance(params: BalanceParams, token: string, idemPotency: string): Promise<BalanceResponse>;
    static listPendingBill({ sessionId, walletId, billAccountNumber, billAccountNumberFieldName, billId, addConfirmField, }: {
        sessionId: any;
        walletId: any;
        billAccountNumber: any;
        billAccountNumberFieldName: any;
        billId: any;
        addConfirmField?: boolean;
    }): Promise<{
        success: boolean;
        code: string;
        partnerQueryId: string;
        poolResponse: any;
        bills: {
            amount: number;
            billReference: any;
            infos: any;
            confirms: any;
        }[];
        message?: undefined;
        jsonResponse?: undefined;
        paymentId?: undefined;
    } | {
        message: any;
        code: any;
        jsonResponse: any;
        paymentId: any;
        success: boolean;
        partnerQueryId?: undefined;
        poolResponse?: undefined;
        bills?: undefined;
    }>;
    static confirmBill({ sessionId, walletId, amount, invoiceId, billAccountNumber, billId, billAccountNumberFieldName, }: {
        sessionId: any;
        walletId: any;
        amount: any;
        invoiceId: any;
        billAccountNumber: any;
        billId: any;
        billAccountNumberFieldName: any;
    }): Promise<{
        success: boolean;
        code: string;
        message: string;
        targetBill?: undefined;
        jsonResponse?: undefined;
        paymentId?: undefined;
        asyncResponse?: undefined;
    } | {
        success: boolean;
        code: string;
        message: string;
        targetBill: {
            amount: number;
            billReference: any;
            infos: any;
            confirms: any;
        };
        jsonResponse?: undefined;
        paymentId?: undefined;
        asyncResponse?: undefined;
    } | {
        success: boolean;
        code: string;
        message: string;
        jsonResponse: any;
        paymentId: any;
        asyncResponse: any;
        targetBill?: undefined;
    } | {
        message: any;
        code: any;
        jsonResponse: any;
        paymentId: any;
        success: boolean;
        targetBill?: undefined;
        asyncResponse?: undefined;
    }>;
    static makeDirectBillPay({ sessionId, walletId, amount, billId, billAccountNumberFieldName, billAccountNumber, label, otherFields, searchInSummary, }: {
        sessionId: any;
        walletId: any;
        amount: any;
        billId: any;
        billAccountNumberFieldName: any;
        billAccountNumber: any;
        label: any;
        otherFields?: any;
        searchInSummary?: string;
    }): Promise<{
        code: string;
        message: string;
        jsonResponse: any;
        paymentId: any;
        asyncResponse: any;
        woyofalCode: any;
        woyofalKWh: any;
        success: boolean;
    } | {
        success: boolean;
        message: any;
        code: any;
        jsonResponse: any;
        paymentId: any;
        woyofalCode: any;
        woyofalKWh: any;
        asyncResponse?: undefined;
    }>;
    private static fetchAsyncPayment;
    static refundTransaction(params: RefundParams, sessionId: string, transferId: string, type: 'payment' | 'deposit'): Promise<RefundResponse>;
    static createAggregatorId(dto: OperationInDto, partner: Parteners, token: string, country: WAVE_COUNTRY, update?: boolean): Promise<string>;
}
