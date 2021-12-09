import {checkBalance, checkBalanceOnAssetChange, schema, yupString} from "./helpers";

export const trxSchema = schema({
    to: yupString().required(),
    summ: yupString().test(checkBalance).required(),
    asset: yupString().test(checkBalanceOnAssetChange).required(),
    memo: yupString()
});