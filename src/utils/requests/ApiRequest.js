import Request from "./Request";

export class ApiRequest extends Request{
    type = "api";

    getConfig = () => {
        return this.asyncRequest("getConfig");
    };

    getAssets = () => {
        return this.asyncRequest("getAssets", "",[],"0","100","0");
    };

    checkUserExistence = (name) => {
        return this.asyncRequest("lookupAccountNames", [name]).then(res => Boolean(res[0]));
    };

    getAccByName = (name) => {
        return this.asyncRequest("getAccounts", [name]).then(res => res && res[0]);
    };

    getBalanceByName = (name) => {
        return this.asyncRequest("getAccountsBalances", [name]).then(res => res && res[0]);
    };

    getUserOrdersByName = name => {
        return this.asyncRequest("getAccountHistory", name, -1, 10000, {select_ops: [ 'limit_order_create', 'fill_order', "limit_order_cancel", "limit_order_cancel_ex" ]}).catch(err => console.error(err));
    };

    getUserOpenOrdersByName = (name, pair) => {
        return this.asyncRequest("getOpenOrders", name, pair).catch(err => console.error(err));
    };

    getUserHistoryByName = name => {
        return this.asyncRequest("getAccountHistory", name, -1, 10000).catch(err => console.error(err));
    };

    getTicker = ticker => {
        return this.asyncRequest("getTicker", ticker);
    };

    getLastTrades = (ticker, limit) => {
        return this.asyncRequest("getRecentTrades", limit, ticker);
    };

    getLastTrade = ticker => {
        return this.getLastTrades(ticker, 1);
    };

    getLastTradeToGolos = base => {
        return this.getLastTrade([base, "GOLOS"]);
    };

    getOrderBook = ticker => {
        return this.asyncRequest("getOrderBook", 100, ticker);
    };

    getOpenOrders = (name, ticker) => {
        return this.asyncRequest("getOpenOrders", name, ticker);
    };

    getPriceHistory = (pair, bucket_seconds, startDate, endDate) => {
        return this.asyncRequest("getMarketHistory", bucket_seconds, startDate, endDate, pair);
    }
};