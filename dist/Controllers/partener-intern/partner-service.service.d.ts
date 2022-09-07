import { HelperService } from '../../helper.service';
import { RefundDtoIn, RefundDtoOut } from './dto/refund-dto-out';
export declare class PartnerServiceService {
    private helper;
    constructor(helper: HelperService);
    refund(refundDtoIn: RefundDtoIn): Promise<RefundDtoOut>;
}
