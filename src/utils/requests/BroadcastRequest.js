import Request from "./Request";
import {getUserData} from "../../redux/actions/userData";

export class BroadcastRequest extends Request{
    type = "broadcast";

    getUserCreds = () => {
        const {name, keys} = getUserData();
        return {wif: keys.active || '5JFZC7AtEe1wF2ce6vPAUxDeevzYkPgmtR14z9ZVgvCCtrFAaLw', owner: name};
    };

    transfer = ({to, amount, memo = ""}) => {
        const {wif, owner: from} = this.getUserCreds();
        return (
            this.asyncRequest("transfer", wif, from, to, amount, memo).catch(err => console.error(err))
        );
    };

    orderCreate = ({orderid, amountToSell, minToReceive, fillOrKill = false}) => {
        const {wif, owner} = this.getUserCreds();

        let expiration = new Date();

        expiration.setHours(expiration.getHours() + 1);
        expiration = expiration.toISOString().substr(0, 19); // i.e. 2020-09-07T11:33:00

        return (
            this.asyncRequest("limitOrderCreate", wif, owner, orderid, amountToSell, minToReceive, fillOrKill, expiration).catch(err => console.error(err))
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