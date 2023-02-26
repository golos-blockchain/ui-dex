import CryptoJS from "crypto-js";
import {ApiRequest, AuthRequest} from "../requests";
import {getStorage, setStorage} from "../storage";
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
                .then(lastTradeToRate(symbol))
                .catch(err => console.error(err));

            amountInGolos = amount * golosRate;
        }

        totalBalance += amountInGolos;
        balances[key].amountInGolos = toFixedNum(amountInGolos, golosPrecision);
    }

    totalBalance = toFixedNum(totalBalance, golosPrecision);

    return { totalBalance, balances };
};

const authRequest = (userData) => new AuthRequest().login(userData);

export const encodeUserData = ({name, activeKey, password}) => {
    const data = JSON.stringify({name, activeKey});
    return CryptoJS.AES.encrypt(data, password).toString();
};

export const decodeUserData = ({password}) => {
    const ciphertext = getStorage("user");
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);

    let data = "";

    try{
        data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch(err) {
        const error = new Error("passwordIsWrong");

        error.field = "password";

        throw error;
    }

    return data;
};

export const handleFirstAuth = async ({name, activeKey, newPassword}) => {
    let keys = {};

    try{
        keys = await authRequest({name, activeKey});
    } catch (err) {
        throw new Error("loginError")
    }

    const ciphertext = encodeUserData({name, activeKey, password: newPassword});
    setStorage("user", ciphertext);

    const { accData, totalBalance, balances } = await fetchUserData(name);
    return { name, accData, keys, totalBalance, balances };
};

export const handleSecondAuth = async ({password}) => {
    const data = decodeUserData({password});

    return authRequest(data).then(async keys => {
        const name = data.name;
        const { totalBalance, balances } = await fetchUserData(name);

        return { name, keys, totalBalance, balances };
    }).catch(err => {
        throw new Error("loginError")
    })
};

export const handleUserAuth = (userData) => new AuthRequest().login(userData).then(async keys => {
    const name = userData.name;
    const { accData, totalBalance, balances } = await fetchUserData(name);

    return { name, accData, keys, totalBalance, balances };
}).catch(err => {
    throw new Error("loginError")
});