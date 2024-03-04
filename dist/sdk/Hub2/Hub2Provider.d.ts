import { BalanceParams, BalanceResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export default class Hub2Provider {
    static sendTransfer({ amount, msisdn, reference, meta, description, overrideBusinessName, }: {
        amount: any;
        msisdn: any;
        reference: any;
        meta: any;
        description: any;
        overrideBusinessName: any;
    }): Promise<{
        success: boolean;
        externalReference: any;
        apiResponse: any;
        errorMessage: string;
    } | {
        success: boolean;
        errorMessage: string;
        externalReference?: undefined;
        apiResponse?: undefined;
    }>;
    static getMessageFromResponse(apiResponse: any): "Le transfert a échoué, une erreur interne est survenue. Notre service technique est au courant et travaille à sa résolution." | "Le paiement a échoué. Le client ne dispose pas de suffisamment de fonds." | "Le paiement a échoué, aucune raison n’a été fournie par orange.." | "Votre compte est bloqué par l’opérateur." | "La validation du paiement par la client a échoué, le paiement a été annulé." | "Le délai d’attente pour la validation du paiement est dépassé, le paiement a été annulé." | "Le paiement a échoué à cause de paramètres incorrects." | "Le paiement a été refusé par l’opérateur.." | "Le transfert a échoué, le montant sélectionné est invalide." | "Le transfert a échoué, l’opérateur est actuellement indisponible." | "Le transfert a échoué. L’opérateur reçoit trop de requêtes. Veuillez réessayer plus tard." | "Le transfert a échoué et aucune raison précise ne peut être fournie par l’opérateur." | "Le transfert a échoué, l’opérateur a détecté une tentative de fraude." | "Le transfert a échoué, le destinataire est invalide." | "Le transfert a échoué car il a été refusé par l’opérateur." | "Les MSISDN rééls ne peuvent pas être utilisés en mode Sandbox. Veuillez utiliser un MSISDN de test" | "Le transfert a échoué. L’opérateur n’a pas répondu dans le délai d’attente imparti." | "La transfert a échoué pour cause de fonds insuffisants." | "Le transfert a échoué, cette devise n’est pas supportée." | "Le transfert a été annulé par l’opérateur." | "Le transfert a échoué, l’envoi vers ce destinataire est refusé par l’opérateur." | "Le transfert a échoué car le MSISDN fourni est temporairement banni." | "L’opérateur sélectionné ne permet pas d’effectuer cette opération." | "Le transfert a échoué. Une opération similaire vient d’être enregistrée. Veuillez réessayer plus tard." | "Le transfert a échoué. La requête reçue contient des erreurs ou est mal formattée.";
    static apiManagerGetBalance(params: BalanceParams): Promise<BalanceResponse>;
    static initPayment({ amount, msisdn, reference, meta, overrideBusinessName, description, extra, }: {
        amount: any;
        msisdn: any;
        reference: any;
        meta: any;
        overrideBusinessName: any;
        description: any;
        extra: any;
    }): Promise<{
        success: boolean;
        errorMessage: string;
        apiResponse: {
            paymentResponse: any;
            paymentIntentResponse: any;
            deepLinkUrl: any;
        };
        externalReference?: undefined;
    } | {
        success: boolean;
        externalReference: string;
        apiResponse: {
            paymentResponse: any;
            paymentIntentResponse: any;
            deepLinkUrl: any;
        };
        errorMessage: string;
    } | {
        success: boolean;
        errorMessage: string;
        apiResponse?: undefined;
        externalReference?: undefined;
    }>;
    static getDeepLinkUrl(intentId: any): Promise<any>;
    private static sleep;
}
