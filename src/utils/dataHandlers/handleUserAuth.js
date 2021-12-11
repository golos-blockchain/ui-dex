import {ApiRequest, AuthRequest} from "../requests";
import {setStorage} from "../storage";
import {amountToObject, lastTradeToRate} from "./handleAssets";
import {toFixedNum} from "../numbersOperations";
import {getAssetParam} from "../../redux/actions/assets";

export const fetchUserData = async (name) => {
    const defaultAssetSymbol = "GOLOS";
    const apiReq = new ApiRequest();

    const accData = await apiReq.getAccByName(name);
    const secondaryBalances = await apiReq.getBalanceByName(name);

    const GOLOS = amountToObject(accData.balance);
    const GBG = amountToObject(accData.sbd_balance);

    const golosPrecision = getAssetParam(defaultAssetSymbol).precision;

    const balances = { GOLOS, GBG };

    for(let key in secondaryBalances){
        balances[key] = amountToObject(secondaryBalances[key].balance);
    }

    let totalBalance = 0;

    for(let key in balances){
        const amount = balances[key].amount;
        let amountInGolos = 0;

        if(key === defaultAssetSymbol) {
            amountInGolos = amount;
        } else {
            const symbol = balances[key].symbol;

            const golosRate = await apiReq
                .getLastTradeToGolos(symbol)
                .then(lastTradeToRate(defaultAssetSymbol))
                .catch(err => console.error(err));

            amountInGolos = amount * golosRate;
        }

        totalBalance += amountInGolos;
        balances[key].amountInGolos = toFixedNum(amountInGolos, golosPrecision);
    }

    totalBalance = toFixedNum(totalBalance, golosPrecision);

    return { accData, totalBalance, balances };
};

export const handleUserAuth = (userData) => new AuthRequest().login(userData).then(async keys => {
    setStorage("user", userData);

    const name = userData.name;
    const { accData, totalBalance, balances } = await fetchUserData(name);

    return { name, accData, keys, totalBalance, balances };
}).catch(err => {
    throw new Error("loginError")
});