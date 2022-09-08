import { RefundDtoIn, RefundDtoOut } from './dto/refund-dto-out';
export declare class PartnerControllerController {
    private partnerServiceService;
    home(): Promise<{
        api: string;
        version: string;
    }>;
    refund(refundDtoIn: RefundDtoIn): Promise<RefundDtoOut>;
}
