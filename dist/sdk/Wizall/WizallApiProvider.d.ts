import { WizallMoneySnCashOutApiManagerService } from '../../Controllers/api-service/wizall-money-sn-cash-out-api-manager/wizall-money-sn-cash-out-api-manager.service';
import { BalanceResponse, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export default class WizallApiProvider {
    private static _paymentInstance;
    private static _billInstance;
    private readonly wizallLogin;
    private readonly wizallPassword;
    private readonly wizallClientId;
    private readonly wizallClientSecret;
    private readonly wizallUrl;
    private token;
    private readonly rp;
    static getInstance(type: 'payment' | 'bill'): WizallApiProvider;
    constructor({ wizallLogin, wizallPassword, wizallClientId, wizallClientSecret, wizallUrl, }: {
        wizallLogin: any;
        wizallPassword: any;
        wizallClientId: any;
        wizallClientSecret: any;
        wizallUrl: any;
    }, type: 'payment' | 'bill');
    loadToken(): Promise<void>;
    makePayment({ amount, identifier, phoneNumber }: {
        amount: any;
        identifier: any;
        phoneNumber: any;
    }): Promise<any>;
    makeCashin({ amount, identifier, phoneNumber }: {
        amount: any;
        identifier: any;
        phoneNumber: any;
    }): Promise<{
        success: boolean;
        reference: any;
        response: any;
        message?: undefined;
    } | {
        message: any;
        success: boolean;
        reference?: undefined;
        response?: undefined;
    }>;
    getBalance(): Promise<BalanceResponse>;
    static waitSome(seconde: number): Promise<unknown>;
    verifyWizallTransaction(wizallSubmitedId: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<{
        payment_status: string;
        transaction: any;
        wizall_id: any;
        message?: undefined;
        exception_message?: undefined;
    } | {
        message: any;
        exception_message: any;
        payment_status: any;
        transaction: any;
        wizall_id: any;
    }>;
    makeRapidoPayment(amount: any, badge_num: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<any>;
    getSdeBillPayment(reference_client: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<any>;
    makeSdeBillPay(reference_client: any, amount: any, external_id: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<any>;
    getSenelecBillPayment(police: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<{
        success: boolean;
        message: string;
        pendingBills: any;
    } | {
        success: boolean;
        message: any;
        pendingBills: any[];
    }>;
    getSenEauBillPayment(reference_client: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<{
        success: boolean;
        message: string;
        pendingBills: any;
    } | {
        success: boolean;
        message: any;
        pendingBills: any[];
    }>;
    confirmBillSenEau(reference_client: any, amount: any, reference_facture: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<{
        success: boolean;
        message: string;
        response?: undefined;
        paymentId?: undefined;
    } | {
        success: boolean;
        response: any;
        message: string;
        paymentId: string;
    } | {
        success: boolean;
        response: any;
        message: string;
        paymentId?: undefined;
    }>;
    confirmBillSenelec(police: any, amount: any, numfacture: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<{
        success: boolean;
        message: string;
        response?: undefined;
        paymentId?: undefined;
    } | {
        success: boolean;
        response: any;
        message: string;
        paymentId: string;
    } | {
        success: boolean;
        response: any;
        message: string;
        paymentId?: undefined;
    }>;
    getWotofalBillAccount(compteur: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<any>;
    static sleep(ms: any): Promise<unknown>;
    makeWoyofalBillPay(compteur: any, amount: any, external_id: any, { wizallAgentPhoneNumber, wizallAgentPin }: {
        wizallAgentPhoneNumber: any;
        wizallAgentPin: any;
    }): Promise<any>;
    static apiManagerCheckCashOutStatusTransaction(apiManagerService: WizallMoneySnCashOutApiManagerService, params: CheckParams): Promise<CheckResponse>;
    private waitForToken;
    static getWizallExternalFromInternalId(s: any, type: 'cashin' | 'payment'): string;
    static getMessageFromCode(response: any): "Votre opération n'a pas pu être traitée pour le moment, réessayez plus tard." | "Ce numero n'a pas de compte wizall actif";
}
