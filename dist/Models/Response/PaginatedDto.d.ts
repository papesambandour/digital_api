export declare class PaginatedDto<TData> {
    totalItem: number;
    totalPage: number;
    size: number;
    page: number;
    results: TData[];
}
