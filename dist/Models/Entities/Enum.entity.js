"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currencies = exports.ClaimStatut = exports.EXECUTE_TYPE_USSD = exports.SIM_PROVIDER = exports.SOUS_SERVICE_ENUM = exports.EnumCodeUssdResponse = exports.EnumValidationStatus = exports.PHONES_HOLDERS = exports.CONSTANT = exports.TypeEvenEnum = exports.PhoneState = exports.EnumActivitiesPhones = exports.CommissionFeeTypeEnum = exports.SocketState = exports.TypePartener = exports.TypeOperationEnum = exports.OperationEnumPhone = exports.OperationEnum = exports.StatusEnum = exports.StateEnum = void 0;
var StateEnum;
(function (StateEnum) {
    StateEnum["ACTIVED"] = "ACTIVED";
    StateEnum["INACTIVED"] = "INACTIVED";
    StateEnum["DELETED"] = "DELETED";
})(StateEnum = exports.StateEnum || (exports.StateEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["SUCCESS"] = "SUCCESS";
    StatusEnum["PENDING"] = "PENDING";
    StatusEnum["PROCESSING"] = "PROCESSING";
    StatusEnum["FAILLED"] = "FAILLED";
    StatusEnum["CANCELED"] = "CANCELED";
    StatusEnum["REFUNDED"] = "REFUNDED";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
var OperationEnum;
(function (OperationEnum) {
    OperationEnum["TRANSACTION"] = "TRANSACTION";
    OperationEnum["COMMISSION"] = "COMMISSION";
    OperationEnum["ANNULATION_TRANSACTION"] = "ANNULATION_TRANSACTION";
    OperationEnum["REFUND_TRANSACTION"] = "REFUND_TRANSACTION";
    OperationEnum["APROVISIONNEMENT"] = "APROVISIONNEMENT";
    OperationEnum["ANNULATION_APROVISIONNEMENT"] = "ANNULATION_APROVISIONNEMENT";
    OperationEnum["APPEL_DE_FOND"] = "APPEL_DE_FOND";
    OperationEnum["ANNULATION_APPEL_DE_FOND"] = "ANNULATION_APPEL_DE_FOND";
})(OperationEnum = exports.OperationEnum || (exports.OperationEnum = {}));
var OperationEnumPhone;
(function (OperationEnumPhone) {
    OperationEnumPhone["APPEL_DE_FONS"] = "APPEL_DE_FONS";
    OperationEnumPhone["APPROVISIONNEMENT"] = "APPROVISIONNEMENT";
    OperationEnumPhone["TRANSACTION"] = "TRANSACTION";
    OperationEnumPhone["ANNULATION_APPELS_FONDS"] = "ANNULATION_APPELS_FONDS";
    OperationEnumPhone["ANNULATION_APPROVISIONNEMENT"] = "ANNULATION_APPROVISIONNEMENT";
    OperationEnumPhone["ANNULATION_TRANSACTION"] = "ANNULATION_TRANSACTION";
    OperationEnumPhone["REFUND_TRANSACTION"] = "REFUND_TRANSACTION";
})(OperationEnumPhone = exports.OperationEnumPhone || (exports.OperationEnumPhone = {}));
var TypeOperationEnum;
(function (TypeOperationEnum) {
    TypeOperationEnum["DEBIT"] = "DEBIT";
    TypeOperationEnum["CREDIT"] = "CREDIT";
})(TypeOperationEnum = exports.TypeOperationEnum || (exports.TypeOperationEnum = {}));
var TypePartener;
(function (TypePartener) {
    TypePartener["DEBIT"] = "API";
    TypePartener["CREDIT"] = "CAISSE";
})(TypePartener = exports.TypePartener || (exports.TypePartener = {}));
var SocketState;
(function (SocketState) {
    SocketState["CONNECTED"] = "CONNECTED";
    SocketState["DISCONNECTED"] = "DISCONNECTED";
})(SocketState = exports.SocketState || (exports.SocketState = {}));
var CommissionFeeTypeEnum;
(function (CommissionFeeTypeEnum) {
    CommissionFeeTypeEnum[CommissionFeeTypeEnum["FIXE"] = 1] = "FIXE";
    CommissionFeeTypeEnum[CommissionFeeTypeEnum["TAUX"] = 0] = "TAUX";
    CommissionFeeTypeEnum[CommissionFeeTypeEnum["BOTH"] = 2] = "BOTH";
})(CommissionFeeTypeEnum = exports.CommissionFeeTypeEnum || (exports.CommissionFeeTypeEnum = {}));
var EnumActivitiesPhones;
(function (EnumActivitiesPhones) {
    EnumActivitiesPhones["CONNECTED"] = "CONNECTED";
    EnumActivitiesPhones["DISCONNECTED"] = "DISCONNECTED";
    EnumActivitiesPhones["JOIN_ROOM"] = "JOIN_ROOM";
    EnumActivitiesPhones["LEAVE_ROOM"] = "LEAVE_ROOM";
})(EnumActivitiesPhones = exports.EnumActivitiesPhones || (exports.EnumActivitiesPhones = {}));
var PhoneState;
(function (PhoneState) {
    PhoneState["USED"] = "USED";
    PhoneState["UNUSED"] = "UNUSED";
})(PhoneState = exports.PhoneState || (exports.PhoneState = {}));
var TypeEvenEnum;
(function (TypeEvenEnum) {
    TypeEvenEnum["SOLD_OUT_PHONE"] = "SOLD_OUT_PHONE";
    TypeEvenEnum["FREE_MONEY_CALLBACK"] = "FREE_MONEY_CALLBACK";
    TypeEvenEnum["SOLDE_SERVICE"] = "SOLDE_SERVICE";
    TypeEvenEnum["SOLDE_PARTNER"] = "SOLDE_PARTNER";
    TypeEvenEnum["UNUSED"] = "UNUSED";
    TypeEvenEnum["NO_MATCH_SMS"] = "NO_MATCH_SMS";
    TypeEvenEnum["NO_SERVICE_CONFIGURE_TO_PHONE"] = "NO_SERVICE_CONFIGURE_TO_PHONE";
    TypeEvenEnum["NO_TYPE_OPEARTION_MATCH"] = "NO_TYPE_OPEARTION_MATCH";
    TypeEvenEnum["SERVICE_CONFIG_MISMATCH"] = "SERVICE_CONFIG_MISMATCH";
    TypeEvenEnum["SERVER_RESTART"] = "SERVER_RESTART";
    TypeEvenEnum["GENERIC_EVENT"] = "GENERIC_EVENT";
    TypeEvenEnum["SOCKET_NOT_FOUND"] = "SOCKET_NOT_FOUND";
    TypeEvenEnum["UNKNOWN_RESPONSE_INIT"] = "UNKNOWN_RESPONSE_INIT";
    TypeEvenEnum["CRITICAL_ERROR"] = "CRITICAL_ERROR";
    TypeEvenEnum["NEW_CLAIM"] = "NEW_CLAIM";
    TypeEvenEnum["UPDATE_SOLDE_ERROR"] = "UPDATE_SOLDE_ERROR";
    TypeEvenEnum["UN_ALLOWED_SMS_SOURCE"] = "UN_ALLOWED_SMS_SOURCE";
    TypeEvenEnum["CRON_EXCEPTION"] = "CRON_EXCEPTION";
    TypeEvenEnum["PENDING_AFTER_DELAY"] = "PENDING_AFTER_DELAY";
    TypeEvenEnum["NO_CANAL_AVAILABLE"] = "NO_CANAL_AVAILABLE";
    TypeEvenEnum["PHONE_DISCONNECTED"] = "PHONE_DISCONNECTED";
    TypeEvenEnum["PHONE_CONNECTED"] = "PHONE_CONNECTED";
    TypeEvenEnum["SUCCESSIVE_USSD_FAIL"] = "SUCCESSIVE_USSD_FAIL";
})(TypeEvenEnum = exports.TypeEvenEnum || (exports.TypeEvenEnum = {}));
exports.CONSTANT = {
    TIME_OUT_PHONE_SECOND: () => parseInt(process.env.TIME_OUT_PHONE_SECOND) || 20,
    WAIT_SOCKET_PHONE: () => parseInt(process.env.WAIT_SOCKET_PHONE) || 30,
    IPN_TASK_ITEM_TIME_OUT_IN_SECOND: () => parseInt(process.env.IPN_TASK_ITEM_TIME_OUT_IN_SECOND),
    CHECK_STATUS_TASK_ITEM_TIME_OUT_IN_SECOND: () => parseInt(process.env.CHECK_STATUS_TASK_ITEM_TIME_OUT_IN_SECOND),
    MAX_TIME_VALIDATION_TRX: () => parseInt(process.env.MAX_TIME_VALIDATION_TRX) || 1,
    MAX_RETRY_CALLBACK: () => parseInt(process.env.MAX_RETRY_CALLBACK),
    WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE: () => parseInt(process.env.WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE),
    CALLBACK_CONCURENCY_SEND: () => parseInt(process.env.CALLBACK_CONCURENCY_SEND),
    CHECK_TRANSACTION_CONCURENCY_SEND: () => parseInt(process.env.CHECK_TRANSACTION_CONCURENCY_SEND),
    APP_INTERNAL_URL: () => process.env.APP_INTERNAL_URL,
    ACTIVATE_CRON: () => !!parseInt(process.env.ACTIVATE_CRON),
    CANCEL_TRANSACTION_PREFIX: 'Transaction annuler ||| ',
};
class PHONES_HOLDERS {
}
exports.PHONES_HOLDERS = PHONES_HOLDERS;
PHONES_HOLDERS.AVALABLITY = {};
var EnumValidationStatus;
(function (EnumValidationStatus) {
    EnumValidationStatus["SUCCESS"] = "SUCCESS";
    EnumValidationStatus["NO_SET"] = "NO_SET";
    EnumValidationStatus["TIME_OUT"] = "TIME_OUT";
    EnumValidationStatus["TIME_OUT_WITH_ACK"] = "TIME_OUT_WITH_ACK";
})(EnumValidationStatus = exports.EnumValidationStatus || (exports.EnumValidationStatus = {}));
var EnumCodeUssdResponse;
(function (EnumCodeUssdResponse) {
    EnumCodeUssdResponse["SUCCESS"] = "SUCCESS";
    EnumCodeUssdResponse["ERROR"] = "ERROR";
    EnumCodeUssdResponse["NO_SET"] = "NO_SET";
    EnumCodeUssdResponse["TIME_OUT"] = "TIME_OUT";
    EnumCodeUssdResponse["TIME_OUT_WITH_ACK"] = "TIME_OUT_WITH_ACK";
})(EnumCodeUssdResponse = exports.EnumCodeUssdResponse || (exports.EnumCodeUssdResponse = {}));
var SOUS_SERVICE_ENUM;
(function (SOUS_SERVICE_ENUM) {
    SOUS_SERVICE_ENUM["ORANGE_SN_API_CASH_OUT"] = "ORANGE_SN_API_CASH_OUT";
    SOUS_SERVICE_ENUM["ORANGE_SN_API_CASH_IN"] = "ORANGE_SN_API_CASH_IN";
    SOUS_SERVICE_ENUM["FREE_SN_WALLET_CASH_OUT"] = "FREE_SN_WALLET_CASH_OUT";
    SOUS_SERVICE_ENUM["FREE_SN_WALLET_CASH_IN"] = "FREE_SN_WALLET_CASH_IN";
    SOUS_SERVICE_ENUM["WAVE_SN_API_CASH_OUT"] = "WAVE_SN_API_CASH_OUT";
    SOUS_SERVICE_ENUM["WAVE_SN_API_CASH_IN"] = "WAVE_SN_API_CASH_IN";
    SOUS_SERVICE_ENUM["BANK_CARD_API_CASH_OUT"] = "BANK_CARD_API_CASH_OUT";
    SOUS_SERVICE_ENUM["RAPIDO_SN_BILL_RELOAD"] = "RAPIDO_SN_BILL_RELOAD";
    SOUS_SERVICE_ENUM["WOYOFAL_SN_BILL_RELOAD"] = "WOYOFAL_SN_BILL_RELOAD";
    SOUS_SERVICE_ENUM["SENELEC_SN_BILL_PAY"] = "SENELEC_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["SENEAU_SN_BILL_PAY"] = "SENEAU_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["AQUATECH_SN_BILL_PAY"] = "AQUATECH_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["XEWEUL_SN_BILL_RELOAD"] = "XEWEUL_SN_BILL_RELOAD";
    SOUS_SERVICE_ENUM["OOLUSOLAR_SN_BILL_RELOAD"] = "OOLUSOLAR_SN_BILL_RELOAD";
    SOUS_SERVICE_ENUM["BAOBAP_PLUS_SN_BILL_RELOAD"] = "BAOBAP_PLUS_SN_BILL_RELOAD";
    SOUS_SERVICE_ENUM["UVS_SN_BILL_PAY"] = "UVS_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["UCAD_SN_BILL_PAY"] = "UCAD_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["DER_FJ_SN_BILL_RELOAD"] = "DER_FJ_SN_BILL_RELOAD";
    SOUS_SERVICE_ENUM["WHATSAPP_MESSAGING"] = "WHATSAPP_MESSAGING";
    SOUS_SERVICE_ENUM["CAMPUS_SN_BILL_PAY"] = "CAMPUS_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["TOUBA_CA_KANAM_SN_BILL_PAY"] = "TOUBA_CA_KANAM_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["MOSQUE_TIVAOUNE_SN_BILL_PAY"] = "MOSQUE_TIVAOUNE_SN_BILL_PAY";
    SOUS_SERVICE_ENUM["BANK_TRANSFER_SN_API_CASH_IN"] = "BANK_TRANSFER_SN_API_CASH_IN";
})(SOUS_SERVICE_ENUM = exports.SOUS_SERVICE_ENUM || (exports.SOUS_SERVICE_ENUM = {}));
var SIM_PROVIDER;
(function (SIM_PROVIDER) {
    SIM_PROVIDER["FALL_DISTRIBUTION"] = "FALL_DISTRIBUTION";
    SIM_PROVIDER["COPRESS_TELECOM"] = "COPRESS_TELECOM";
    SIM_PROVIDER["REGHI_TELECOM"] = "REGHI_TELECOM";
    SIM_PROVIDER["KANTE_TELECOM"] = "KANTE_TELECOM";
    SIM_PROVIDER["ZEPHERIN_TELECOM"] = "ZEPHERIN_TELECOM";
    SIM_PROVIDER["FOFANA_DISTRIBUTION"] = "FOFANA_DISTRIBUTION";
    SIM_PROVIDER["DIAKITE_DISTRIBUTION"] = "DIAKITE_DISTRIBUTION";
    SIM_PROVIDER["NONE"] = "NONE";
})(SIM_PROVIDER = exports.SIM_PROVIDER || (exports.SIM_PROVIDER = {}));
var EXECUTE_TYPE_USSD;
(function (EXECUTE_TYPE_USSD) {
    EXECUTE_TYPE_USSD["SEND_USSD_CODE_SMS"] = "SEND_USSD_CODE_SMS";
    EXECUTE_TYPE_USSD["EXECUTE_REQUEST_CODE"] = "EXECUTE_REQUEST_CODE";
})(EXECUTE_TYPE_USSD = exports.EXECUTE_TYPE_USSD || (exports.EXECUTE_TYPE_USSD = {}));
var ClaimStatut;
(function (ClaimStatut) {
    ClaimStatut["CREATED"] = "CREATED";
    ClaimStatut["OPENED"] = "OPENED";
    ClaimStatut["CLOSED"] = "CLOSED";
})(ClaimStatut = exports.ClaimStatut || (exports.ClaimStatut = {}));
exports.Currencies = {
    base: 'XOF',
    rates: {
        XOF: 1,
        MAD: 0.0162,
        GMD: 0.0799,
        SLL: 22.3174,
        GNF: 12.8424,
    },
};
//# sourceMappingURL=Enum.entity.js.map