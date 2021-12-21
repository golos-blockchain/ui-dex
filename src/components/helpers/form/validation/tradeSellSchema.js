import {
    balanceOnAmountChange,
    precisionOnAmountChange,
    schema,
    yupNum,
    yupString
} from "./helpers";

export const tradeSellSchema = schema({
    price: yupString().required(),
    amount: yupString()
        .test(balanceOnAmountChange("baseAssetId"))
        .test(precisionOnAmountChange("baseAssetId"))
        .required(),
    range: yupString(),
    result: yupString()
        .test(precisionOnAmountChange("quoteAssetId"))
        .required()
});