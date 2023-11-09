import { NestMiddleware } from '@nestjs/common';
export declare class PartnerMiddlewareMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): any;
}
