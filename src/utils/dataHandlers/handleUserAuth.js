import {ApiRequest, AuthRequest} from "../requests";
import {setStorage} from "../storage";
import {balanceToObject} from "./handleBalances";

export const handleUserAuth = (userData) => new AuthRequest().login(userData).then(async keys => {
    setStorage("user", userData);

    const name = userData.name;
    const apiReq = new ApiRequest();

    const accData = await apiReq.getAccByName(name);
    const secondaryBalances = await apiReq.getBalanceByName(name);

    const GOLOS = balanceToObject(accData.balance);
    const GBG = balanceToObject(accData.sbd_balance);

    const balances = { GOLOS, GBG };

    for(let key in secondaryBalances){
        balances[key] = balanceToObject(secondaryBalances[key].balance);
    }

    // for(let key in balances){
    //     await apiReq.getTicker([balances[key].symbol, "sbd"]).then(console.log).catch(err => console.error(err));
    //     // balances[key] = balanceToObject(secondaryBalances[key].balance);
    // }

    // console.log(balances);

    // const sbd = {amount: accData.balance.split(" ")[0], symbol: "golos"};

    // const history = await apiReq.getHistoryByName(name);

    // console.log(history);

    return {
        name,
        accData,
        keys,
        balances,
        // history
    };
}).catch(err => {
    throw new Error("loginError")
});