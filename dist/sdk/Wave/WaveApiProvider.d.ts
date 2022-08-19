import { WaveMoneySnCashOutApiManagerService } from '../../Controllers/api-service/wave-money-sn-cash-out-api-manager/wave-money-sn-cash-out-api-manager.service';
import { BalanceParams, BalanceResponse, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export declare type WAVE_COUNTRY = 'sn' | 'ci';
export declare enum WAVE_BILL_ID {
    RAPIDO = "BT_rapido:U_R-mFhH9faepR",
    WOYOFAL = "BT_woyofal:U_2Tp0QIvJu9ar",
    SENEAU = "BT_sde:U_2Tp0QIvJu9ar",
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
    static apiUrl: string;
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
    static makeCheckout({ idemPotency, amount, token, success_url, error_url, client_reference, override_business_name, }: {
        idemPotency: any;
        amount: any;
        token: any;
        success_url: any;
        error_url: any;
        client_reference: any;
        override_business_name: any;
    }): Promise<any>;
    static verifyCheckout({ id, token, idemPotency }: {
        id: any;
        token: any;
        idemPotency: any;
    }): Promise<any>;
    static apiManagerCheckCashOutStatusTransaction(apiManagerService: WaveMoneySnCashOutApiManagerService, params: CheckParams, country: WAVE_COUNTRY): Promise<CheckResponse>;
    static getBalance(params: BalanceParams, token: string, idemPotency: string): Promise<BalanceResponse>;
    static listPendingBill({ sessionId, walletId, billAccountNumber, billAccountNumberFieldName, billId, }: {
        sessionId: any;
        walletId: any;
        billAccountNumber: any;
        billAccountNumberFieldName: any;
        billId: any;
    }): Promise<{
        success: boolean;
        code: string;
        partnerQueryId: string;
        poolResponse: any;
        bills: {
            amount: number;
            billReference: any;
            infos: any;
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
        jsonResponse: any;
        paymentId: any;
        asyncResponse: any;
    } | {
        message: any;
        code: any;
        jsonResponse: any;
        paymentId: any;
        success: boolean;
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
}
