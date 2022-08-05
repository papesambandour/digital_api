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
exports.BootstrapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BootstrapService = class BootstrapService {
    constructor(connection) {
        this.connection = connection;
    }
    async init() {
        console.log('Init app');
        await this.connection.query(`update phones set phone_state = 'UNUSED' , socket = 'DISCONNECTED'`);
        this.redefineLog();
    }
    redefineLog() {
        if (process.env.MODE != 'dev') {
            console.log = () => {
            };
            console.error = () => {
            };
            console.table = () => {
            };
            console.info = () => {
            };
            console.debug = () => {
            };
            console.trace = () => {
            };
            console.warn = () => {
            };
        }
    }
};
BootstrapService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], BootstrapService);
exports.BootstrapService = BootstrapService;
//# sourceMappingURL=bootstrap.service.js.map