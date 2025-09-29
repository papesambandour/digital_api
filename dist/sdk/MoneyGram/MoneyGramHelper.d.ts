import * as soap from 'soap';
export declare class MoneyGramHelper {
    static MIN_AGE: number;
    static getISO8601ExtendedDate(): string;
    static parseError(error: any): string | null;
    static validateMoneyGramSender(data: any): {
        success: boolean;
        errors: string[];
    };
    static validateMoneygramReceptionData(data: any): {
        success: boolean;
        errors: string[];
    };
    static getAge(birthDate: Date): number;
    static translateFieldName(fieldName: string): string;
    static getErrorMessageMap(): {
        [key: string]: string;
    };
    static getErrorMessage(errorParse: any): any;
    static outputLog(d: any): any;
    static createSoapClient(WSDL_URL: any): Promise<soap.Client>;
}
