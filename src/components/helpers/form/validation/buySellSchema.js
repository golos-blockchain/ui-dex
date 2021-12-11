import {
    balanceOnAmountChange, balanceOnAssetChange,
    checkPairUniquness,
    precisionOnAmountChange,
    schema,
    yupString
} from "./helpers";

export const buySchema = schema({
    amountToSell: yupString()
        .test(balanceOnAmountChange("assetToSell"))
        .test(precisionOnAmountChange("assetToSell"))
        .required(),
    assetToSell: yupString()
        .test(balanceOnAssetChange("amountToSell"))
        .test(balanceOnAssetChange("amountToSell"))
        .required(),
    assetToBuy: yupString().test(checkPairUniquness).required()
});