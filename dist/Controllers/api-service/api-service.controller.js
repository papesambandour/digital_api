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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseDecorateur_1 = require("../../Models/Decorateurs/ResponseDecorateur");
const OperationOutDto_1 = require("./dto/OperationOutDto");
const OperationInDto_1 = require("./dto/OperationInDto");
const OperationBadParamsDto_1 = require("./dto/OperationBadParamsDto");
const ResponseHttpPaginationDecorateur_1 = require("../../Models/Decorateurs/ResponseHttpPaginationDecorateur");
const DtoTransactions_1 = require("../../Models/Dto/DtoTransactions");
const ResponseDetailsDecorateur_1 = require("../../Models/Decorateurs/ResponseDetailsDecorateur");
const ResponseForbidenDecorateur_1 = require("../../Models/Decorateurs/ResponseForbidenDecorateur");
const ResponseForbidden_1 = require("../../Models/Response/ResponseForbidden");
const ResponseHttp_1 = require("../../Models/Response/ResponseHttp");
const PaginatedDto_1 = require("../../Models/Response/PaginatedDto");
const Controller_1 = require("../Controller");
const api_service_service_1 = require("./api-service.service");
const OperationDictionaryDto_1 = require("./dto/OperationDictionaryDto");
const ResponseHttpDefaultData_1 = require("../../Models/Response/ResponseHttpDefaultData");
const DtoBalance_1 = require("../../Models/Dto/DtoBalance");
const PartenerComptes_entity_1 = require("../../Models/Entities/PartenerComptes.entity");
const helper_service_1 = require("../../helper.service");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("../../Models/Entities/Parteners.entity");
const SousServices_entity_1 = require("../../Models/Entities/SousServices.entity");
const ListPendingBillInDto_1 = require("./dto/ListPendingBillInDto");
let ApiServiceController = class ApiServiceController extends Controller_1.ControllerBase {
    constructor(apiServiceService, helper) {
        super();
        this.apiServiceService = apiServiceService;
        this.helper = helper;
    }
    async operation(operationInDto) {
        var _a, _b;
        if ([Enum_entity_1.SOUS_SERVICE_ENUM.WHATSAPP_MESSAGING].includes(operationInDto.codeService)) {
            operationInDto.amount = await this.helper.getAmountForMessenger(operationInDto);
        }
        const isNotValid = await this.validator(this.getInstanceObject(operationInDto, new OperationInDto_1.OperationInDto()));
        if (isNotValid) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotValid, '', true);
        }
        const isNotValidLevel2 = await this.apiServiceService.validatorCustomApi(operationInDto);
        if (isNotValidLevel2) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotValidLevel2, '', true);
        }
        const isNotConform = this.apiServiceService.allDataIsOk();
        if (isNotConform) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotConform, '', true);
        }
        const apiManager = await this.helper.getApiManagerInterface(operationInDto.codeService, this.apiServiceService);
        if (!apiManager) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {}, 'Api Service Manager non configuré', true);
        }
        const response = await apiManager.initTransaction({
            dto: operationInDto,
        });
        await this.helper.setIsCallbackReadyValue((_a = response.transaction) === null || _a === void 0 ? void 0 : _a.id);
        await this.helper.setTimeOutDate((_b = response.transaction) === null || _b === void 0 ? void 0 : _b.id);
        this.helper.updateApiBalance(apiManager, response.usedPhoneId).then();
        if (response.status === Enum_entity_1.StatusEnum.FAILLED && response.refundOnFailed) {
            await this.helper.operationPartnerCancelTransaction(response.transaction);
        }
        return this.response(response.codeHttp, this.apiServiceService.responseOperation(response, operationInDto), response.partnerMessage, response.codeHttp !== Controller_1.CODE_HTTP.OK_OPERATION);
    }
    async transaction(id) {
        return {
            msg: 'Acces',
        };
    }
    async transactions() {
        return {
            message: 'List Transaction',
        };
    }
    async dictionary() {
        return this.response(this.CODE_HTTP.OK, this.getCodeOperation());
    }
    async balance(headers) {
        const partnerAccoune = await this.apiServiceService.getPartner(headers);
        if (!partnerAccoune) {
            return this.response(this.CODE_HTTP.OPERATION_AUTH_NEED, { secreteKey: 'Invalide secrete key' }, '', true);
        }
        return this.response(this.CODE_HTTP.OK_OPERATION, {
            currency: 'XOF',
            balance: partnerAccoune.parteners.solde,
        });
    }
    async services() {
        const services = await SousServices_entity_1.SousServices.find({
            where: {
                state: typeorm_1.Equal(Enum_entity_1.StateEnum.ACTIVED),
            },
            relations: ['typeServices', 'services', 'services.categoriesServices'],
            select: ['name', 'typeOperation', 'typeServices', 'code', 'icon'],
            order: {
                id: 'ASC',
            },
        });
        console.log(services[0], 'kkkk');
        return {
            success: true,
            services: services.map((s) => {
                return {
                    name: s.name,
                    icon: s.icon,
                    codeService: s.code,
                    typeOperation: s.typeOperation,
                    typeService: s.typeServices.code,
                };
            }),
        };
    }
    async listPendingBill(pendingBillDto) {
        const isNotValid = await this.validator(this.getInstanceObject(pendingBillDto, new ListPendingBillInDto_1.ListPendingBillInDto()));
        if (isNotValid) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotValid, '', true);
        }
        const comptePartner = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: { appKey: typeorm_1.Equal(pendingBillDto === null || pendingBillDto === void 0 ? void 0 : pendingBillDto.apiKey) },
        });
        let partner;
        if (comptePartner) {
            partner = await Parteners_entity_1.Parteners.findOne(comptePartner === null || comptePartner === void 0 ? void 0 : comptePartner.partenersId);
        }
        if (!partner || !comptePartner) {
            return this.response(Controller_1.CODE_HTTP.OPERATION_BADREQUEST, {}, 'Non authentifié', true);
        }
        const apiManagerService = await this.helper.getApiManagerInterface(pendingBillDto.codeService, null);
        if (!apiManagerService) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {}, 'Api Service Manager non configuré', true);
        }
        const billsResults = await apiManagerService.getPendingBillTransaction({
            dto: pendingBillDto,
        });
        if (billsResults.success) {
            return this.response(Controller_1.CODE_HTTP.OK_OPERATION, {
                status: Enum_entity_1.StatusEnum.SUCCESS,
                billAccountNumber: billsResults.billAccountNumber,
                pendingBills: billsResults.pendingBills,
            }, billsResults.pendingBills.length
                ? `${billsResults.pendingBills.length} en attente(s) non payée pour cette facture`
                : 'Aucune facture trouvé pour cette facture', false);
        }
        else {
            return this.response(Controller_1.CODE_HTTP.FAILLED, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                pendingBills: [],
            }, billsResults.message, false);
        }
    }
};
__decorate([
    common_1.Post('operation'),
    ResponseDecorateur_1.ResponseDecorateur(OperationOutDto_1.OperationOutDto, 201, "Ce Services permet d'effectué tous les operations que offres cet api "),
    ResponseDecorateur_1.ResponseDecorateur(OperationBadParamsDto_1.OperationBadParamsDto, 400, 'Les parametres envoyés sont invalides'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OperationInDto_1.OperationInDto]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "operation", null);
__decorate([
    common_1.Get('transactions/:id'),
    ResponseDetailsDecorateur_1.ResponseDetailsDecorateur(DtoTransactions_1.DtoTransactions),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "transaction", null);
__decorate([
    common_1.Get('transactions'),
    ResponseHttpPaginationDecorateur_1.ResponseHttpPaginationDecorateur(DtoTransactions_1.DtoTransactions),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "transactions", null);
__decorate([
    common_1.Get('dictionary'),
    ResponseDecorateur_1.ResponseDecorateur(OperationDictionaryDto_1.OperationDictionaryDto, 200, '', true),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "dictionary", null);
__decorate([
    common_1.Get('balance'),
    ResponseDecorateur_1.ResponseDecorateur(DtoBalance_1.DtoBalance, 200, '', false),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "balance", null);
__decorate([
    common_1.Get('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "services", null);
__decorate([
    common_1.Post('list-pending-bills'),
    ResponseDecorateur_1.ResponseDecorateur(OperationOutDto_1.OperationOutDto, 201, "Ce Services permet d'effectué tous les operations que offres cet api "),
    ResponseDecorateur_1.ResponseDecorateur(OperationBadParamsDto_1.OperationBadParamsDto, 400, 'Les parametres envoyés sont invalides'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListPendingBillInDto_1.ListPendingBillInDto]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "listPendingBill", null);
ApiServiceController = __decorate([
    common_1.Controller('api-services'),
    swagger_1.ApiExtraModels(...[
        ResponseHttp_1.ResponseHttp,
        PaginatedDto_1.PaginatedDto,
        OperationOutDto_1.OperationOutDto,
        OperationBadParamsDto_1.OperationBadParamsDto,
        DtoTransactions_1.DtoTransactions,
        OperationDictionaryDto_1.OperationDictionaryDto,
        ResponseHttpDefaultData_1.ResponseHttpDefaultData,
    ]),
    swagger_1.ApiTags('Api Services Partners'),
    __metadata("design:paramtypes", [api_service_service_1.ApiServiceService,
        helper_service_1.HelperService])
], ApiServiceController);
exports.ApiServiceController = ApiServiceController;
//# sourceMappingURL=api-service.controller.js.map