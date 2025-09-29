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
exports.HttpCrudService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const ServiceBot_service_1 = require("./ServiceBot.service");
const Enum_entity_1 = require("../Models/Entities/Enum.entity");
class HttpCrudService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createDto) {
        var _a;
        createDto.createdAt = new Date();
        createDto.updatedAt = new Date();
        const entity = await this.repository.constructor.insert(createDto);
        return await this.repository.constructor.findOne((_a = entity === null || entity === void 0 ? void 0 : entity.raw) === null || _a === void 0 ? void 0 : _a.insertId);
    }
    async findAll() {
        return await this.repository.constructor.find();
    }
    async findOne(id) {
        return await this.repository.constructor.findOne({ where: { id: id } });
    }
    async update(id, updateDto) {
        updateDto.updatedAt = new Date();
        delete updateDto.createdAt;
        updateDto.id = id;
        await this.repository.constructor.save(updateDto);
        return await this.repository.constructor.findOne(id);
    }
    async remove(id) {
        const deleteDto = {
            updatedAt: new Date(),
            state: Enum_entity_1.StateEnum.DELETED,
            id: id,
        };
        await this.repository.constructor.save(deleteDto);
        return await this.repository.constructor.findOne(id);
    }
    async findAllPaginate(request) {
        const options = this.serviceBot.helper.getOptionFilterModel(request);
        console.log(options);
        const [result, total] = await this.repository.constructor.findAndCount(options);
        return this.serviceBot.helper.paginate(result, total, options);
    }
    async createMany(entities) {
        const queryRunner = this.connection.createQueryRunner();
        let state = true;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (let i = 0; i < entities.length; i++) {
                await queryRunner.manager.save(entities[i]);
            }
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            state = false;
        }
        finally {
            await queryRunner.release();
        }
        return state;
    }
}
__decorate([
    common_1.Inject(),
    __metadata("design:type", ServiceBot_service_1.ServiceBotService)
], HttpCrudService.prototype, "serviceBot", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", typeorm_1.Connection)
], HttpCrudService.prototype, "connection", void 0);
exports.HttpCrudService = HttpCrudService;
//# sourceMappingURL=HttpCrud.service.js.map