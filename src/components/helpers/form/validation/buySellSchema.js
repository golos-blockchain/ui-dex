import {checkBalanceOnDashboardBuy, checkPairUniquness, schema, yupString} from "./helpers";

export const buySchema = schema({
    amountToSell: yupString().test(checkBalanceOnDashboardBuy).required(),
    assetToSell: yupString().test(checkPairUniquness).required(),
    assetToBuy: yupString().test(checkPairUniquness).required()
});