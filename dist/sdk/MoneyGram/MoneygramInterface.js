"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsRequestType = exports.BillPayCancelReasonType = exports.RedirectInfoRedirectType = exports.GenderType = exports.FeeType = exports.ThirdPartyType = exports.SearchType = exports.PaymentType = exports.RewardsFieldInfoDisplay = exports.ProductFieldInfoVisibility = exports.SendReversalType = exports.DataTypeCode = exports.DayOfWeek = exports.ProductVariant = exports.ProductType = exports.TransactionStatus = exports.TargetAudienceType = exports.ChannelTypeEnum = void 0;
var ChannelTypeEnum;
(function (ChannelTypeEnum) {
    ChannelTypeEnum["ATM"] = "ATM";
    ChannelTypeEnum["CALL_CENTER"] = "CALL_CENTER";
    ChannelTypeEnum["KIOSK"] = "KIOSK";
    ChannelTypeEnum["LOCATION"] = "LOCATION";
    ChannelTypeEnum["MOBILE"] = "MOBILE";
    ChannelTypeEnum["SYSTEM"] = "SYSTEM";
    ChannelTypeEnum["WEB"] = "WEB";
    ChannelTypeEnum["TABLET"] = "TABLET";
})(ChannelTypeEnum = exports.ChannelTypeEnum || (exports.ChannelTypeEnum = {}));
var TargetAudienceType;
(function (TargetAudienceType) {
    TargetAudienceType["AGENT_FACING"] = "AGENT_FACING";
    TargetAudienceType["CONSUMER_FACING"] = "CONSUMER_FACING";
})(TargetAudienceType = exports.TargetAudienceType || (exports.TargetAudienceType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["AVAIL"] = "AVAIL";
    TransactionStatus["CANCL"] = "CANCL";
    TransactionStatus["RECVD"] = "RECVD";
    TransactionStatus["REFND"] = "REFND";
    TransactionStatus["AFR"] = "AFR";
    TransactionStatus["UNCOMMITED"] = "UNCOMMITED";
    TransactionStatus["PRCSS"] = "PRCSS";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var ProductType;
(function (ProductType) {
    ProductType["BP"] = "BP";
    ProductType["SEND"] = "SEND";
    ProductType["RCV"] = "RCV";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
var ProductVariant;
(function (ProductVariant) {
    ProductVariant["EP"] = "EP";
    ProductVariant["PREPAY"] = "PREPAY";
    ProductVariant["UBP"] = "UBP";
})(ProductVariant = exports.ProductVariant || (exports.ProductVariant = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["MON"] = "MON";
    DayOfWeek["TUE"] = "TUE";
    DayOfWeek["WED"] = "WED";
    DayOfWeek["THU"] = "THU";
    DayOfWeek["FRI"] = "FRI";
    DayOfWeek["M_F"] = "M-F";
    DayOfWeek["S_S"] = "S-S";
    DayOfWeek["SAT"] = "SAT";
    DayOfWeek["SUN"] = "SUN";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
var DataTypeCode;
(function (DataTypeCode) {
    DataTypeCode["BOOLEAN"] = "boolean";
    DataTypeCode["STRING"] = "string";
    DataTypeCode["INT"] = "int";
    DataTypeCode["DECIMAL"] = "decimal";
    DataTypeCode["DATE"] = "date";
    DataTypeCode["DATETIME"] = "datetime";
    DataTypeCode["TIME"] = "time";
    DataTypeCode["TEXT"] = "text";
    DataTypeCode["CNTRYCODE"] = "cntrycode";
    DataTypeCode["ENUM"] = "enum";
    DataTypeCode["STRINGBOOL"] = "stringbool";
})(DataTypeCode = exports.DataTypeCode || (exports.DataTypeCode = {}));
var SendReversalType;
(function (SendReversalType) {
    SendReversalType["C"] = "C";
    SendReversalType["R"] = "R";
})(SendReversalType = exports.SendReversalType || (exports.SendReversalType = {}));
var ProductFieldInfoVisibility;
(function (ProductFieldInfoVisibility) {
    ProductFieldInfoVisibility["REQ"] = "REQ";
    ProductFieldInfoVisibility["OPT"] = "OPT";
    ProductFieldInfoVisibility["SUP_OPT"] = "SUP_OPT";
    ProductFieldInfoVisibility["NOT_ALL"] = "NOT_ALL";
})(ProductFieldInfoVisibility = exports.ProductFieldInfoVisibility || (exports.ProductFieldInfoVisibility = {}));
var RewardsFieldInfoDisplay;
(function (RewardsFieldInfoDisplay) {
    RewardsFieldInfoDisplay["YES"] = "YES";
    RewardsFieldInfoDisplay["NO"] = "NO";
    RewardsFieldInfoDisplay["OPT"] = "OPT";
})(RewardsFieldInfoDisplay = exports.RewardsFieldInfoDisplay || (exports.RewardsFieldInfoDisplay = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["CASH"] = "CASH";
    PaymentType["CARD"] = "CARD";
    PaymentType["CANCL"] = "CANCL";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
var SearchType;
(function (SearchType) {
    SearchType["IND"] = "IND";
    SearchType["CODE"] = "CODE";
    SearchType["NAME"] = "NAME";
    SearchType["ID"] = "ID";
    SearchType["BIN"] = "BIN";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
var ThirdPartyType;
(function (ThirdPartyType) {
    ThirdPartyType["ORG"] = "ORG";
    ThirdPartyType["NONE"] = "NONE";
    ThirdPartyType["PERSON"] = "PERSON";
})(ThirdPartyType = exports.ThirdPartyType || (exports.ThirdPartyType = {}));
var FeeType;
(function (FeeType) {
    FeeType["VARIABLE"] = "VARIABLE";
    FeeType["EXACT"] = "EXACT";
    FeeType["MINIMUM"] = "MINIMUM";
    FeeType["NOT_FOUND"] = "NOT_FOUND";
})(FeeType = exports.FeeType || (exports.FeeType = {}));
var GenderType;
(function (GenderType) {
    GenderType["M"] = "M";
    GenderType["F"] = "F";
})(GenderType = exports.GenderType || (exports.GenderType = {}));
var RedirectInfoRedirectType;
(function (RedirectInfoRedirectType) {
    RedirectInfoRedirectType["CURRENCY_REDIRECT"] = "CURRENCY_REDIRECT";
    RedirectInfoRedirectType["COUNTRY_REDIRECT"] = "COUNTRY_REDIRECT";
    RedirectInfoRedirectType["COUNTRY_CURRENCY_REDIRECT"] = "COUNTRY_CURRENCY_REDIRECT";
})(RedirectInfoRedirectType = exports.RedirectInfoRedirectType || (exports.RedirectInfoRedirectType = {}));
var BillPayCancelReasonType;
(function (BillPayCancelReasonType) {
    BillPayCancelReasonType["ENTERED_WRONG_ACCOUNT"] = "ENTERED_WRONG_ACCOUNT";
    BillPayCancelReasonType["SENT_TO_WRONG_ACCOUNT"] = "SENT_TO_WRONG_ACCOUNT";
    BillPayCancelReasonType["SENT_TO_WRONG_BILLER"] = "SENT_TO_WRONG_BILLER";
    BillPayCancelReasonType["SENT_DUPLICATE_PAYMENT"] = "SENT_DUPLICATE_PAYMENT";
    BillPayCancelReasonType["CUSTOMER_CHANGED_MIND"] = "CUSTOMER_CHANGED_MIND";
    BillPayCancelReasonType["CUSTOMER_LEFT_WITHOUT_PAYING"] = "CUSTOMER_LEFT_WITHOUT_PAYING";
    BillPayCancelReasonType["SHOULD_BE_EXPRESSPAYMENT"] = "SHOULD_BE_EXPRESSPAYMENT";
    BillPayCancelReasonType["SYSTEM_ERROR"] = "SYSTEM_ERROR";
    BillPayCancelReasonType["OTHER"] = "OTHER";
})(BillPayCancelReasonType = exports.BillPayCancelReasonType || (exports.BillPayCancelReasonType = {}));
var RewardsRequestType;
(function (RewardsRequestType) {
    RewardsRequestType["ENROLL"] = "ENROLL";
})(RewardsRequestType = exports.RewardsRequestType || (exports.RewardsRequestType = {}));
//# sourceMappingURL=MoneygramInterface.js.map