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
    CANCELED = "CANCELED"
}
export declare enum OperationEnum {
    TRANSACTION = "TRANSACTION",
    ANNULATION_TRANSACTION = "ANNULATION_TRANSACTION",
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
    ANNULATION_TRANSACTION = "ANNULATION_TRANSACTION"
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
    UNUSED = "UNUSED",
    NO_MATCH_SMS = "NO_MATCH_SMS",
    NO_SERVICE_CONFIGURE_TO_PHONE = "NO_SERVICE_CONFIGURE_TO_PHONE",
    NO_TYPE_OPEARTION_MATCH = "NO_TYPE_OPEARTION_MATCH",
    SERVICE_CONFIG_MISMATCH = "SERVICE_CONFIG_MISMATCH"
}
export declare const CONSTANT: {
    TIME_OUT_PHONE_SECOND: () => number;
    LIMIT_TIME_TRANSACTION: () => number;
    WAIT_SOCKET_PHONE: () => number;
    MAX_TIME_VALIDATION_TRX: () => number;
    MAX_RETRY_CALLBACK: () => number;
    WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE: () => number;
    CALLBACK_CONCURENCY_SEND: () => number;
    CHECK_TRANSACTION_CONCURENCY_SEND: () => number;
    APP_INTERNAL_URL: () => string;
};
export declare class PHONES_HOLDERS {
    static AVALABLITY: {};
}
export declare enum EnumValidationStatus {
    SUCCESS = "SUCCESS",
    NO_SET = "NO_SET",
    TIME_OUT = "TIME_OUT"
}
export declare enum EnumCodeUssdResponse {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    NO_SET = "NO_SET",
    TIME_OUT = "TIME_OUT"
}
export declare enum SOUS_SERVICE_ENUM {
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
    CAMPUS_SN_BILL_PAY = "CAMPUS_SN_BILL_PAY"
}
