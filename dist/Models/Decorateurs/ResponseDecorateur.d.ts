import { Type } from '@nestjs/common';
export declare const ResponseDecorateur: <TModel extends Type<any>>(model: TModel, status: number, description: string, isArray?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
