import {GolosIcon, RudexIcon, SbdIcon} from "../../svg";

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

export const balanceToObject = (balance) => {
    const [amount, symbol] = balance.split(" ");
    return {amount: Number(amount), symbol, amountUsdt: "5.000"};
};

export const mixDataToBalance = (rawBalances) => currenciesList.map(key => {
    const item = rawBalances[key];

    if(!item) return null;

    const {amount, amountUsdt, symbol} = item;
    const icon = currenciesIcons[symbol];
    const fullName = currenciesFullName[symbol];

    return {
        icon,
        fullName,
        amount,
        amountUsdt,
        symbol
    }
}).filter(el => el);