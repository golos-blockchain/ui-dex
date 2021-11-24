import Request from "./Request";

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

    getHistoryByName = (name) => {
        return this.asyncRequest("getAccountHistory", name, 0, 0);
    };

    getTicker = ticker => {
        return this.asyncRequest("getTicker", ticker);
    };

    getPriceHistory = (pair, resolution, startDate, endDate) => {
        return this.asyncRequest("getTradeHistory", startDate, endDate, resolution, pair);
    }
};