import Request from "./Request";
import {balanceToObject} from "../dataHandlers";

export class ApiRequest extends Request{
    type = "api";

    getAccByName = (name) => {
        return this.asyncRequest("getAccounts", [name]).then(res => res && res[0]);
    };

    getAccMetadata = (name) => {
        return this.getAccByName(name).then(res => {
            let metadata = {};

            if(!res.json_metadata) return metadata;

            try{
                metadata = JSON.parse(res.json_metadata).profile;
            } catch(err) {}

            return metadata;
        });
    };

    getBalanceByName = (name) => {
        return this.asyncRequest("getAccountsBalances", [name]).then(res => res && res[0]);
    };

    getUserOrdersByName = name => {
        return this.asyncRequest("getAccountHistory", name, -1, 10000, {select_ops: [ 'limit_order_create', 'fill_order', "limit_order_cancel", "limit_order_cancel_ex" ]}).catch(err => console.error(err));
    }

    getUserHistoryByName = name => {
        return this.asyncRequest("getAccountHistory", name, -1, 10000).catch(err => console.error(err));
    }

    getTicker = ticker => {
        return this.asyncRequest("getTicker", ticker);
    };

    getPriceHistory = (pair, resolution, startDate, endDate) => {
        return this.asyncRequest("getTradeHistory", startDate, endDate, resolution, pair);
    }
};