import {checkBalanceOnDashboardBuy, checkPairUniquness, schema, yupNum, yupString} from "./helpers";

export const buySchema = schema({
    amountToSell: yupString().test(checkBalanceOnDashboardBuy).required(),
    assetToSell: yupNum().test(checkPairUniquness).required(),
    assetToBuy: yupNum().test(checkPairUniquness).required()
});