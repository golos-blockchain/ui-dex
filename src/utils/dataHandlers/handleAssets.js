import {ApiRequest} from "../requests";
import {getAssetById, getAssetParam, getAssets, getAssetsList} from "../../redux/actions/assets";
import {toFixedNum} from "../numbersOperations";

export const currenciesList = ["GOLOS", "GBG"];

const currenciesImg = {
    GOLOS: "/img/golos-icon.png",
    GBG: "/img/golos-icon.png",
    RUDEX: "/img/rudex-icon.png"
};

const currenciesFullName = {
    GOLOS: "Golos",
    GBG: "Golos Gold"
};

const currenciesPrecisions = {
    GOLOS: 3,
    GBG: 3
};

const defaultCurrenciesList = currenciesList.map(symbol => ({
    symbol,
    fullName: currenciesFullName[symbol],
    img: currenciesImg[symbol],
    fee_percent: 0,
    precision: currenciesPrecisions[symbol],
    whitelist: []
}));

export const handleAssetsRequest = res => {
    const customAssets = res
        .map(el => {
            const {json_metadata, max_supply, fee_percent, symbols_whitelist, precision} = el;
            const [_, symbol] = max_supply.split(" ");
            const {image_url, deposit, withdrawal} = JSON.parse(json_metadata);
            const img = currenciesImg[symbol] || image_url;
            const fullName = `${symbol.substr(0, 1).toUpperCase()}${symbol.substr(1,).toLowerCase()}`

            return {symbol, fullName, img, fee_percent, precision, deposit, withdrawal, whitelist: symbols_whitelist}
        });

    const params = {};
    const list = [...defaultCurrenciesList, ...customAssets].map((el) => {
        const symbol = el.symbol;
        params[symbol] = el;
        return symbol;
    });

    return {list, params};
};

export const amountToObject = (balance) => {
    const [amount, symbol] = balance.split(" ");
    return { amount: Number(amount), symbol };
};

export const lastTradeToRate = (base) => (res) => {
    const item = res[0];

    if(!item) return 0;

    const {amount: sellAmount, symbol: sellSymbol} = amountToObject(item.current_pays);
    const {
        amount: buyAmount,
        // symbol: buySymbol
    } = amountToObject(item.open_pays);

    const sellIsBase = sellSymbol === base;

    const rate = sellIsBase ? buyAmount / sellAmount : sellAmount / buyAmount;

    // there was precision getter for the "toFixedNum" func below, but...
    // ...then we saw DOGECOIN precision and decided: no, three symbols are just enough!
    // const precision = getAssetParam(sellIsBase ? sellSymbol : buySymbol).precision;

    return toFixedNum(rate, 3);
};

export const getRate = async (pair) => {
    const [base, quote] = pair;
    const apiRequest = new ApiRequest();
    const rate = await apiRequest.getLastTrade(pair).then(lastTradeToRate(base));
    const rateChange = await apiRequest.getTicker(pair).then(res => {
        return toFixedNum(res.percent_change1 || 0);
    });

    const {fullName, img} = getAssetParam(quote);

    return {rate, rateChange, img, fullName, symbol: quote, base};
};


export const getAllRates = (base = "GOLOS", length) => {
    const {list: rawList, params} = getAssets();
    const whitelist = params[base].whitelist;

    const fullList = whitelist.length ? whitelist : rawList.filter(symbol => symbol !== base);
    const list = length ? fullList.slice(0, length) : fullList;

    return Promise.all(list.map(async symbol => {
        const pair = [base, symbol];
        return getRate(pair);
    }));
};

export const mixDataToBalance = (rawBalances) => getAssetsList().map(symbol => {
    const item = rawBalances[symbol];

    if(!item) return null;

    const { amount, amountInGolos } = item;
    const { img, fullName, fee_percent, whitelist } = getAssetParam(symbol);

    return {
        img,
        fullName,
        amount,
        amountInGolos,
        fee_percent,
        whitelist,
        symbol
    }
}).filter(el => el);