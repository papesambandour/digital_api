import { BalanceParams, BalanceResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export default class FreeMoneyApiProvider {
    static getBalance(params: BalanceParams): Promise<BalanceResponse>;
}
