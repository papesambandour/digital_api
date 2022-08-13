import { WaveMoneySnCashOutApiManagerService } from '../../Controllers/api-service/wave-money-sn-cash-out-api-manager/wave-money-sn-cash-out-api-manager.service';
import { BalanceParams, BalanceResponse, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
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
    static apiManagerCheckCashOutStatusTransaction(apiManagerService: WaveMoneySnCashOutApiManagerService, params: CheckParams): Promise<CheckResponse>;
    static getBalance(params: BalanceParams, token: string, idemPotency: string): Promise<BalanceResponse>;
}
