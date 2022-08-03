import { PaginatedDto } from '../Models/Response/PaginatedDto';
export declare class OptionsFilter {
    where: any;
    order: any;
    take: number;
    skip: number;
    set page(page: number | undefined);
    set size(size: number | undefined);
}
export declare class HelperService {
    private parseWhereOr;
    private parseWhere;
    parseOrder(queryOrder?: string): {
        [x: string]: string;
    };
    getOptionFilterModel(request: any): OptionsFilter;
    paginate(data: any, total: number, options: OptionsFilter): PaginatedDto<any>;
}
