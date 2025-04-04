export interface AgentCredentials {
    agentID: string;
    locationCode?: string;
    agentSequence?: string;
    token: string;
    unitProfileID?: string;
}
export interface MoneygramSendData {
    senderDetails: SendServiceSenderDetails;
    receiverDetails: SendServiceReceiverDetails;
}
export interface MoneygramReceptionData {
    receptionServiceReceiveDetails: ReceptionServiceReceiveDetails;
}
export interface ReceptionServiceReceiveDetails {
    referenceNumber: string;
    consumerId: string;
    receiveCurrency: Currency;
    receiveCountry: Country;
    receiverFirstName: string;
    receiverLastName: string;
    receiverMiddleName?: string;
    receiverLastName2?: string;
    receiverCity: string;
    receiverAddress: string;
    receiverCountry: Country;
    receiverPhone: string;
    receiverPhoneCountryCode: string;
    receiverPhotoIdCountry: string;
    receiverDOB: string | Date;
    receiverPhotoIdType: 'ALN' | 'DRV' | 'GOV' | 'STA';
    receiverPhotoIdNumber: string;
    receiverCitizenshipCountry: Country;
    receiverBirthCountry: Country;
    receiverGender: 'MALE' | 'FEMALE' | 'UNKNOWN';
    receivePurposeOfTransaction: 'BUSINESS_EXPENSE' | 'DONATION' | 'EDUCATION_TRAIN' | 'GIFT' | 'INVEST_SAVING' | 'LEGAL_OBLIGATION' | 'LOAN' | 'TRAVEL_EXPENSES' | 'BILLS' | 'FOOD' | 'MEDICAL' | 'PURCHASE_GOODS' | 'PERSONAL_USE' | 'SALARY';
    agentTransactionId: string;
    agentConsumerID: string;
}
export interface SendServiceSenderDetails {
    senderFirstName: string;
    senderLastName: string;
    senderAddress: string;
    senderCity: string;
    sendCurrency: Currency;
    senderState?: string;
    senderZipCode?: string;
    agentConsumerID: string;
    agentTransactionId: string;
    senderCountry: Country;
    senderCitizenshipCountry: Country;
    sendPurposeOfTransaction: 'BUSINESS_EXPENSE' | 'DONATION' | 'EDUCATION_TRAIN' | 'GIFT' | 'INVEST_SAVING' | 'LEGAL_OBLIGATION' | 'LOAN' | 'TRAVEL_EXPENSES' | 'BILLS' | 'FOOD' | 'MEDICAL' | 'PURCHASE_GOODS' | 'PERSONAL_USE' | 'SALARY';
    senderHomePhone?: string;
    senderPhoneNumber: string;
    senderMiddleName?: string;
    senderLastName2?: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderPhotoIdNumber: string;
    senderPhotoIdType: 'ALN' | 'DRV' | 'GOV' | 'PAS' | 'STA';
    senderGender: 'MALE' | 'FEMALE' | 'UNKNOWN';
    senderPhotoIdCountry: Country;
    senderBirthCountry: Country;
    deliveryOption: DeliveryOption;
    senderDOB: string | Date;
    senderHomePhoneCountryCode: string;
}
export declare type DeliveryOption = 'WILL_CALL' | string | undefined | null;
export interface SendServiceReceiverDetails {
    receiverFirstName: string;
    receiverLastName: string;
    receiverPhoneNumber?: string;
    receiverPhoneCountryCode?: string;
    receiverMiddleName?: string;
    receiverLastName2?: string;
    receiveCountry: Country;
    receiveCurrency: Currency;
    receiverAddress: string;
    receiverCity: string;
    receiverState?: string;
    receiverZipCode?: string;
}
export interface Request {
    unitProfileID?: number;
    agentID?: string;
    locationCode?: string;
    agentSequence?: string;
    token: string;
    language?: string;
    timeStamp: Date | string;
    apiVersion: string;
    clientSoftwareVersion: string;
    userID?: string;
    channelType: ChannelTypeEnum;
    targetAudience?: TargetAudienceType;
    poeCapabilities?: {
        poeCapability: KeyValuePairType[];
    };
}
export interface Response {
    doCheckIn: boolean;
    timeStamp: Date;
    flags: number;
}
export interface Error {
    errorCode?: number;
    errorString?: string;
    subErrorCode?: number;
    offendingField?: string;
    timeStamp?: Date;
    detailString?: string;
}
export interface Errors {
    error: Error[];
}
export interface KeyValuePair {
    xmlTag: string;
    fieldValue?: string;
}
export interface KeyValuePairType {
    infoKey: string;
    value?: string;
}
export declare enum ChannelTypeEnum {
    ATM = "ATM",
    CALL_CENTER = "CALL_CENTER",
    KIOSK = "KIOSK",
    LOCATION = "LOCATION",
    MOBILE = "MOBILE",
    SYSTEM = "SYSTEM",
    WEB = "WEB",
    TABLET = "TABLET"
}
export declare enum TargetAudienceType {
    AGENT_FACING = "AGENT_FACING",
    CONSUMER_FACING = "CONSUMER_FACING"
}
export declare enum TransactionStatus {
    AVAIL = "AVAIL",
    CANCL = "CANCL",
    RECVD = "RECVD",
    REFND = "REFND",
    AFR = "AFR",
    UNCOMMITED = "UNCOMMITED",
    PRCSS = "PRCSS"
}
export declare enum ProductType {
    BP = "BP",
    SEND = "SEND",
    RCV = "RCV"
}
export declare enum ProductVariant {
    EP = "EP",
    PREPAY = "PREPAY",
    UBP = "UBP"
}
export declare enum DayOfWeek {
    MON = "MON",
    TUE = "TUE",
    WED = "WED",
    THU = "THU",
    FRI = "FRI",
    M_F = "M-F",
    S_S = "S-S",
    SAT = "SAT",
    SUN = "SUN"
}
export declare enum DataTypeCode {
    BOOLEAN = "boolean",
    STRING = "string",
    INT = "int",
    DECIMAL = "decimal",
    DATE = "date",
    DATETIME = "datetime",
    TIME = "time",
    TEXT = "text",
    CNTRYCODE = "cntrycode",
    ENUM = "enum",
    STRINGBOOL = "stringbool"
}
export declare enum SendReversalType {
    C = "C",
    R = "R"
}
export declare enum ProductFieldInfoVisibility {
    REQ = "REQ",
    OPT = "OPT",
    SUP_OPT = "SUP_OPT",
    NOT_ALL = "NOT_ALL"
}
export declare enum RewardsFieldInfoDisplay {
    YES = "YES",
    NO = "NO",
    OPT = "OPT"
}
export declare enum PaymentType {
    CASH = "CASH",
    CARD = "CARD",
    CANCL = "CANCL"
}
export declare enum SearchType {
    IND = "IND",
    CODE = "CODE",
    NAME = "NAME",
    ID = "ID",
    BIN = "BIN"
}
export declare enum ThirdPartyType {
    ORG = "ORG",
    NONE = "NONE",
    PERSON = "PERSON"
}
export declare enum FeeType {
    VARIABLE = "VARIABLE",
    EXACT = "EXACT",
    MINIMUM = "MINIMUM",
    NOT_FOUND = "NOT_FOUND"
}
export declare enum GenderType {
    M = "M",
    F = "F"
}
export declare enum RedirectInfoRedirectType {
    CURRENCY_REDIRECT = "CURRENCY_REDIRECT",
    COUNTRY_REDIRECT = "COUNTRY_REDIRECT",
    COUNTRY_CURRENCY_REDIRECT = "COUNTRY_CURRENCY_REDIRECT"
}
export declare enum BillPayCancelReasonType {
    ENTERED_WRONG_ACCOUNT = "ENTERED_WRONG_ACCOUNT",
    SENT_TO_WRONG_ACCOUNT = "SENT_TO_WRONG_ACCOUNT",
    SENT_TO_WRONG_BILLER = "SENT_TO_WRONG_BILLER",
    SENT_DUPLICATE_PAYMENT = "SENT_DUPLICATE_PAYMENT",
    CUSTOMER_CHANGED_MIND = "CUSTOMER_CHANGED_MIND",
    CUSTOMER_LEFT_WITHOUT_PAYING = "CUSTOMER_LEFT_WITHOUT_PAYING",
    SHOULD_BE_EXPRESSPAYMENT = "SHOULD_BE_EXPRESSPAYMENT",
    SYSTEM_ERROR = "SYSTEM_ERROR",
    OTHER = "OTHER"
}
export declare enum RewardsRequestType {
    ENROLL = "ENROLL"
}
export interface TimeZoneCorrection {
    timeZoneId?: string;
    offset?: number;
    dstSavings?: number;
    startMode?: number;
    startDay?: number;
    startMonth?: number;
    startDayOfWeek?: number;
    startTime?: number;
    startTimeMode?: number;
    endMode?: number;
    endDay?: number;
    endMonth?: number;
    endDayOfWeek?: number;
    endTime?: number;
    endTimeMode?: number;
}
export interface TextTranslation {
    longLanguageCode: string;
    textTranslation: string;
}
export interface VersionInfo {
    versionType?: string;
    versionLevel?: string;
}
export interface StoreHourInfo {
    dayOfWeek: DayOfWeek;
    openTime?: Date;
    closeTime?: Date;
    closed: boolean;
}
export interface AgentInfo {
    agentName: string;
    address?: string;
    city?: string;
    state?: string;
    receiveCapability?: boolean;
    sendCapability?: boolean;
    agentPhone?: string;
    storeHours: StoreHourInfo[];
}
export interface RedirectInfo {
    originalSendAmount?: number;
    originalSendCurrency?: string;
    originalSendFee?: number;
    originalExchangeRate?: number;
    originalReceiveAmount?: number;
    originalReceiveCurrency?: string;
    originalReceiveCountry?: string;
    newSendFee?: number;
    newExchangeRate?: number;
    newReceiveAmount?: number;
    newReceiveCurrency?: string;
    feeDifference?: number;
    redirectType?: RedirectInfoRedirectType;
}
export interface AmountInfo {
    amountType?: string;
    amount?: number;
    amountCurrency?: string;
}
export interface DetailAmounts {
    amountType: string;
    amount: number;
    amountCurrency: string;
}
export interface SendAmountInfo {
    sendAmount?: number;
    sendCurrency?: string;
    totalSendFees?: number;
    totalDiscountAmount?: number;
    totalSendTaxes?: number;
    totalAmountToCollect?: number;
    detailSendAmounts?: AmountInfo[];
}
export interface ReceiveAmountInfo {
    receiveAmount?: number;
    receiveCurrency?: string;
    validCurrencyIndicator?: boolean;
    payoutCurrency?: string;
    totalReceiveFees?: number;
    totalReceiveTaxes?: number;
    totalReceiveAmount?: number;
    receiveFeesAreEstimated: boolean;
    receiveTaxesAreEstimated: boolean;
    detailReceiveAmounts?: AmountInfo[];
}
export interface EstimatedReceiveAmountInfo {
    receiveAmount?: number;
    receiveCurrency?: string;
    validCurrencyIndicator?: boolean;
    payoutCurrency: string;
    totalReceiveFees?: number;
    totalReceiveTaxes?: number;
    totalReceiveAmount?: number;
    receiveFeesAreEstimated: boolean;
    receiveTaxesAreEstimated: boolean;
    detailEstimatedReceiveAmounts?: AmountInfo[];
}
export interface AgentAddress {
    agentAddressLine: string[];
}
export interface FQDOInfo {
    receiveCountry: string;
    deliveryOption?: string;
    receiveAgentID?: string;
    receiveCurrency?: string;
    receiveAgentName?: string;
    receiveAgentAbbreviation?: string;
    deliveryOptionDisplayName?: string;
    registrationAuthorizationText?: string;
    speedOfDeliveryText?: string;
}
export interface PromotionInfo {
    promotionCode?: string;
    promotionDiscountId?: string;
    promotionCategoryId?: string;
    promotionDiscount?: number;
    promotionDiscountAmount?: number;
    promotionErrorCode?: string;
    promotionErrorMessage?: TextTranslation[];
}
export interface EddAdditionalInfo {
    estimatedDelivery?: string;
    estimatedDeliveryDate?: Date;
}
export interface ProfileInfo {
    unitProfileID: number;
    agentID: string;
    agentSequence: string;
    agentName: string;
}
export interface EnumeratedValueInfo {
    value: string;
    label: string;
}
export interface EnumeratedRewardsValueInfo {
    value: string;
    description: string;
}
export interface ProductFieldInfo {
    xmlTag: string;
    visibility: ProductFieldInfoVisibility;
    fieldLabel?: string;
    displayOrder?: number;
    fieldCategory?: string;
    fieldCategoryLabel?: string;
    dynamic?: boolean;
    fieldMax: number;
    fieldMin: number;
    dataType: DataTypeCode;
    enumerated?: boolean;
    defaultValue?: string;
    validationRegEx?: string;
    arrayName?: string;
    arrayLength?: number;
    exampleFormat?: string;
    enumeratedValues?: {
        enumeratedValueInfo: EnumeratedValueInfo[];
    };
}
export interface RewardsFieldInfo {
    xmlTag: string;
    fieldLabel: string;
    fieldValue?: string;
    fieldMax?: number;
    fieldOrder?: number;
    dataType?: DataTypeCode;
    required: boolean;
    enabled: boolean;
    display: RewardsFieldInfoDisplay;
    enumeratedValues?: {
        enumeratedRewardsValueInfo: EnumeratedRewardsValueInfo[];
    };
}
export interface DynamicFieldInfo {
    xmlTag: string;
    visibility?: ProductFieldInfoVisibility;
    fieldMax?: number;
    fieldMin?: number;
    scale?: number;
    dataType: DataTypeCode;
    fieldLabel?: string;
    displayOrder?: number;
    enumerated: boolean;
    defaultValue?: string;
    validationRegEx?: string;
    exampleFormat?: string;
    enumeratedValues?: {
        enumeratedValueInfo: EnumeratedValueInfo[];
    };
}
export interface ReceiptSegmentType {
    sequence?: number;
    mimeData?: string;
}
export interface ReceiptResponseType {
    receiptMimeDataSegment: ReceiptSegmentType[];
}
export interface ReceiptImageContentType {
    identifier: string;
    mimeType: string;
    image: string;
}
export interface ReceiptImagesContentType {
    receiptImage: ReceiptImageContentType[];
}
export interface PreCompletionReceiptType {
    receiptMimeType?: string;
    charsetEncoding?: string;
    disclosure1MimeData?: ReceiptResponseType;
    disclosure2MimeData?: ReceiptResponseType;
}
export interface CompletionReceiptType {
    receiptMimeType?: string;
    charsetEncoding?: string;
    agentReceiptMimeData?: ReceiptResponseType;
    consumerReceipt1MimeData?: ReceiptResponseType;
    consumerReceipt2MimeData?: ReceiptResponseType;
}
export interface StateProvinceInfo {
    countryCode: string;
    stateProvinceCode: string;
    stateProvinceName: string;
}
export interface CountryInfo {
    countryCode: string;
    countryName: string;
    countryLegacyCode: string;
    sendActive: boolean;
    receiveActive: boolean;
    directedSendCountry: boolean;
    mgDirectedSendCountry: boolean;
    baseReceiveCurrency?: string;
    isZipCodeRequired?: boolean;
}
export interface CountryCurrencyInfo {
    countryCode: string;
    baseCurrency: string;
    localCurrency?: string;
    receiveCurrency: string;
    indicativeRateAvailable: boolean;
    deliveryOption: string;
    receiveAgentID?: string;
    receiveAgentAbbreviation?: string;
    mgManaged?: string;
    agentManaged?: string;
    validationExprs?: string;
    checkDigitAlg?: string;
}
export interface CurrencyInfo {
    currencyCode: string;
    currencyName: string;
    currencyPrecision: number;
}
export interface DeliveryOptionInfo {
    dssOption: boolean;
    deliveryOptionID: number;
    deliveryOption: string;
    deliveryOptionName: string;
}
export interface RewardsInfo {
    programType: string;
    name: string;
    description: string;
}
export interface RewardsCardTypeInfo {
    cardType: string;
    description: string;
}
export interface RewardsRegistrationInfo {
    country: string;
    programType: string;
    cardType: string;
    allowPrePrintedCards: boolean;
    allowStandardCards: boolean;
}
export interface FQDOTextTranslation {
    receiveCountry: string;
    deliveryOption: string;
    receiveAgentID?: string;
    receiveCurrency?: string;
    languageCode?: string;
    longLanguageCode?: string;
    registrationAuthorizationText?: string;
    speedOfDeliveryText?: string;
}
export interface ReceiverInfo {
    accountNickname?: string;
    receiverPhoneNumber?: string;
    receiverFirstName: string;
    receiverMiddleName?: string;
    receiverLastName: string;
    receiverLastName2?: string;
    mgCustomerReceiveNumber: string;
    displayAccountID?: string;
}
export interface BillerInfo {
    receiveAgentID: string;
    receiveCode: string;
    billerGroupID?: string;
    billerGroupName?: string;
    billerName: string;
    address1?: string;
    address2?: string;
    address3?: string;
    billerCity?: string;
    billerState?: string;
    serviceOfferingID?: string;
    serviceOffering?: string;
    serviceOfferingSecondary?: string;
    serviceOfferingShort?: string;
    serviceOfferingShortSecondary?: string;
    industryID?: string[];
    expectedPostingTimeFrame?: string;
    expectedPostingTimeFrameSecondary?: string;
    billerNotes?: string;
    billerNotesSecondary?: string;
    secondaryLang?: string;
    productVariant: string;
    billerCutoffTime?: string;
    billerWebsite?: string;
    billerPhoneNumber?: string;
    maskAccountNumber?: boolean;
    nationalBillerFlag?: boolean;
    useStandardUBPFields?: boolean;
    acctNumberNumericOnly?: boolean;
    sendFixedAmountFlag?: boolean;
    cancelWarnFlag?: boolean;
    refundWarnFlag?: boolean;
    doubleAcctNumberEntryFlag?: boolean;
    minimumFeeAmt?: number;
    feeType?: FeeType;
    consolidatorLocationId?: string;
    consolidatorName?: string;
    classOfTradeCode?: string;
    expeditedEligibleFlag?: boolean;
}
export interface RegistrationFieldInfo {
    xmlTag: string;
    dataTypeCode: DataTypeCode;
    enumerated: boolean;
    hidden: boolean;
    required: boolean;
    fieldLabel: string;
    fieldMin?: number;
    fieldMax?: number;
    fieldScale?: number;
    defaultValue?: string;
    validationRegEx?: string;
    displayOrder?: number;
    exampleFormat?: string;
    readOnly?: boolean;
    enumeratedValues?: {
        enumeratedValueInfo: EnumeratedValueInfo[];
    };
}
export interface ReceiveCountryRequirementsInfo {
    receiveCountry: string;
    deliveryOption: string;
    receiverAddressRequired: boolean;
    receiver2ndLastNameRequired: boolean;
    questionRestricted: boolean;
    questionRequired: boolean;
    receiveActiveForAgent: boolean;
}
export interface ReceiverLookupInfo {
    receiveCountry?: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName?: string;
    receiverLastName2?: string;
    receiverAddress?: string;
    receiverAddress2?: string;
    receiverAddress3?: string;
    receiverAddress4?: string;
    receiverCity?: string;
    receiverState?: string;
    receiverZipCode?: string;
    receiverCountry?: string;
    receiverPhone?: string;
    sendAmount?: number;
    deliveryOption?: string;
    sendCurrency?: string;
    direction1?: string;
    direction2?: string;
    direction3?: string;
    customerReceiveNumber?: string;
    accountNickname?: string;
    displayAccountID?: string;
    receiveAgentID?: string;
    receiveAgentName?: string;
    receiveAgentAbbreviation?: string;
    receiveCurrency?: string;
    payoutCurrency?: string;
    receiverPhoneCountryCode?: string;
}
export interface BillerLookupInfo {
    receiveCode?: string;
    receiveAgentID?: string;
    billerAccountNumber?: string;
    billerName?: string;
    billerAddress?: string;
    billerAddress2?: string;
    billerCity?: string;
    billerState?: string;
    productVariant: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName?: string;
    receiverLastName2?: string;
}
export interface SenderLookupInfo {
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName?: string;
    senderLastName2?: string;
    senderAddress?: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderAddress4?: string;
    senderCity?: string;
    senderState?: string;
    senderZipCode?: string;
    senderCountry?: string;
    senderHomePhone?: string;
    freqCustCardNumber?: string;
    agentFrequentCustomerNumber?: string;
    consumerId?: string;
    senderBirthCountry?: string;
    senderDOB?: Date;
    senderHomePhoneCountryCode?: string;
    senderTransactionEmailNotificationOptIn?: boolean;
    senderTransactionSMSNotificationOptIn?: boolean;
    senderMarketingEmailNotificationOptIn?: boolean;
    senderMarketingSMSNotificationOptIn?: boolean;
    senderEmailAddress?: string;
    senderMobilePhone?: string;
    receiverInfo?: ReceiverLookupInfo[];
    billerInfo?: BillerLookupInfo[];
}
export interface FeeInfo {
    validReceiveAmount: number;
    validReceiveCurrency: string;
    validExchangeRate: number;
    estimatedReceiveAmount?: number;
    estimatedReceiveCurrency?: string;
    estimatedExchangeRate?: number;
    totalAmount: number;
    receiveCountry: string;
    deliveryOption?: string;
    receiveAmountAltered?: boolean;
    speedOfDeliveryText?: string;
    saLimitAvailable?: number;
    revisedInformationalFee?: boolean;
    deliveryOptId?: string;
    deliveryOptDisplayName?: string;
    regAuthText?: string;
    receiveAgentID?: string;
    receiveAgentName?: string;
    receiveAgentAbbreviation?: string;
    mgManaged?: string;
    disclosureText?: string;
    mgiTransactionSessionID: string;
    sendAmountAltered: boolean;
    additionalInfoText?: string;
    eddAdditionalDetails?: {
        eddAdditionalInfo: EddAdditionalInfo[];
    };
    promotionInfo?: PromotionInfo[];
    sendAmounts?: SendAmountInfo;
    receiveAmounts?: EstimatedReceiveAmountInfo;
}
export interface ReferenceNumberInfo {
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName: string;
    senderLastName2?: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName: string;
    receiverLastName2?: string;
    transactionStatus: TransactionStatus;
    dateTimeSent: Date;
    sendCurrency?: string;
    originalSendAmount?: number;
    referenceNumber: string;
}
export interface FormFreeTransactionInfo {
    senderLastName: string;
    senderFirstName?: string;
    senderAddress: string;
    senderCity: string;
    senderState?: string;
    senderCountry: string;
    senderZipCode?: string;
    senderPhone?: string;
    freqCustCardNumber?: string;
    receiverLastName?: string;
    receiverFirstName?: string;
    receiverLastName2?: string;
    receiveState?: string;
    receiveCountry?: string;
    billerName?: string;
    billerAccountNumber?: string;
    transactionNumber: string;
}
export interface FormFreeTransactionInfo2 extends FormFreeTransactionInfo {
    amount: number;
    sendCurrency: string;
}
export interface VariableReceiptTextInfo {
    receiptTextType: string;
    textTranslation: TextTranslation[];
}
export interface MoneyGramSendDetailInfo {
    referenceNumber: string;
    faceAmount: number;
    feeAmount: number;
    totalAmount: number;
    sendCurrency: string;
    agentNumber: string;
    paymentType: PaymentType;
    agentName: string;
    time: Date;
}
export interface MoneyGramSendSummaryInfo {
    faceAmount: number;
    feeAmount: number;
    totalAmount: number;
    sendCurrency: string;
    agentNumber: string;
    agentName: string;
}
export interface MoneyGramReceiveDetailInfo {
    time: Date;
    referenceNumber: string;
    receiverName: string;
    checkNumber?: string;
    receiveAmount: number;
    agentNumber?: string;
    payoutType: string;
    agentName?: string;
    accountNumber?: string;
    receiveCurrency: string;
}
export interface MoneyGramReceiveSummaryInfo {
    agentNumber: string;
    agentName: string;
    cashOrCheckAmount?: number;
    otherPayoutAmount?: number;
    receiveCurrency: string;
}
export interface BillPaymentDetailInfo {
    referenceNumber: string;
    productVariant: string;
    faceAmount: number;
    feeAmount: number;
    totalAmount: number;
    infoFeeIndicator?: boolean;
    processingFee?: number;
    agentNumber: string;
    paymentType: PaymentType;
    agentName: string;
    date: Date;
    status: TransactionStatus;
}
export interface BillPaymentSummaryInfo {
    productVariant: string;
    faceAmount: number;
    feeAmount: number;
    totalAmount: number;
    agentNumber: string;
    agentName: string;
}
export interface ProductProfileItem {
    index: number;
    key: string;
    value?: string;
    productID: number;
}
export interface ProfileItem {
    index: number;
    key: string;
    value?: string;
}
export interface RegistrationInfo {
    mgCustomerReceiveNumber: string;
    mgCustomerReceiveNumberVersion: number;
    receiverFirstName: string;
    receiverMiddleName: string;
    receiverLastName: string;
    receiverLastName2: string;
    receiverPhoneNumber: string;
    creatorFirstName: string;
    creatorMiddleName: string;
    creatorLastName: string;
    creatorLastName2: string;
    fqdoInfo: FQDOInfo;
}
export interface IndustryInfo {
    industryID: string;
    industryName: string;
}
export interface stateRegulatorInfo {
    dfJurisdiction: string;
    stateRegulatorURL: string;
    stateRegulatorPhone: string;
    stateRegulatorName: TextTranslation[];
}
export interface PromotionLookupInfo {
    promotionDiscountName?: string;
    currencyCode?: string;
    promotionDiscount?: number;
    promotionMaxDiscountAmount?: number;
    promotionCategoryName?: string;
    promotionName?: string;
    promotionId?: number;
    promotionBeginDate?: string;
    promotionEndDate?: string;
    promotionCategoryBeginDate?: string;
    promotionCategoryEndDate?: string;
}
export interface CountryTranslation {
    countryCode: string;
    languageCode: string;
    longLanguageCode: string;
    displayName: string;
}
export interface CurrencyTranslation {
    currencyCode: string;
    languageCode: string;
    longLanguageCode: string;
    displayName: string;
}
export interface DeliveryOptionTranslation {
    deliveryOption: string;
    languageCode: string;
    longLanguageCode: string;
    displayName: string;
}
export interface IndustryTranslation {
    industryId: string;
    displayName: string;
    languageCode: string;
    longLanguageCode: string;
}
export interface ReceiptTextDfInfo {
    longLanguageCode: string;
    textTranslation: string;
}
export interface VariableReceiptInfoRequest extends Request {
    languages: {
        longLanguageCode: string[];
    };
}
export interface VariableReceiptInfoResponse extends Response {
    version: string;
    receiptText?: VariableReceiptTextInfo[];
}
export declare type CheckInRequest = Request;
export interface CheckInResponse extends Response {
    token?: string;
    timeZoneCorrection?: TimeZoneCorrection;
}
export interface DoddFrankStateRegulatorInfoRequest extends Request {
    dfJurisdiction?: string;
    languages: {
        longLanguageCode: string[];
    };
}
export interface DoddFrankStateRegulatorInfoResponse extends Response {
    version: string;
    stateRegulatorInfo: stateRegulatorInfo[];
}
export interface CommitTransactionRequest extends Request {
    mgiTransactionSessionID: string;
    productType: ProductType;
    fieldValues?: {
        keyValuePair: KeyValuePair[];
    };
    stateRegulatorVersion?: string;
}
export interface CommitTransactionResponse extends Response {
    referenceNumber: string;
    partnerConfirmationNumber?: string;
    partnerName?: string;
    freePhoneCallPIN?: string;
    tollFreePhoneNumber?: string;
    expectedDateOfDelivery?: Date;
    transactionDateTime: Date;
    receiptTextInfo?: TextTranslation[];
    receipts?: CompletionReceiptType;
    referenceNumberTextCode?: string;
    referenceNumberText?: string;
    referenceNumberConsumerText?: string;
}
export interface AmendTransactionRequest extends Request {
    referenceNumber: string;
    operatorName: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName: string;
    receiverLastName2?: string;
    receiverNameSuffix?: string;
    receiverNameSuffixOther?: string;
    receiverFirstNameNotAvailable?: boolean;
}
export interface AmendTransactionResponse extends Response {
    transactionSucceeded: boolean;
    receipts?: PreCompletionReceiptType;
}
export interface MoneyGramConsumerLookupRequest extends Request {
    customerPhone?: string;
    freqCustCardNumber?: string;
    agentFrequentCustomerNumber?: string;
    maxSendersToReturn: number;
    maxReceiversToReturn: number;
}
export interface MoneyGramConsumerLookupResponse extends Response {
    senderInfo?: SenderLookupInfo[];
}
export interface BillPaymentConsumerLookupRequest extends Request {
    customerPhone?: string;
    freqCustCardNumber?: string;
    billerAccountNumber?: string;
    maxSendersToReturn: number;
    maxReceiversToReturn: number;
}
export interface BillPaymentConsumerLookupResponse extends Response {
    senderInfo?: SenderLookupInfo[];
}
export interface ConfirmTokenRequest extends Request {
    codeTableVersion?: string;
    clientTableVersions?: VersionInfo[];
}
export interface ConfirmTokenResponse extends Response {
    profileChanged: boolean;
    codeTableChanged: boolean;
}
export interface CityListRequest extends Request {
    country: string;
    state?: string;
    city: string;
    maxRowsToReturn?: number;
}
export interface CityListResponse extends Response {
    city?: string[];
}
export interface CodeTableRequest extends Request {
    agentAllowedOnly?: boolean;
}
export interface CodeTableResponse extends Response {
    version: string;
    stateProvinceInfo?: StateProvinceInfo[];
    countryInfo: CountryInfo[];
    currencyInfo: CurrencyInfo[];
    countryCurrencyInfo: CountryCurrencyInfo[];
    deliveryOptionInfo: DeliveryOptionInfo[];
    rewardsInfo?: RewardsInfo[];
    rewardsCardTypeInfo?: RewardsCardTypeInfo[];
    rewardsRegistrationInfo?: RewardsRegistrationInfo[];
}
export declare type CurrencyInfoRequest = Request;
export interface CurrencyInfoResponse extends Response {
    version: string;
    currencyInfo: CurrencyInfo[];
}
export interface StateProvinceInfoRequest extends Request {
    stateProvinceFilter?: string;
}
export interface StateProvinceInfoResponse extends Response {
    version: string;
    stateProvinceInfo: StateProvinceInfo[];
}
export interface CountryInfoRequest extends Request {
    countryFilter?: string;
}
export interface CountryInfoResponse extends Response {
    version: string;
    countryInfo: CountryInfo[];
}
export interface DetailLookupRequest extends Request {
    referenceNumber?: string;
    mgiTransactionSessionID?: string;
    includeUseData: boolean;
    operatorName?: string;
}
export interface DetailLookupResponse extends Response {
    mgiTransactionSessionID?: string;
    transactionStatus: TransactionStatus;
    dateTimeSent: Date;
    referenceNumber?: string;
    freqCustCardNumber?: string;
    receiveCountry: string;
    deliveryOption?: string;
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName?: string;
    senderLastName2?: string;
    senderAddress?: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderCity?: string;
    senderState?: string;
    senderZipCode?: string;
    senderCountry?: string;
    senderHomePhone?: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName?: string;
    receiverLastName2?: string;
    receiverAddress?: string;
    receiverAddress2?: string;
    receiverAddress3?: string;
    direction1?: string;
    direction2?: string;
    direction3?: string;
    receiverCity?: string;
    receiverState?: string;
    receiverZipCode?: string;
    receiverCountry?: string;
    receiverPhone?: string;
    testQuestion?: string;
    testAnswer?: string;
    messageField1?: string;
    messageField2?: string;
    senderPhotoIdType?: string;
    senderPhotoIdNumber?: string;
    senderPhotoIdState?: string;
    senderPhotoIdCountry?: string;
    senderLegalIdType?: string;
    senderLegalIdNumber?: string;
    senderDOB?: Date;
    senderOccupation?: string;
    thirdPartyFirstName?: string;
    thirdPartyMiddleName?: string;
    thirdPartyLastName?: string;
    thirdPartyLastName2?: string;
    thirdPartyAddress?: string;
    thirdPartyAddress2?: string;
    thirdPartyAddress3?: string;
    thirdPartyCity?: string;
    thirdPartyState?: string;
    thirdPartyCountry?: string;
    thirdPartyZipCode?: string;
    thirdPartyDOB?: Date;
    thirdPartyLegalIdType?: string;
    thirdPartyLegalIdNumber?: string;
    thirdPartyOrg?: string;
    senderBirthCity?: string;
    senderBirthCountry?: string;
    senderPassportIssueDate?: Date;
    senderPassportIssueCity?: string;
    senderPassportIssueCountry?: string;
    operatorName?: string;
    validIndicator?: boolean;
    agentUseSendData?: string;
    customerReceiveNumber?: string;
    receiveAgentID?: string;
    receiveAgentName?: string;
    receiveAgentAbbreviation?: string;
    expectedDateOfDelivery?: Date;
    redirectIndicator?: boolean;
    redirectInfo?: RedirectInfo;
    agentCheckAuthorizationNumber?: string;
    accountNickname?: string;
    promotionInfo?: PromotionInfo[];
    disclosureText?: TextTranslation[];
    feeRefundRequired?: boolean;
    sendAmounts?: SendAmountInfo;
    receiveAmounts?: ReceiveAmountInfo;
    exchangeRateApplied?: number;
    referenceNumberTextCode?: string;
    referenceNumberText?: string;
}
export interface DirectedSendRegistrationFieldsRequest extends Request {
    receiveCountry: string;
    deliveryOption: string;
    receiveAgentID: string;
    receiveCurrency: string;
}
export interface DirectedSendRegistrationFieldsResponse extends Response {
    fqdoInfo: FQDOInfo;
    registrationFieldInfo?: RegistrationFieldInfo[];
}
export interface DirectoryOfAgentsByAreaCodePrefixRequest extends Request {
    areaCodePrefix: string;
    country?: string;
    maxRowsToReturn?: number;
}
export interface DirectoryOfAgentsByAreaCodePrefixResponse extends Response {
    agentInfo?: AgentInfo[];
}
export interface DirectoryOfAgentsByCityRequest extends Request {
    country: string;
    state?: string;
    city: string;
    maxRowsToReturn?: number;
}
export interface DirectoryOfAgentsByCityResponse extends Response {
    agentInfo?: AgentInfo[];
}
export interface DirectoryOfAgentsByZipRequest extends Request {
    zipCode: string;
    country?: string;
    maxRowsToReturn?: number;
}
export interface DirectoryOfAgentsByZipResponse extends Response {
    agentInfo?: AgentInfo[];
}
export interface FeeLookupRequest extends Request {
    productType: ProductType;
    productVariant?: string;
    operatorName?: string;
    amountIncludingFee?: number;
    amountExcludingFee?: number;
    receiveAmount?: number;
    receiveCountry: string;
    deliveryOption?: string;
    mgiRewardsNumber?: string;
    receiveCode?: string;
    indicativeReceiveCurrency?: string;
    receiveAgentID?: string;
    receiveCurrency?: string;
    sendCurrency?: string;
    mgCustomerReceiveNumber?: string;
    defaultInformationalFee?: number;
    serviceOfferingID?: string;
    defaultMaxFee?: boolean;
    allOptions: boolean;
    promoCodeValues?: {
        promoCode: string[];
    };
}
export interface FeeLookupResponse extends Response {
    feeInfo?: FeeInfo[];
}
export interface FormFreeBPLookupRequest extends Request {
    confirmationNumber: string;
    receiptImages?: ReceiptImagesContentType;
}
export interface FormFreeBPLookupResponse extends Response {
    maxAmount: number;
    feeAmount?: number;
    freqCustCardNumber?: string;
    destinationCountry: string;
    receiveCode?: string;
    receiveAgentID?: string;
    billerAccountNumber: string;
    validateAccountNumber?: string;
    billerName?: string;
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName?: string;
    senderLastName2?: string;
    senderAddress?: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderAddress4?: string;
    senderCity?: string;
    senderState?: string;
    senderZipCode?: string;
    senderCountry?: string;
    senderHomePhone?: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName?: string;
    receiverLastName2?: string;
    messageField1?: string;
    messageField2?: string;
    senderPhotoIdType?: string;
    senderPhotoIdNumber?: string;
    senderPhotoIdState?: string;
    senderPhotoIdCountry?: string;
    senderLegalIdType?: string;
    senderLegalIdNumber?: string;
    senderDOB?: Date;
    senderOccupation?: string;
    thirdPartyFirstName?: string;
    thirdPartyMiddleName?: string;
    thirdPartyLastName?: string;
    thirdPartyLastName2?: string;
    thirdPartyAddress?: string;
    thirdPartyAddress2?: string;
    thirdPartyAddress3?: string;
    thirdPartyAddress4?: string;
    thirdPartyCity?: string;
    thirdPartyState?: string;
    thirdPartyCountry?: string;
    thirdPartyZipCode?: string;
    thirdPartyLegalIdType?: string;
    thirdPartyLegalIdNumber?: string;
    thirdPartyDOB?: Date;
    thirdPartyOrg?: string;
    productVariant: string;
    serviceOfferingID?: string;
    sendCurrency: string;
    receiveCurrency: string;
    receipts?: PreCompletionReceiptType;
}
export interface FormFreeReceiveLookupRequest extends Request {
    referenceNumber: string;
    receiptImages?: ReceiptImagesContentType;
}
export interface FormFreeReceiveLookupResponse extends Response {
    referenceNumber: string;
    receiveAmount: number;
    receiveCurrency: string;
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName?: string;
    senderLastName2?: string;
    senderHomePhone?: string;
    originatingCountry?: string;
    dateTimeSent?: Date;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName?: string;
    receiverLastName2?: string;
    receiverAddress?: string;
    receiverAddress2?: string;
    receiverAddress3?: string;
    receiverAddress4?: string;
    receiverCity?: string;
    receiverState?: string;
    receiverZipCode?: string;
    receiverCountry?: string;
    messageField1?: string;
    messageField2?: string;
    mgiTransactionSessionID: string;
    receipts?: PreCompletionReceiptType;
}
export interface FormFreeSendLookupRequest extends Request {
    confirmationNumber: string;
    amount: number;
    feeAmount?: number;
    primaryReceiptLanguage?: string;
    secondaryReceiptLanguage?: string;
    receiptImages?: ReceiptImagesContentType;
}
export interface FormFreeSendLookupResponse extends Response {
    agentTransactionId?: string;
    confirmationNumber?: string;
    mgiTransactionSessionID: string;
    maxAmount: number;
    mgiRewardsNumber?: string;
    agentCustomerNumber?: string;
    destinationCountry: string;
    destinationState?: string;
    deliveryOption: string;
    receiveAgentID?: string;
    displayAccountID?: string;
    customerReceiveNumber?: string;
    accountNickname?: string;
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName: string;
    senderLastName2?: string;
    senderAddress: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderCity: string;
    senderState?: string;
    senderZipCode?: string;
    senderCountry: string;
    senderHomePhone?: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName: string;
    receiverLastName2?: string;
    promotionInfo?: PromotionInfo[];
    promotionalMessage?: TextTranslation[];
    readyForCommit?: boolean;
    disclosureText?: TextTranslation[];
    receiveAgentName?: string;
    receiveAgentAddress?: AgentAddress;
    additionalFieldsToCollect?: ProductFieldInfo[];
    sendAmounts?: SendAmountInfo;
    receiveAmounts?: ReceiveAmountInfo;
    exchangeRateApplied?: number;
    receipts?: PreCompletionReceiptType;
}
export interface FormFreeTypeLookupRequest extends Request {
    confirmationNumber: string;
}
export interface FormFreeTypeLookupResponse extends Response {
    productType: ProductType;
}
export interface FormFreeTranLookupRequest extends Request {
    freqCustCardNumber?: string;
    senderPhoneNumber?: string;
    senderFirstName?: string;
    senderLastName?: string;
    billerAccountNumber?: string;
    tranType: string;
    thisLocationOnly: boolean;
    maxRowsToReturn?: number;
}
export interface FormFreeTranLookupResponse extends Response {
    formFreeTransactionInfo?: FormFreeTransactionInfo[];
}
export declare type FormFreeTranLookupWithAmountRequest = FormFreeTranLookupRequest;
export interface FormFreeTranLookupWithAmountResponse extends Response {
    formFreeTransactionInfo2?: FormFreeTransactionInfo2[];
}
export interface GetFieldsForProductRequest extends Request {
    receiveCountry: string;
    deliveryOption?: string;
    thirdPartyType: ThirdPartyType;
    receiveAgentID?: string;
    customerReceiveNumber?: string;
    billerAccountNumber?: string;
    cardSwiped?: boolean;
    otherPayoutType?: string;
    receiveCurrency: string;
    amount: number;
    sendCurrency?: string;
    productType: ProductType;
    productVariant?: string;
    serviceOfferingID?: string;
    consumerId: string;
    formFreeStaging: boolean;
    mgiTransactionSessionID?: string;
}
export interface GetFieldsForProductResponse extends Response {
    fqdoInfo: FQDOInfo;
    productFieldInfo?: ProductFieldInfo[];
    requiredProductFieldInfo?: ProductFieldInfo[];
    dynamicFieldInfo?: DynamicFieldInfo[];
}
export interface GetFieldsForRewardsRequest extends Request {
    cardTypeCode: string;
    programType: string;
    rewardsRequestType: RewardsRequestType;
    freqCustCardNumber?: string;
    senderCountry?: string;
}
export interface GetFieldsForRewardsResponse extends Response {
    rewardsFieldInfo?: RewardsFieldInfo[];
}
export interface SaveRewardsRequest extends Request {
    cardTypeCode?: string;
    freqCustCardNumber?: string;
    operatorID?: string;
    consumerTitle?: string;
    consumerFirstName?: string;
    consumerMiddleName?: string;
    consumerLastName?: string;
    consumerLastName2?: string;
    consumerAddress?: string;
    consumerAddress2?: string;
    consumerAddress3?: string;
    consumerCity?: string;
    consumerState?: string;
    consumerZipCode?: string;
    consumerCountry?: string;
    consumerHomePhone?: string;
    consumerEmailAddress?: string;
    consumerMobilePhone?: string;
    personalIdNumber1?: string;
    personalIdTypeCode1?: string;
    personalIdIssueOfficeCode1?: string;
    personalIdIssueCity1?: string;
    personalIdIssueState1?: string;
    personalIdIssueCountry1?: string;
    personalIdIssueMonth1?: string;
    personalIdIssueDay1?: string;
    personalIdIssueYear1?: string;
    personalIdExpirationMonth1?: string;
    personalIdExpirationDay1?: string;
    personalIdExpirationYear1?: string;
    consumerDOB?: Date;
    consumerBirthCity?: string;
    consumerBirthState?: string;
    consumerBirthCountry?: string;
    gender?: GenderType;
    marketingOptIn?: boolean;
    marketingByCellPhone?: boolean;
    marketingByEmail?: boolean;
    marketingByHomePhone?: boolean;
    marketingByMail?: boolean;
    marketingBySMS?: boolean;
    marketingLanguage?: string;
    receiveNoticeOptIn?: boolean;
    receiveNoticeEmailAddress?: string;
    receiveNoticeViaEMail?: boolean;
    receiveNoticeViaSMS?: boolean;
    receiveNoticeMobilePhone?: string;
    receiveNoticeLanguage?: string;
    quarterlyStatements?: boolean;
    quarterlyStatementsByEmail?: boolean;
    quarterlyStatementsByMail?: boolean;
    consentOfPersonalInformationThirdParty?: boolean;
    agentAcknowledgement?: boolean;
}
export interface SaveRewardsResponse extends Response {
    freqCustCardNumber: string;
}
export interface GetFQDOByCustomerReceiveNumberRequest extends Request {
    mgCustomerReceiveNumber: string;
}
export interface GetFQDOByCustomerReceiveNumberResponse extends Response {
    fqdoInfo: FQDOInfo;
    registrationStatusCode: string;
}
export interface FQDOsForCountryRequest extends Request {
    receiveCountry: string;
    agentAllowedOnly?: boolean;
}
export interface FQDOsForCountryResponse extends Response {
    fqdoInfo?: FQDOInfo[];
}
export declare type IndustryRequest = Request;
export interface IndustryResponse extends Response {
    industryInfoList?: IndustryInfo[];
}
export interface InitialSetupRequest extends Request {
    password: string;
    timeZoneName?: string;
}
export interface InitialSetupResponse extends Response {
    token?: string;
    unitProfileID: number;
}
export interface MoneyGramReceiveDetailReportRequest extends Request {
    activityDate: Date;
}
export interface MoneyGramReceiveDetailReportResponse extends Response {
    reportInfo?: MoneyGramReceiveDetailInfo[];
}
export interface MoneyGramReceiveSummaryReportRequest extends Request {
    activityDate: Date;
}
export interface MoneyGramReceiveSummaryReportResponse extends Response {
    reportInfo?: MoneyGramReceiveSummaryInfo[];
}
export interface MoneyGramSendDetailReportRequest extends Request {
    activityDate: Date;
}
export interface MoneyGramSendDetailReportResponse extends Response {
    reportInfo?: MoneyGramSendDetailInfo[];
}
export interface MoneyGramSendSummaryReportRequest extends Request {
    activityDate: Date;
}
export interface MoneyGramSendSummaryReportResponse extends Response {
    reportInfo?: MoneyGramSendSummaryInfo[];
}
export declare type ProfileRequest = Request;
export interface ProfileResponse extends Response {
    profileItem: ProfileItem[];
    productProfileItem: ProductProfileItem[];
}
export declare type GetRelatedProfilesRequest = Request;
export interface GetRelatedProfilesResponse extends Response {
    modelUnitProfileID: number;
    modelPOS: boolean;
    profileInfo?: ProfileInfo[];
}
export interface QueryRegistrationByNamesRequest extends Request {
    receiveCountry: string;
    deliveryOption: string;
    receiveAgentID: string;
    receiveCurrency: string;
    receiverFirstName?: string;
    receiverLastName?: string;
    receiverPhoneNumber?: string;
    registrationCreatorFirstName?: string;
    registrationCreatorLastName?: string;
    registrationCreatorPhoneNumber?: string;
    maxRowsToReturn?: number;
}
export interface QueryRegistrationByNamesResponse extends Response {
    receiverInfo?: ReceiverInfo[];
}
export declare type ReceiveCountryRequirementsRequest = Request;
export interface ReceiveCountryRequirementsResponse extends Response {
    version?: string;
    receiveCountryRequirementsInfo?: ReceiveCountryRequirementsInfo[];
}
export interface ReceiveReversalRequest extends Request {
    receiveAmount: number;
    referenceNumber: string;
    operatorName?: string;
    communicationRetryIndicator?: boolean;
    receiveReversalReason: string;
}
export interface ReceiveReversalResponse extends Response {
    transactionDateTime: Date;
}
export interface ReferenceNumberNameRequest extends Request {
    receiverLastName: string;
    receiverFirstName?: string;
    senderLastName: string;
    operatorName?: string;
}
export interface ReferenceNumberNameResponse extends Response {
    referenceInfo?: ReferenceNumberInfo[];
}
export interface ReferenceNumberPhoneRequest extends Request {
    senderHomePhone: string;
    operatorName?: string;
}
export interface ReferenceNumberPhoneResponse extends Response {
    referenceInfo?: ReferenceNumberInfo[];
}
export interface ReferenceNumberRequest extends Request {
    referenceNumber: string;
    pin?: string;
    operatorName?: string;
}
export interface ReferenceNumberResponse extends Response {
    mgiTransactionSessionID: string;
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName?: string;
    senderLastName2?: string;
    senderHomePhone?: string;
    senderAddress?: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderAddress4?: string;
    senderCity?: string;
    senderState?: string;
    senderZipCode?: string;
    senderCountry?: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName?: string;
    receiverLastName2?: string;
    receiverAddress?: string;
    receiverAddress2?: string;
    receiverAddress3?: string;
    receiverAddress4?: string;
    direction1?: string;
    direction2?: string;
    direction3?: string;
    receiverCity?: string;
    receiverState?: string;
    receiverZipCode?: string;
    receiverCountry?: string;
    receiverPhone?: string;
    testQuestion?: string;
    testAnswer?: string;
    messageField1?: string;
    messageField2?: string;
    agentCheckNumber?: string;
    agentCheckAmount?: number;
    agentCheckAuthorizationNumber?: string;
    customerCheckNumber?: string;
    customerCheckAmount?: number;
    okForAgent: boolean;
    deliveryOption?: string;
    transactionStatus: TransactionStatus;
    dateTimeSent: Date;
    receiveCurrency: string;
    receiveAmount: number;
    receiveFees?: number;
    receiveTaxes?: number;
    referenceNumber: string;
    originatingCountry?: string;
    validIndicator: boolean;
    indicativeReceiveAmount?: number;
    indicativeReceiveCurrency?: string;
    indicativeExchangeRate?: number;
    mgCustomerReceiveNumber?: string;
    partnerCustomerReceiveNumber?: string;
    receiveAgentID?: string;
    receiveAgentName?: string;
    receiveAgentAbbreviation?: string;
    expectedDateOfDelivery?: Date;
    originalSendAmount?: number;
    originalSendCurrency?: string;
    originalSendFee?: number;
    originalExchangeRate?: number;
    redirectIndicator?: boolean;
    redirectInfo?: RedirectInfo;
    okForPickup?: boolean;
    notOkForPickupReasonCode?: number;
    notOkForPickupReasonDescription?: string;
    minutesUntilOkForPickup?: number;
    sendPurposeOfTransaction?: string;
    sendPurposeOfTransactionOther?: string;
    receiverNameSuffix?: string;
    receiverNameSuffixOther?: string;
}
export interface SaveRegistrationRequest extends Request {
    receiveCountry: string;
    deliveryOption: string;
    receiveAgentID: string;
    receiveCurrency: string;
    fieldValues?: {
        keyValuePair: KeyValuePair[];
    };
}
export interface SaveRegistrationResponse extends Response {
    mgCustomerReceiveNumber: string;
    mgCustomerReceiveNumberVersion?: number;
    registrationStatusCode: string;
    verificationRequiredForUse: boolean;
    ofacStatus: boolean;
}
export interface SendReversalRequest extends Request {
    sendAmount: number;
    feeAmount: number;
    sendCurrency: string;
    referenceNumber: string;
    operatorName?: string;
    reversalType: SendReversalType;
    sendReversalReason?: string;
    feeRefund?: string;
    agentCheckType?: string;
    agentCheckNumber?: string;
    agentCheckAmount?: number;
    customerCheckType?: string;
    customerCheckNumber?: string;
    customerCheckAmount?: number;
    communicationRetryIndicator?: boolean;
}
export interface SendReversalResponse extends Response {
    transactionDateTime: Date;
    refundTotalAmount?: number;
    refundFaceAmount?: number;
    refundFeeAmount?: number;
    totalCheckAmount?: number;
    reversalType: SendReversalType;
    agentCheckAuthorizationNumber?: string;
    receipts?: CompletionReceiptType;
}
export interface BillPaymentCancelRequest extends Request {
    referenceNumber: string;
    productVariant: string;
    reasonDetailCode: BillPayCancelReasonType;
    sendAmount: number;
    feeAmount: number;
    sendCurrency: string;
}
export interface BillPaymentCancelResponse extends Response {
    referenceNumber?: string;
    transactionSendDate?: Date;
}
export interface SendValidationRequest extends Request {
    agentStagingChannel?: string;
    operatorName?: string;
    amount: number;
    feeAmount?: number;
    mgiRewardsNumber?: string;
    agentCustomerNumber?: string;
    destinationCountry: string;
    destinationState?: string;
    deliveryOption: string;
    receiveCurrency?: string;
    receiveAgentID?: string;
    accountNumber?: string;
    customerReceiveNumber?: string;
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName: string;
    senderLastName2?: string;
    senderAddress: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderCity: string;
    senderState?: string;
    senderZipCode?: string;
    senderCountry: string;
    senderHomePhone?: string;
    sendCurrency: string;
    consumerId: string;
    mgiTransactionSessionID: string;
    formFreeStaging: boolean;
    timeToLive?: number;
    primaryReceiptLanguage?: string;
    secondaryReceiptLanguage?: string;
    receiptImages?: ReceiptImagesContentType;
    promoCodeValues?: {
        promoCode: string[];
    };
    fieldValues?: {
        keyValuePair: KeyValuePair[];
    };
}
export interface SendValidationResponse extends Response {
    mgiTransactionSessionID: string;
    referenceNumber?: string;
    customerReceiveNumber?: string;
    displayAccountID?: string;
    customerServiceMessage?: string;
    accountNickname?: string;
    promotionInfo?: PromotionInfo[];
    promotionalMessage?: TextTranslation[];
    readyForCommit?: boolean;
    disclosureText?: TextTranslation[];
    receiveAgentName?: string;
    receiveAgentAddress?: AgentAddress;
    additionalFieldsToCollect?: ProductFieldInfo[];
    sendAmounts?: SendAmountInfo;
    receiveAmounts?: ReceiveAmountInfo;
    exchangeRateApplied?: number;
    receiveFeeDisclosureText?: boolean;
    receiveTaxDisclosureText?: boolean;
    confirmationNumber?: string;
    receipts?: PreCompletionReceiptType;
}
export interface ReceiveValidationRequest extends Request {
    agentStagingChannel?: string;
    operatorName?: string;
    referenceNumber: string;
    pin?: string;
    receiveCurrency: string;
    agentCheckNumber?: string;
    agentCheckType?: string;
    agentCheckAmount?: number;
    customerCheckNumber?: string;
    customerCheckType?: string;
    customerCheckAmount?: number;
    receiverAddress?: string;
    receiverAddress2?: string;
    receiverAddress3?: string;
    receiverCity?: string;
    receiverState?: string;
    receiverZipCode?: string;
    receiverCountry?: string;
    mgiTransactionSessionID: string;
    formFreeStaging: boolean;
    timeToLive?: number;
    primaryReceiptLanguage?: string;
    secondaryReceiptLanguage?: string;
    receiptImages?: ReceiptImagesContentType;
    fieldValues?: {
        keyValuePair: KeyValuePair[];
    };
}
export interface ReceiveValidationResponse extends Response {
    mgiTransactionSessionID: string;
    readyForCommit?: boolean;
    disclosureText?: TextTranslation[];
    additionalFieldsToCollect?: ProductFieldInfo[];
    receipts?: PreCompletionReceiptType;
}
export interface BpValidationRequest extends Request {
    agentStagingChannel?: string;
    operatorName?: string;
    productVariant: string;
    serviceOfferingID?: string;
    amount: number;
    mgiRewardsNumber?: string;
    destinationCountry: string;
    receiveCode?: string;
    receiveAgentID?: string;
    billerAccountNumber?: string;
    validateAccountNumber?: string;
    senderFirstName?: string;
    senderMiddleName?: string;
    senderLastName?: string;
    senderLastName2?: string;
    senderAddress?: string;
    senderAddress2?: string;
    senderAddress3?: string;
    senderCity?: string;
    senderState?: string;
    senderZipCode?: string;
    senderCountry?: string;
    senderHomePhone?: string;
    senderMailingAddress?: string;
    senderMailingAddress2?: string;
    senderMailingAddress3?: string;
    senderMailingCity?: string;
    senderMailingState?: string;
    senderMailingZipCode?: string;
    senderMailingCountry?: string;
    receiverFirstName?: string;
    receiverMiddleName?: string;
    receiverLastName?: string;
    receiverLastName2?: string;
    feeAmount?: number;
    messageField1?: string;
    messageField2?: string;
    accountNumberRetryCount: number;
    agentUseSendData?: string;
    sendCurrency: string;
    receiveCurrency: string;
    pcTerminalNumber?: string;
    cardSwiped?: boolean;
    cardExpirationMonth?: string;
    cardExpirationYear?: string;
    purposeOfFund?: string;
    confirmationNumber?: string;
    agentConsumerID?: string;
    agentTransactionId?: string;
    mgiTransactionSessionID: string;
    formFreeStaging: boolean;
    timeToLive?: number;
    primaryReceiptLanguage?: string;
    secondaryReceiptLanguage?: string;
    receiptImages?: ReceiptImagesContentType;
    promoCodeValues?: {
        promoCode: string[];
    };
    fieldValues?: {
        keyValuePair: KeyValuePair[];
    };
}
export interface BpValidationResponse extends Response {
    mgiTransactionSessionID: string;
    totalSendAmount?: number;
    mgiRewardsNumber?: string;
    productVariant: string;
    serviceOfferingID?: string;
    billerWebsite?: string;
    billerPhone?: string;
    expectedPostingTimeFrame?: TextTranslation[];
    billerCutoffTime?: string;
    billerNotes?: TextTranslation[];
    serviceOfferingDescription?: TextTranslation[];
    customerTips?: TextTranslation[];
    billerAddress?: string;
    billerAddress2?: string;
    billerAddress3?: string;
    billerCity?: string;
    billerState?: string;
    billerZip?: string;
    printMGICustomerServiceNumber?: boolean;
    agentTransactionId?: string;
    promotionInfo?: PromotionInfo[];
    promotionalMessage?: TextTranslation[];
    readyForCommit?: boolean;
    disclosureText?: TextTranslation[];
    additionalFieldsToCollect?: ProductFieldInfo[];
    processingFee?: number;
    infoFeeIndicator?: boolean;
    sendAmounts?: SendAmountInfo;
    receiveAmounts?: ReceiveAmountInfo;
    exchangeRateApplied?: number;
    confirmationNumber?: string;
    receipts?: PreCompletionReceiptType;
}
export interface TranslationsRequest extends Request {
    languageCodes?: string;
}
export interface TranslationsResponse extends Response {
    translationsVersion: string;
    countryTranslations?: CountryTranslation[];
    deliveryOptionTranslations?: DeliveryOptionTranslation[];
    currencyTranslations?: CurrencyTranslation[];
    fqdoTextTranslations?: FQDOTextTranslation[];
    industryTranslations?: IndustryTranslation[];
}
export interface BillerSearchRequest extends Request {
    searchType: SearchType;
    productVariant?: string;
    industryID?: string;
    receiveCode?: string;
    billerName?: string;
    receiveAgentID?: string;
    binNumber?: string;
    defaultInformationalFee?: number;
    defaultMaxFee?: boolean;
    maxRowsToReturn?: number;
}
export interface BillerSearchResponse extends Response {
    billerInfo?: BillerInfo[];
}
export interface BillPaymentDetailReportRequest extends Request {
    activityDate: Date;
    productVariant?: string;
}
export interface BillPaymentDetailReportResponse extends Response {
    reportInfo?: BillPaymentDetailInfo[];
}
export interface BillPaymentSummaryReportRequest extends Request {
    activityDate: Date;
    productVariant?: string;
}
export interface BillPaymentSummaryReportResponse extends Response {
    reportInfo?: BillPaymentSummaryInfo[];
}
export declare type Currency = 'USD' | 'EUR' | 'XOF' | 'XAF' | 'GBP' | 'JPY' | 'CNY' | 'INR' | 'CAD' | 'AUD' | 'NZD' | 'CHF' | 'BRL' | 'RUB' | 'ZAR' | 'NGN' | 'KES' | 'EGP' | 'MXN' | 'KRW' | 'SGD' | 'HKD' | 'THB' | 'TRY' | 'PHP' | 'IDR' | 'SAR' | 'AED' | 'PLN' | 'SEK' | 'NOK' | 'DKK' | 'CZK' | 'HUF' | 'ILS' | 'MYR' | 'COP' | 'CLP' | 'ARS' | 'VND' | 'BDT' | 'PKR' | 'UAH' | 'QAR' | 'KWD' | 'BHD' | 'OMR' | 'JOD' | 'LBP' | 'MMK' | 'MAD' | 'TND' | 'DZD' | 'GHS' | 'UGX' | 'TZS' | 'RWF' | 'SCR' | 'MUR' | 'ETB' | 'ZMW' | 'BWP' | 'LSL' | 'NAD' | 'MZN' | 'AOA' | 'MWK' | 'SZL' | 'SLL' | 'SDG' | 'SSP' | 'BIF' | 'CDF' | 'GNF' | 'DJF' | 'ERN' | 'SHP' | 'FJD' | 'PGK' | 'TOP' | 'WST' | 'XCD' | 'BBD' | 'BSD' | 'BZD' | 'TTD' | 'JMD' | 'GYD' | 'SRD' | 'KYD' | 'ANG' | 'HTG' | 'NPR' | 'MVR' | 'LKR' | 'KHR' | 'LAK' | 'MNT' | 'TJS' | 'TMT' | 'UZS' | 'KGS' | 'AFN' | 'IRR' | 'YER' | 'SYP' | 'LBP' | 'IQD' | 'MKD' | 'ALL' | 'BAM' | 'GEL' | 'MDL' | 'BYN' | 'AZN' | 'AMD';
export declare type Country = 'USA' | 'GBR' | 'FRA' | 'DEU' | 'CAN' | 'AUS' | 'IND' | 'CHN' | 'JPN' | 'BRA' | 'RUS' | 'MEX' | 'KOR' | 'ZAF' | 'NGA' | 'EGY' | 'SAU' | 'ARE' | 'TUR' | 'ARG' | 'IDN' | 'VNM' | 'MYS' | 'THA' | 'PHL' | 'PAK' | 'BGD' | 'UKR' | 'POL' | 'SWE' | 'NOR' | 'DNK' | 'FIN' | 'NLD' | 'BEL' | 'ITA' | 'ESP' | 'PRT' | 'CHE' | 'AUT' | 'IRL' | 'GRC' | 'NZL' | 'SGP' | 'HKG' | 'TWN' | 'CHL' | 'COL' | 'PER' | 'VEN' | 'QAT' | 'KWT' | 'OMN' | 'JOR' | 'LBN' | 'MAR' | 'TUN' | 'DZA' | 'GHA' | 'UGA' | 'KEN' | 'TZA' | 'ETH' | 'SDN' | 'ZMB' | 'SEN' | 'ZWE';
