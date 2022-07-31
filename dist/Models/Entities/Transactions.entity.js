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
let Transactions = class Transactions extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Transactions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type_operation', enum: ['DEBIT', 'CREDIT'] }),
    __metadata("design:type", String)
], Transactions.prototype, "typeOperation", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'sous_services_id' }),
    __metadata("design:type", Number)
], Transactions.prototype, "sousServicesId", void 0);
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
    typeorm_1.Column('double', { name: 'solde', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Transactions.prototype, "solde", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'commission_amount', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Transactions.prototype, "commissionAmount", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'fee_amount', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Transactions.prototype, "feeAmount", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Transactions.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], Transactions.prototype, "updatedAt", void 0);
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
        enum: ['SUCCESS', 'PENDING', 'PROCESSING', 'FAILLED', 'CANCELED'],
        default: 'PENDING',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "statut", void 0);
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
        name: 'date_canceled',
        nullable: true,
        comment: 'Date de canceled de la transaction',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "dateCanceled", void 0);
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
    typeorm_1.Column('tinyint', {
        name: 'callback_is_send',
        comment: 'letat envoi du callback: 1- envoyee : 0 no envoyer - 2 echeque envoie',
        default: 0,
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "callbackIsSend", void 0);
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
    typeorm_1.OneToMany(() => UssdExecutionMessages_entity_1.UssdExecutionMessages, (ussdExecutionMessage) => ussdExecutionMessage.transations),
    __metadata("design:type", Array)
], Transactions.prototype, "ussdExecutionMessage", void 0);
Transactions = __decorate([
    typeorm_1.Index('fk_transactions_partener_comptes1_idx', ['partenerComptesId'], {}),
    typeorm_1.Index('fk_transactions_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Index('fk_transactions_phones1_idx', ['phonesId'], {}),
    typeorm_1.Index('fk_transactions_sous_services1_idx', ['sousServicesId'], {}),
    typeorm_1.Entity('transactions', { schema: 'simbot_db' })
], Transactions);
exports.Transactions = Transactions;
//# sourceMappingURL=Transactions.entity.js.map