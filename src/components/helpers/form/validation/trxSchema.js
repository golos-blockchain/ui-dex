import {
    balanceOnAmountChange, balanceOnAssetChange, precisionOnAmountChange, precisionOnAssetChange,
    schema,
    yupString
} from "./helpers";

export const trxSchema = schema({
    to: yupString().required(),
    summ: yupString()
        .test(balanceOnAmountChange("asset"))
        .test(precisionOnAmountChange("asset"))
        .required(),
    asset: yupString()
        .test(balanceOnAssetChange("summ"))
        .test(precisionOnAssetChange("summ"))
        .required(),
    memo: yupString()
});