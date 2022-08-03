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
    NO_SERVICE_CONFIGURE_TO_PHONE = "NO_SERVICE_CONFIGURE_TO_PHONE"
}
export declare const CONSTANT: {
    TIME_OUT_PHONE_SECOND: number;
    LIMIT_TIME_TRANSACTION: number;
    WAIT_SOCKET_PHONE: number;
    MAX_TIME_VALIDATION_TRX: number;
};
export declare class PHONES_HOLDERS {
    static AVALABLITY: {};
}
