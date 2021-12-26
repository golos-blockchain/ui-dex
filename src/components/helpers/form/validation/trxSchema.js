import {
    balanceOnAmountChange, balanceOnAssetChange, minAmount, precisionOnAmountChange, precisionOnAssetChange,
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

export const withdrawSchemaGenerator = (min_amount) => schema({
    summ: yupString()
        .test(minAmount(min_amount))
        .test(balanceOnAmountChange("asset"))
        .test(precisionOnAmountChange("asset"))
        .required(),
    asset: yupString()
        .test(balanceOnAssetChange("summ"))
        .test(precisionOnAssetChange("summ"))
        .required(),
    memo: yupString().required()
});