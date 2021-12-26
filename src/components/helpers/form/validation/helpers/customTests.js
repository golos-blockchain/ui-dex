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

export const confirmPassword = {
    message: "passwordsNotMatch",
    test: function(val){
        const password = this.parent.newPassword;
        if(!val || !password) return true;
        return password === val;
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

export const minAmount = (minAmount) => ({
    message: "minAmount",
    test: function(val){
        if(!val) return true;
        if(Number(minAmount) <= Number(val)) return true;

        const {path, createError} = this;

        return createError({ path, message: "minAmount", params: {minAmount} });
    }
});

const checkUserBalance = (path, amount, assetId, createError) => {
    if(!amount || !assetId) return true;
    const message = "notEnoughCash";
    const assetData = getAssetById(assetId);

    amount = Number(amount);

    const {symbol, fee_percent} = assetData;
    const balance = getUserData().balances[symbol];

    if(!balance) return createError({ path, message });

    const fee = amount * (fee_percent / 100);

    if(balance.amount >= amount + fee) return true;

    return createError({ path, message });
};

export const balanceOnAmountChange = (assetKey) => ({
    test: function(amount){
        const assetId = this.parent[assetKey];

        if(!amount || !assetId) return true;

        const {path, createError} = this;

        return checkUserBalance(path, amount, assetId, createError);
    }
});

export const balanceOnAssetChange = (amountKey) => ({
    test: function(assetId){
        const amount = this.parent[amountKey];

        if(!amount || !assetId) return true;

        return checkUserBalance(amountKey, amount, assetId, this.createError);
    }
});

const checkPrecision = (path, amount, assetId, createError) => {
    const message = "wrongPrecision";
    const precision = getAssetById(assetId).precision;
    const fixedAmount = Number(amount).toFixed(precision);

    if(String(amount).length <= fixedAmount.length) return true;

    return createError({ path, message, params: {precision} })
};

export const precisionOnAmountChange = (assetKey) => ({
    test: function(amount){
        const assetId = this.parent[assetKey];

        if(!amount || !assetId) return true;

        const {path, createError} = this;

        return checkPrecision(path, amount, assetId, createError);
    }
});

export const precisionOnAssetChange = (amountKey) => ({
    test: function(assetId){
        const amount = this.parent[amountKey];

        if(!amount || !assetId) return true;

        return checkPrecision(amountKey, amount, assetId, this.createError);
    }
});

export const checkPairUniquness = {
    message: "pairNotUnique",
    test: function(val){
        const secondAsset = this.path === "assetToSell" ? "assetToBuy" : "assetToSell";
        return val !== this.parent[secondAsset];
    }
};