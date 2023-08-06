export declare enum StateEnum {
    ACTIVED = "ACTIVED",
    INACTIVED = "INACTIVED",
    DELETED = "DELETED"
}
export declare enum StatusEnum {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    FAILLED = "FAILLED",
    CANCELED = "CANCELED",
    REFUNDED = "REFUNDED"
}
export declare enum OperationEnum {
    TRANSACTION = "TRANSACTION",
    COMMISSION = "COMMISSION",
    ANNULATION_TRANSACTION = "ANNULATION_TRANSACTION",
    REFUND_TRANSACTION = "REFUND_TRANSACTION",
    APROVISIONNEMENT = "APROVISIONNEMENT",
    ANNULATION_APROVISIONNEMENT = "ANNULATION_APROVISIONNEMENT",
    APPEL_DE_FOND = "APPEL_DE_FOND",
    ANNULATION_APPEL_DE_FOND = "ANNULATION_APPEL_DE_FOND"
}
export declare enum OperationEnumPhone {
    APPEL_DE_FONS = "APPEL_DE_FONS",
    APPROVISIONNEMENT = "APPROVISIONNEMENT",
    TRANSACTION = "TRANSACTION",
    ANNULATION_APPELS_FONDS = "ANNULATION_APPELS_FONDS",
    ANNULATION_APPROVISIONNEMENT = "ANNULATION_APPROVISIONNEMENT",
    ANNULATION_TRANSACTION = "ANNULATION_TRANSACTION",
    REFUND_TRANSACTION = "REFUND_TRANSACTION"
}
export declare enum TypeOperationEnum {
    DEBIT = "DEBIT",
    CREDIT = "CREDIT"
}
export declare enum TypePartener {
    DEBIT = "API",
    CREDIT = "CAISSE"
}
export declare enum SocketState {
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED"
}
export declare enum CommissionFeeTypeEnum {
    FIXE = 1,
    TAUX = 0,
    BOTH = 2
}
export declare enum EnumActivitiesPhones {
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM"
}
export declare enum PhoneState {
    USED = "USED",
    UNUSED = "UNUSED"
}
export declare enum TypeEvenEnum {
    SOLD_OUT_PHONE = "SOLD_OUT_PHONE",
    FREE_MONEY_CALLBACK = "FREE_MONEY_CALLBACK",
    MTN_MONEY_BJ_CALLBACK = "MTN_MONEY_BJ_CALLBACK",
    SOLDE_SERVICE = "SOLDE_SERVICE",
    SOLDE_PARTNER = "SOLDE_PARTNER",
    UNUSED = "UNUSED",
    NO_MATCH_SMS = "NO_MATCH_SMS",
    NO_SERVICE_CONFIGURE_TO_PHONE = "NO_SERVICE_CONFIGURE_TO_PHONE",
    NO_TYPE_OPEARTION_MATCH = "NO_TYPE_OPEARTION_MATCH",
    SERVICE_CONFIG_MISMATCH = "SERVICE_CONFIG_MISMATCH",
    SERVER_RESTART = "SERVER_RESTART",
    GENERIC_EVENT = "GENERIC_EVENT",
    SOCKET_NOT_FOUND = "SOCKET_NOT_FOUND",
    UNKNOWN_RESPONSE_INIT = "UNKNOWN_RESPONSE_INIT",
    CRITICAL_ERROR = "CRITICAL_ERROR",
    NEW_CLAIM = "NEW_CLAIM",
    UPDATE_SOLDE_ERROR = "UPDATE_SOLDE_ERROR",
    UN_ALLOWED_SMS_SOURCE = "UN_ALLOWED_SMS_SOURCE",
    CRON_EXCEPTION = "CRON_EXCEPTION",
    PENDING_AFTER_DELAY = "PENDING_AFTER_DELAY",
    NO_CANAL_AVAILABLE = "NO_CANAL_AVAILABLE",
    PHONE_DISCONNECTED = "PHONE_DISCONNECTED",
    PHONE_CONNECTED = "PHONE_CONNECTED",
    SUCCESSIVE_USSD_FAIL = "SUCCESSIVE_USSD_FAIL"
}
export declare const CONSTANT: {
    TIME_OUT_PHONE_SECOND: () => number;
    WAIT_SOCKET_PHONE: () => number;
    IPN_TASK_ITEM_TIME_OUT_IN_SECOND: () => number;
    CHECK_STATUS_TASK_ITEM_TIME_OUT_IN_SECOND: () => number;
    MAX_TIME_VALIDATION_TRX: () => number;
    MAX_RETRY_CALLBACK: () => number;
    WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE: () => number;
    CALLBACK_CONCURENCY_SEND: () => number;
    CHECK_TRANSACTION_CONCURENCY_SEND: () => number;
    APP_INTERNAL_URL: () => string;
    ACTIVATE_CRON: () => boolean;
    CANCEL_TRANSACTION_PREFIX: string;
};
export declare class PHONES_HOLDERS {
    static AVALABLITY: {};
}
export declare enum EnumValidationStatus {
    SUCCESS = "SUCCESS",
    NO_SET = "NO_SET",
    TIME_OUT = "TIME_OUT",
    TIME_OUT_WITH_ACK = "TIME_OUT_WITH_ACK"
}
export declare enum EnumCodeUssdResponse {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    NO_SET = "NO_SET",
    TIME_OUT = "TIME_OUT",
    TIME_OUT_WITH_ACK = "TIME_OUT_WITH_ACK"
}
export declare enum SOUS_SERVICE_ENUM {
    ORANGE_SN_API_CASH_OUT = "ORANGE_SN_API_CASH_OUT",
    ORANGE_SN_API_CASH_IN = "ORANGE_SN_API_CASH_IN",
    FREE_SN_WALLET_CASH_OUT = "FREE_SN_WALLET_CASH_OUT",
    FREE_SN_WALLET_CASH_IN = "FREE_SN_WALLET_CASH_IN",
    WAVE_SN_API_CASH_OUT = "WAVE_SN_API_CASH_OUT",
    WAVE_SN_API_CASH_IN = "WAVE_SN_API_CASH_IN",
    BANK_CARD_API_CASH_OUT = "BANK_CARD_API_CASH_OUT",
    RAPIDO_SN_BILL_RELOAD = "RAPIDO_SN_BILL_RELOAD",
    WOYOFAL_SN_BILL_RELOAD = "WOYOFAL_SN_BILL_RELOAD",
    SENELEC_SN_BILL_PAY = "SENELEC_SN_BILL_PAY",
    SENEAU_SN_BILL_PAY = "SENEAU_SN_BILL_PAY",
    AQUATECH_SN_BILL_PAY = "AQUATECH_SN_BILL_PAY",
    XEWEUL_SN_BILL_RELOAD = "XEWEUL_SN_BILL_RELOAD",
    OOLUSOLAR_SN_BILL_RELOAD = "OOLUSOLAR_SN_BILL_RELOAD",
    BAOBAP_PLUS_SN_BILL_RELOAD = "BAOBAP_PLUS_SN_BILL_RELOAD",
    UVS_SN_BILL_PAY = "UVS_SN_BILL_PAY",
    UCAD_SN_BILL_PAY = "UCAD_SN_BILL_PAY",
    DER_FJ_SN_BILL_RELOAD = "DER_FJ_SN_BILL_RELOAD",
    WHATSAPP_MESSAGING = "WHATSAPP_MESSAGING",
    CAMPUS_SN_BILL_PAY = "CAMPUS_SN_BILL_PAY",
    TOUBA_CA_KANAM_SN_BILL_PAY = "TOUBA_CA_KANAM_SN_BILL_PAY",
    MOSQUE_TIVAOUNE_SN_BILL_PAY = "MOSQUE_TIVAOUNE_SN_BILL_PAY",
    BANK_TRANSFER_SN_API_CASH_IN = "BANK_TRANSFER_SN_API_CASH_IN"
}
export declare enum SIM_PROVIDER {
    FALL_DISTRIBUTION = "FALL_DISTRIBUTION",
    COPRESS_TELECOM = "COPRESS_TELECOM",
    REGHI_TELECOM = "REGHI_TELECOM",
    KANTE_TELECOM = "KANTE_TELECOM",
    ZEPHERIN_TELECOM = "ZEPHERIN_TELECOM",
    FOFANA_DISTRIBUTION = "FOFANA_DISTRIBUTION",
    DIAKITE_DISTRIBUTION = "DIAKITE_DISTRIBUTION",
    NONE = "NONE"
}
export declare enum EXECUTE_TYPE_USSD {
    SEND_USSD_CODE_SMS = "SEND_USSD_CODE_SMS",
    EXECUTE_REQUEST_CODE = "EXECUTE_REQUEST_CODE"
}
export declare enum ClaimStatut {
    CREATED = "CREATED",
    OPENED = "OPENED",
    CLOSED = "CLOSED"
}
export declare const Currencies: {
    base: string;
    rates: {
        XOF: number;
        MAD: number;
        GMD: number;
        SLL: number;
        GNF: number;
    };
};
