import Request from "./Request";
import {getUserData} from "../../redux/actions/userData";
import {getAssetById} from "../../redux/actions/assets";

export class BroadcastRequest extends Request{
    type = "broadcast";

    amountToString = (amount, assetId) => {
        console.log(amount, assetId);
        const assetToSellData = getAssetById(assetId || 0);
        return `${Number(amount).toFixed(assetToSellData.precision)} ${assetToSellData.symbol}`;
    };

    getUserCreds = () => {
        const {name, keys} = getUserData();
        return {wif: keys.active || '5JFZC7AtEe1wF2ce6vPAUxDeevzYkPgmtR14z9ZVgvCCtrFAaLw', owner: name};
    };

    transfer = ({to, amount: rawAmount, asset, memo = ""}) => {
        const {wif, owner: from} = this.getUserCreds();
        const amount = this.amountToString(rawAmount, asset);
        return (
            this.asyncRequest("transfer", wif, from, to, amount, memo).catch(err => console.error(err))
        );
    };

    orderCreate = ({amountToBuy, amountToSell, assetToSell, assetToBuy, fillOrKill = false}) => {
        const {wif, owner} = this.getUserCreds();

        const orderid = Math.floor(Date.now() / 1000);
        const sell = this.amountToString(amountToSell, assetToSell);
        const buy = this.amountToString(amountToBuy, assetToBuy);

        let expiration = new Date();

        expiration.setHours(expiration.getHours() + 1);
        expiration = expiration.toISOString().substr(0, 19); // i.e. 2020-09-07T11:33:00

        return (
            this.asyncRequest("limitOrderCreate", wif, owner, orderid, sell, buy, fillOrKill, expiration).catch(err => console.error(err))
        )
    };

    orderCancel = ({orderid}) => {
        const {wif, owner} = this.getUserCreds();
        return (
            this.asyncRequest("limitOrderCancel", wif, owner, orderid).catch(err => console.error(err))
        );
    };

    cancelAllOrders = ({extensions}) => {
        const {wif, owner} = this.getUserCreds();
        return (
            this.asyncRequest("limitOrderCancelEx", wif, owner, 0, extensions).catch(err => console.error(err))
        );
    }
}