"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = exports.OptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
class OptionsFilter {
    constructor() {
        this.where = null;
        this.order = null;
        this.take = 10;
        this.skip = 0;
    }
    set page(page) {
        this.skip = page || 0;
    }
    set size(size) {
        this.take = size || this.take;
    }
}
exports.OptionsFilter = OptionsFilter;
let HelperService = class HelperService {
    parseOrder(queryOrder = '') {
        const order = queryOrder.toString().split(',');
        if (order.length === 2) {
            if (['ASC', 'DESC'].includes(order[1].toUpperCase())) {
                return {
                    [order[0]]: order[1].toUpperCase(),
                };
            }
        }
    }
    getOptionFilterModel(request) {
        var _a, _b, _c, _d, _e, _f, _g;
        const option = new OptionsFilter();
        option.page = +((_a = request === null || request === void 0 ? void 0 : request.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        --option.page;
        option.size = +((_b = request === null || request === void 0 ? void 0 : request.query) === null || _b === void 0 ? void 0 : _b.size) || 10;
        option.order = this.parseOrder((_c = request === null || request === void 0 ? void 0 : request.query) === null || _c === void 0 ? void 0 : _c.order);
        if ((_d = request === null || request === void 0 ? void 0 : request.query) === null || _d === void 0 ? void 0 : _d.where) {
            option.where = this.parseWhere((_e = request === null || request === void 0 ? void 0 : request.query) === null || _e === void 0 ? void 0 : _e.where) || null;
        }
        if ((_f = request === null || request === void 0 ? void 0 : request.query) === null || _f === void 0 ? void 0 : _f.whereOr) {
            option.where = this.parseWhereOr((_g = request === null || request === void 0 ? void 0 : request.query) === null || _g === void 0 ? void 0 : _g.whereOr) || null;
        }
        return option;
    }
    paginate(data, total, options) {
        return {
            totalItem: total || 0,
            size: +(options === null || options === void 0 ? void 0 : options.take) || 10,
            page: +(options === null || options === void 0 ? void 0 : options.skip) + 1,
            totalPage: Math.ceil(total / (options === null || options === void 0 ? void 0 : options.take)),
            results: data,
        };
    }
    parseWhereOr(queryWhere = '') {
        console.log(queryWhere);
        const queries = queryWhere.toString().split(',');
        const wheres = [];
        if (queries.length) {
            queries.filter((q) => {
                const query = q.split('|');
                const oneFilter = {};
                if (query.length === 3) {
                    switch (query[1]) {
                        case 'e':
                            oneFilter[query[0]] = typeorm_1.Equal(query[2]);
                            wheres.push(oneFilter);
                            break;
                        case 'l':
                            oneFilter[query[0]] = typeorm_1.Like(`%${query[2]}%`);
                            wheres.push(oneFilter);
                            break;
                        case 's':
                            oneFilter[query[0]] = typeorm_1.MoreThan(`%${query[2]}%`);
                            wheres.push(oneFilter);
                            break;
                        case 'i':
                            oneFilter[query[0]] = typeorm_1.LessThan(`%${query[2]}%`);
                            wheres.push(oneFilter);
                            break;
                        case 'se':
                            oneFilter[query[0]] = typeorm_1.MoreThanOrEqual(`%${query[2]}%`);
                            wheres.push(oneFilter);
                            break;
                        case 'ie':
                            oneFilter[query[0]] = typeorm_1.LessThanOrEqual(`%${query[2]}%`);
                            wheres.push(oneFilter);
                            break;
                        case 'in':
                            oneFilter[query[0]] = typeorm_1.In(query[2].split('-'));
                            wheres.push(oneFilter);
                            break;
                        case 'nin':
                            oneFilter[query[0]] = typeorm_1.Not(query[2]);
                            wheres.push(oneFilter);
                            break;
                    }
                }
            });
        }
        console.log(queries);
        return wheres;
    }
    parseWhere(queryWhere = '') {
        console.log(queryWhere);
        const queries = queryWhere.toString().split(',');
        const wheres = [];
        const oneFilter = {};
        if (queries.length) {
            queries.filter((q) => {
                const query = q.split('|');
                if (query.length === 3) {
                    switch (query[1]) {
                        case 'e':
                            oneFilter[query[0]] = typeorm_1.Equal(query[2]);
                            break;
                        case 'l':
                            oneFilter[query[0]] = typeorm_1.Like(`%${query[2]}%`);
                            break;
                        case 's':
                            oneFilter[query[0]] = typeorm_1.MoreThan(`%${query[2]}%`);
                            break;
                        case 'i':
                            oneFilter[query[0]] = typeorm_1.LessThan(`%${query[2]}%`);
                            break;
                        case 'se':
                            oneFilter[query[0]] = typeorm_1.MoreThanOrEqual(`%${query[2]}%`);
                            break;
                        case 'ie':
                            oneFilter[query[0]] = typeorm_1.LessThanOrEqual(`%${query[2]}%`);
                            break;
                        case 'in':
                            oneFilter[query[0]] = typeorm_1.In(query[2].split('-'));
                            break;
                        case 'nin':
                            oneFilter[query[0]] = typeorm_1.Not(query[2]);
                            break;
                    }
                }
            });
        }
        console.log(oneFilter);
        return oneFilter;
    }
};
HelperService = __decorate([
    common_1.Injectable()
], HelperService);
exports.HelperService = HelperService;
//# sourceMappingURL=Helper.service.js.map