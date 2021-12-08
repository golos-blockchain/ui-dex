import {ApiRequest, AuthRequest} from "../requests";
import {setStorage} from "../storage";
import {amountToObject, lastTradeToRate} from "./handleAssets";

export const fetchUserData = async (name) => {
    const apiReq = new ApiRequest();

    const accData = await apiReq.getAccByName(name);
    const secondaryBalances = await apiReq.getBalanceByName(name);

    const GOLOS = amountToObject(accData.balance);
    const GBG = amountToObject(accData.sbd_balance);

    const balances = { GOLOS, GBG };

    for(let key in secondaryBalances){
        balances[key] = amountToObject(secondaryBalances[key].balance);
    }

    let totalBalance = 0;

    for(let key in balances){
        const amount = balances[key].amount;
        let amountInGolos = 0;

        if(key === "GOLOS") {
            amountInGolos = amount;
        } else {
            const golosRate = await apiReq.getLastTradeToGolos(balances[key].symbol).then(lastTradeToRate).catch(err => console.error(err));
            amountInGolos = amount * golosRate;
        }

        totalBalance += amountInGolos;
        balances[key].amountInGolos = +(amountInGolos).toFixed(5);
    }

    totalBalance = +(totalBalance).toFixed(5);

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