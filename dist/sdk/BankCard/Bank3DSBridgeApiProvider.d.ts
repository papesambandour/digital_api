import { ConfirmParams } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export default class Bank3DSBridgeApiProvider {
    static initTransaction({ amountXOF, firstName, lastName, bankRefCommand, cardNumber, cardExpireMonth, cardExpireYear, cardCVC, cardType, bankAuthRedirectUrl, phoneNumber, clientEmail, merchantName, merchantCat1Code, bankProvider, bankArea, }: {
        amountXOF: any;
        firstName: any;
        lastName: any;
        bankRefCommand: any;
        cardNumber: any;
        cardExpireMonth: any;
        cardExpireYear: any;
        cardCVC: any;
        cardType: any;
        bankAuthRedirectUrl: any;
        phoneNumber: any;
        clientEmail: any;
        merchantName: any;
        merchantCat1Code: any;
        bankProvider: any;
        bankArea: any;
    }): Promise<{
        success: boolean;
        message: any;
        step: number;
        paymentResponse: any;
        url: any;
    } | {
        success: boolean;
        message: any;
        step: number;
        paymentResponse?: undefined;
        url?: undefined;
    }>;
    static getOrderIdFromTransaction(id: any): string;
    static checkTransaction(params: ConfirmParams): Promise<{
        success: boolean;
        message: any;
        step: number;
        checkResponse: any;
    }>;
}
