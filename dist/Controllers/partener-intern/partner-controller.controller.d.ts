import { RefundDtoIn } from './dto/refund-dto-out';
export declare class PartnerControllerController {
    private partnerServiceService;
    home(): {
        api: string;
        version: string;
    };
    refund(refundDtoIn: RefundDtoIn): Promise<void>;
}
