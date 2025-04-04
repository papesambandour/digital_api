import { PaginatedDto } from '../Response/PaginatedDto';
export interface HttpCrudInterface {
    create(createDto: any): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateDto: any): any;
    remove(id: number): any;
    findAllPaginate(request: any): Promise<PaginatedDto<any>>;
}
