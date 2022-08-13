"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOUS_SERVICE_ENUM = exports.EnumCodeUssdResponse = exports.EnumValidationStatus = exports.PHONES_HOLDERS = exports.CONSTANT = exports.TypeEvenEnum = exports.PhoneState = exports.EnumActivitiesPhones = exports.CommissionFeeTypeEnum = exports.SocketState = exports.TypePartener = exports.TypeOperationEnum = exports.OperationEnumPhone = exports.OperationEnum = exports.StatusEnum = exports.StateEnum = void 0;
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
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
var OperationEnum;
(function (OperationEnum) {
    OperationEnum["TRANSACTION"] = "TRANSACTION";
    OperationEnum["ANNULATION_TRANSACTION"] = "ANNULATION_TRANSACTION";
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
    TypeEvenEnum["UNUSED"] = "UNUSED";
    TypeEvenEnum["NO_MATCH_SMS"] = "NO_MATCH_SMS";
    TypeEvenEnum["NO_SERVICE_CONFIGURE_TO_PHONE"] = "NO_SERVICE_CONFIGURE_TO_PHONE";
    TypeEvenEnum["NO_TYPE_OPEARTION_MATCH"] = "NO_TYPE_OPEARTION_MATCH";
})(TypeEvenEnum = exports.TypeEvenEnum || (exports.TypeEvenEnum = {}));
exports.CONSTANT = {
    TIME_OUT_PHONE_SECOND: () => parseInt(process.env.TIME_OUT_PHONE_SECOND) || 20,
    LIMIT_TIME_TRANSACTION: () => parseInt(process.env.LIMIT_TIME_TRANSACTION) || 15,
    WAIT_SOCKET_PHONE: () => parseInt(process.env.WAIT_SOCKET_PHONE) || 30,
    MAX_TIME_VALIDATION_TRX: () => parseInt(process.env.MAX_TIME_VALIDATION_TRX) || 1,
    MAX_RETRY_CALLBACK: () => parseInt(process.env.MAX_RETRY_CALLBACK),
    WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE: () => parseInt(process.env.WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE),
    CALLBACK_CONCURENCY_SEND: () => parseInt(process.env.CALLBACK_CONCURENCY_SEND),
    CHECK_TRANSACTION_CONCURENCY_SEND: () => parseInt(process.env.CHECK_TRANSACTION_CONCURENCY_SEND),
    APP_INTERNAL_URL: () => process.env.APP_INTERNAL_URL,
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
})(EnumValidationStatus = exports.EnumValidationStatus || (exports.EnumValidationStatus = {}));
var EnumCodeUssdResponse;
(function (EnumCodeUssdResponse) {
    EnumCodeUssdResponse["SUCCESS"] = "SUCCESS";
    EnumCodeUssdResponse["ERROR"] = "ERROR";
    EnumCodeUssdResponse["NO_SET"] = "NO_SET";
    EnumCodeUssdResponse["TIME_OUT"] = "TIME_OUT";
})(EnumCodeUssdResponse = exports.EnumCodeUssdResponse || (exports.EnumCodeUssdResponse = {}));
var SOUS_SERVICE_ENUM;
(function (SOUS_SERVICE_ENUM) {
    SOUS_SERVICE_ENUM["WAVE_SN_API_CASH_OUT"] = "WAVE_SN_API_CASH_OUT";
})(SOUS_SERVICE_ENUM = exports.SOUS_SERVICE_ENUM || (exports.SOUS_SERVICE_ENUM = {}));
//# sourceMappingURL=Enum.entity.js.map