"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const typeorm_1 = require("typeorm");
const OperationParteners_entity_1 = require("./OperationParteners.entity");
const Parteners_entity_1 = require("./Parteners.entity");
const PartenerComptes_entity_1 = require("./PartenerComptes.entity");
const Phones_entity_1 = require("./Phones.entity");
const SousServices_entity_1 = require("./SousServices.entity");
const UssdExecutionMessages_entity_1 = require("./UssdExecutionMessages.entity");
const OperationPhones_entity_1 = require("./OperationPhones.entity");
const Enum_entity_1 = require("./Enum.entity");
const MessageUssds_entity_1 = require("./MessageUssds.entity");
const ErrorTypes_entity_1 = require("./ErrorTypes.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let Transactions = class Transactions extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Transactions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type_operation', enum: Enum_entity_1.TypeOperationEnum }),
    __metadata("design:type", String)
], Transactions.prototype, "typeOperation", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'code_ussd_response',
        enum: Enum_entity_1.EnumCodeUssdResponse,
        default: Enum_entity_1.EnumCodeUssdResponse.NO_SET,
        comment: 'Le code ussd response. Permet de savoir si le ussd a envoyer un code derreur ou un code success',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "codeUssdResponse", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'ussd_response_match',
        default: 0,
        comment: 'Permet de savoir si la reponse USSD correspond a celui dans la base pour le service',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "ussdResponseMatch", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'sous_services_id' }),
    __metadata("design:type", Number)
], Transactions.prototype, "sousServicesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'error_types_id', nullable: true }),
    __metadata("design:type", Number)
], Transactions.prototype, "errorTypesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'phones_id', nullable: true }),
    __metadata("design:type", Number)
], Transactions.prototype, "phonesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'partener_comptes_id' }),
    __metadata("design:type", Number)
], Transactions.prototype, "partenerComptesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'parteners_id' }),
    __metadata("design:type", Number)
], Transactions.prototype, "partenersId", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'is_solde_commission', default: 0 }),
    __metadata("design:type", Number)
], Transactions.prototype, "isSoldeCommission", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'solde', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Transactions.prototype, "solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde_commission',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "soldeCommission", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'commission_amount', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Transactions.prototype, "commissionAmount", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'fee_amount', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Transactions.prototype, "feeAmount", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'commission_amount_psp',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "commissionAmountPsp", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'fee_amount_psp',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "feeAmountPsn", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'commission_amount_owner',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "commissionAmountOwner", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'fee_amount_owner',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "feeAmountOwner", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'win',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "win", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Transactions.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'callback_sended_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "callbackSendedAt", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'statut',
        enum: [
            'SUCCESS',
            'PENDING',
            'PROCESSING',
            'FAILLED',
            'CANCELED',
            'REFUNDED',
        ],
        default: 'PENDING',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "statut", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'pre_statut',
        enum: [
            'SUCCESS',
            'PENDING',
            'PROCESSING',
            'FAILLED',
            'CANCELED',
            'REFUNDED',
        ],
        default: 'PENDING',
        comment: 'Permet demettre un statut temporel qui a la meme valeur que stut. Mais on peut faire une reclamation dessus',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "preStatut", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'statut_ussd_response',
        enum: Enum_entity_1.EnumValidationStatus,
        default: Enum_entity_1.EnumValidationStatus.NO_SET,
        comment: 'Permet de savoir si le tephone a repondu ou pas . Si oui cest a success. oubien a time out',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "statutUssdResponse", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'statut_sms_response',
        enum: Enum_entity_1.EnumValidationStatus,
        default: Enum_entity_1.EnumValidationStatus.NO_SET,
        comment: 'Donne le status de validation par sms. Si cest a success on ne peut plus contester ce transaction',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "statutSmsResponse", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'date_creation',
        nullable: true,
        comment: 'Date de creation de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "dateCreation", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'date_success',
        nullable: true,
        comment: 'Date de succès de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "dateSuccess", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'date_pre_success',
        nullable: true,
        comment: 'Date de pres succès succès de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "datePreSuccess", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'date_canceled',
        nullable: true,
        comment: 'Date de canceled de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "dateCanceled", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'date_refunded',
        nullable: true,
        comment: 'Date de refund de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "dateRefunded", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'date_processing',
        nullable: true,
        comment: 'Date de processing de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "dateProcessing", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'date_failled',
        nullable: true,
        comment: 'Date d’annulation de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "dateFailled", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'service_name', length: 255 }),
    __metadata("design:type", String)
], Transactions.prototype, "serviceName", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'message', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "message", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'error_message', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "errorMessage", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'transaction_id', length: 255, unique: true }),
    __metadata("design:type", String)
], Transactions.prototype, "transactionId", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'external_transaction_id',
        length: 255,
        unique: true,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "externalTransactionId", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'sous_service_transaction_id',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "sousServiceTransactionId", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'sous_service_name', length: 255 }),
    __metadata("design:type", String)
], Transactions.prototype, "sousServiceName", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'operateur_name', length: 255 }),
    __metadata("design:type", String)
], Transactions.prototype, "operateurName", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'telephone_number_service',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "telephoneNumberService", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'partner_compte_name', length: 255 }),
    __metadata("design:type", String)
], Transactions.prototype, "partnerCompteName", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'partener_name', length: 255 }),
    __metadata("design:type", String)
], Transactions.prototype, "partenerName", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'commentaire', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Transactions.prototype, "commentaire", void 0);
__decorate([
    typeorm_1.Column('longtext', {
        name: 'data',
        nullable: true,
        comment: 'Les données en json qui ont été envoyées par le client parteneur ',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "data", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'amount',
        comment: 'Montant de transaction ',
        precision: 17,
        scale: 4,
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'url_ipn',
        comment: 'Le pin du call back qui doit être en HTTPS',
        length: 255,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "urlIpn", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'phone',
        comment: 'Le numero de telephone du receveur ou de envoyeur',
        length: 45,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('longtext', {
        name: 'data_sended_callback',
        comment: 'Les donnees envoyes par le callback',
        nullable: true,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "dataSended", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'code_sous_service',
        nullable: true,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "codeSousService", void 0);
__decorate([
    typeorm_1.Column('longtext', {
        name: 'data_response_callback',
        comment: 'Les donnees recu par le callback',
        nullable: true,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "dataResponseCallback", void 0);
__decorate([
    typeorm_1.Column('longtext', {
        name: 'refund_response',
        comment: 'Les donnees recu lors du call de refund du manager api',
        nullable: true,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "refundResponse", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'callback_is_send',
        comment: 'letat envoi du callback: 1- envoyee : 0 no envoyer - 2 echeque envoie',
        default: 0,
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "callbackIsSend", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'need_check_transaction',
        default: 0,
        comment: '0: recoit un ipn, 1: pas doit appeler manuellement checkStatusTransaction',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "needCheckTransaction", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'callback_ready',
        default: 0,
        comment: '0: recoit un ipn, 1: task can send ipn',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "callbackReady", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'next_send_callback_date', nullable: true }),
    __metadata("design:type", Date)
], Transactions.prototype, "nextSendCallbackDate", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'check_transaction_response', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "checkTransactionResponse", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'deep_link_url', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "deepLinkUrl", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'success_redirect_url', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "successRedirectUrl", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'error_redirect_url', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "errorRedirectUrl", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'transaction_is_finish',
        default: 0,
        comment: '0: non , 1: yes',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "transactionIsFinish", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'transaction_refund_is_finished',
        default: 0,
        comment: '0: non , 1: yes',
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "transactionRefundFinished", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'reached_timeout',
        comment: '0: non , 1: yes',
        default: 0,
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "reachedTimeout", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'canceled',
        comment: '0: non , 1: yes',
        default: 0,
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "canceled", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'timeout_at',
        nullable: true,
        comment: 'Expiration date of payment',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "timeOutAt", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'rib', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "rib", void 0);
__decorate([
    typeorm_1.Column({ name: 'customer_last_name', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "customerLastName", void 0);
__decorate([
    typeorm_1.Column({ name: 'customer_first_name', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "customerFirstName", void 0);
__decorate([
    typeorm_1.Column({ name: 'customer_email', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "customerEmail", void 0);
__decorate([
    typeorm_1.Column({ name: 'operation_description', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "operationDescription", void 0);
__decorate([
    typeorm_1.Column({ name: 'approval_code', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "approvalCode", void 0);
__decorate([
    typeorm_1.Column({ name: 'card_mask', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "cardMask", void 0);
__decorate([
    typeorm_1.Column({ name: 'ship_card_type', nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "shipCardType", void 0);
__decorate([
    typeorm_1.Column({ name: 'import_bank', default: '0', type: 'tinyint' }),
    __metadata("design:type", Number)
], Transactions.prototype, "importBank", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'import_bank_at',
        nullable: true,
        comment: 'Date importation du fichier',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "importBankAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => OperationParteners_entity_1.OperationParteners, (operationParteners) => operationParteners.transactions),
    __metadata("design:type", Array)
], Transactions.prototype, "operationParteners", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Parteners_entity_1.Parteners, (parteners) => parteners.transactions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'parteners_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Parteners_entity_1.Parteners)
], Transactions.prototype, "parteners", void 0);
__decorate([
    typeorm_1.ManyToOne(() => PartenerComptes_entity_1.PartenerComptes, (partenerComptes) => partenerComptes.transactions, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
    typeorm_1.JoinColumn([{ name: 'partener_comptes_id', referencedColumnName: 'id' }]),
    __metadata("design:type", PartenerComptes_entity_1.PartenerComptes)
], Transactions.prototype, "partenerComptes", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Phones_entity_1.Phones, (phones) => phones.transactions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'phones_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Phones_entity_1.Phones)
], Transactions.prototype, "phones", void 0);
__decorate([
    typeorm_1.ManyToOne(() => SousServices_entity_1.SousServices, (sousServices) => sousServices.transactions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'sous_services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", SousServices_entity_1.SousServices)
], Transactions.prototype, "sousServices", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ErrorTypes_entity_1.ErrorTypes, (errorTypes) => errorTypes.transactions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'error_types_id', referencedColumnName: 'id' }]),
    __metadata("design:type", ErrorTypes_entity_1.ErrorTypes)
], Transactions.prototype, "errorTypes", void 0);
__decorate([
    typeorm_1.OneToMany(() => UssdExecutionMessages_entity_1.UssdExecutionMessages, (ussdExecutionMessage) => ussdExecutionMessage.transations),
    __metadata("design:type", Array)
], Transactions.prototype, "ussdExecutionMessage", void 0);
__decorate([
    typeorm_1.OneToMany(() => OperationPhones_entity_1.OperationPhones, (operationPhones) => operationPhones.transactions),
    __metadata("design:type", Array)
], Transactions.prototype, "operationPhones", void 0);
__decorate([
    typeorm_1.OneToMany(() => MessageUssds_entity_1.MessageUssds, (messagesUssds) => messagesUssds.transactions),
    __metadata("design:type", Array)
], Transactions.prototype, "messagesUssds", void 0);
Transactions = __decorate([
    typeorm_1.Index('fk_transactions_partener_comptes1_idx', ['partenerComptesId'], {}),
    typeorm_1.Index('fk_transactions_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Index('fk_transactions_phones1_idx', ['phonesId'], {}),
    typeorm_1.Index('fk_transactions_sous_services1_idx', ['sousServicesId'], {}),
    typeorm_1.Index('fk_transactions_error_types1_idx', ['errorTypesId'], {}),
    typeorm_1.Entity('transactions', { schema: 'simbot_db' })
], Transactions);
exports.Transactions = Transactions;
//# sourceMappingURL=Transactions.entity.js.map