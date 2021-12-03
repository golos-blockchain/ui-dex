import {checkBalance, checkBalanceOnAssetChange, schema, yupNum, yupString} from "./helpers";

export const trxSchema = schema({
    to: yupString().required(),
    summ: yupString().test(checkBalance).required(),
    currencyToBuy: yupNum().test(checkBalanceOnAssetChange).required(),
    memo: yupString()
});