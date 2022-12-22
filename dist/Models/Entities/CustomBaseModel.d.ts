import { BaseEntity } from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
export declare class CustomBaseModel extends BaseEntity {
    save(options?: SaveOptions): Promise<this>;
}
