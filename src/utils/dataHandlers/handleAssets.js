import {ApiRequest} from "../requests";
import {getAssetById, getAssetParam, getAssetsList} from "../../redux/actions/assets";

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

const defaultCurrenciesList = currenciesList.map(symbol => ({
    symbol,
    fullName: currenciesFullName[symbol],
    img: currenciesImg[symbol],
    fee_percent: 0,
    whitelist: []
}));

export const handleAssetsRequest = res => {
    const customAssets = res
        .sort((prev, next) => new Date(prev.created).getTime() > new Date(next.created).getTime() ? 1 : -1)
        .map(el => {

            const {json_metadata, max_supply, fee_percent, symbols_whitelist} = el;
            const [_, symbol] = max_supply.split(" ");
            const img = currenciesImg[symbol] || JSON.parse(json_metadata).image_url;
            const fullName = `${symbol.substr(0, 1).toUpperCase()}${symbol.substr(1,).toLowerCase()}`

            return {symbol, fullName, img, fee_percent, whitelist: symbols_whitelist}
        });

    const params = {};
    const list = [...defaultCurrenciesList, ...customAssets].map(el => {
        params[el.symbol] = el;
        return el.symbol;
    });

    return {list, params};
};

export const amountToObject = (balance) => {
    const [amount, symbol] = balance.split(" ");
    return { amount: Number(amount), symbol };
};

export const lastTradeToRate = res => {
    const item = res[0];

    if(!item) return 0;

    const {amount: baseAmount} = amountToObject(item.current_pays);
    const {amount: quoteAmount} = amountToObject(item.open_pays);

    return +(baseAmount / quoteAmount).toFixed(5);
};

export const getAllRates = () => Promise.all(
    getAssetsList().filter(el => el !== "GOLOS").slice(0, 3).map(async symbol => {
        const apiRequest = new ApiRequest();
        const rate = await apiRequest.getLastTradeToGolos(symbol).then(lastTradeToRate);
        const rateChange = await apiRequest.getTickerToGolos(symbol).then(res => {
            return +(+res.percent_change1 || 0).toFixed(5)
        });

        const {fullName, img} = getAssetParam(symbol);

        return {rate, rateChange, img, fullName, symbol};
    })
);

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