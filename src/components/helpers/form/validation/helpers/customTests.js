import {getStorage} from "../../../../../utils";
import {getAssetById} from "../../../../../redux/actions/assets";
import {getUserData} from "../../../../../redux/actions/userData";

export const oldPasswordValidation = {
    message: "passwordIsWrong",
    test: function(val){
        if(!val) return true;
        return getStorage("user").priv === val;
    }
};

export const isNodeTitleUnique = {
    message: "nodeNameIsExist",
    test: function(val){
        if(!val) return true;

        const currentId = this.parent.id;
        const list = getStorage("nodes").list;

        return !list.filter(node => Number(currentId) !== Number(node.id)).find(node => node.title.toLowerCase() === val.toLowerCase());
    }
};

export const isNodeUrlUnique = {
    message: "nodeUrlIsExist",
    test: function(val){
        if(!val) return true;

        let address = val.trim();
        const currentId = this.parent.id;
        const list = getStorage("nodes").list;

        return !list.filter(node => Number(currentId) !== Number(node.id)).find(node => node.url === address);
    }
};

export const isNodeUrlSocket = {
    message: "urlIsNotSocket",
    test: function(val){
        if(!val) return true;

        let address = val.trim();

        return address.indexOf("wss://") === 0 && address.indexOf("/ws") === address.length - 3;
    }
};

const checkUserBalance = (amount, assetId) => {
    const assetData = getAssetById(assetId);

    if(!amount || !assetData) return true;

    amount = Number(amount);

    const {symbol, fee_percent} = assetData;
    const balance = getUserData().balances[symbol];

    if(!balance) return false;

    const fee = amount * (fee_percent / 100);

    return balance.amount >= amount + fee;
};

export const checkBalance = {
    message: "notEnoughCash",
    test: function(val){
        return checkUserBalance(val, this.parent.currencyToBuy);
    }
};

export const checkBalanceOnAssetChange = {
    message: "notEnoughCash",
    test: function(val){
        if(!checkUserBalance(this.parent.summ, val)){
            return this.createError({path: "summ", message: "notEnoughCash"})
        }

        return true;
    }
};