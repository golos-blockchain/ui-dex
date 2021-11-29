import {GolosIcon, RudexIcon, SbdIcon} from "../../svg";
import {ApiRequest} from "../requests";

export const currenciesList = ["GOLOS", "GBG", "RUDEX"];
export const currenciesIcons = {
    GOLOS: GolosIcon,
    GBG: GolosIcon,
    SBD: SbdIcon,
    RUDEX: RudexIcon
};

export const currenciesFullName = {
    GOLOS: "Golos",
    GBG: "Golos Gold",
    SBD: "Steem Dollars",
    RUDEX: "Rudex"
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
    currenciesList.filter(el => el !== "GOLOS").slice(0, 3).map(async symbol => {
        const apiRequest = new ApiRequest();
        const rate = await apiRequest.getLastTradeToGolos(symbol).then(lastTradeToRate);
        const rateChange = await apiRequest.getTickerToGolos(symbol).then(res => {
            return +(+res.percent_change1 || 0).toFixed(5)
        });

        const icon = currenciesIcons[symbol];
        const fullName = currenciesFullName[symbol];

        return {rate, rateChange, icon, fullName, symbol};
    })
);

export const mixDataToBalance = (rawBalances) => currenciesList.map(key => {
    const item = rawBalances[key];

    if(!item) return null;

    const {amount, amountInGolos, symbol} = item;
    const icon = currenciesIcons[symbol];
    const fullName = currenciesFullName[symbol];

    return {
        icon,
        fullName,
        amount,
        amountInGolos,
        symbol
    }
}).filter(el => el);