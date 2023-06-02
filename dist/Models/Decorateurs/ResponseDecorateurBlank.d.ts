import { Type } from '@nestjs/common';
export declare const ResponseDecorateurBlank: <TModel extends Type<any>>(model: TModel, status: number, description: string) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
