import { PaginatedDto } from '../Models/Response/PaginatedDto';
import { ServiceBotService } from './ServiceBot.service';
export declare class HttpCrudService {
    repository: any;
    serviceBot: ServiceBotService;
    private connection;
    queryRunner: any;
    constructor(repository?: any);
    create(createDto: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateDto: any): Promise<any>;
    remove(id: number): Promise<any>;
    findAllPaginate(request: any): Promise<PaginatedDto<any>>;
    createMany(entities: any): Promise<boolean>;
}
