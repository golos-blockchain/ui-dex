import {
    balanceOnAmountChange,
    precisionOnAmountChange,
    schema,
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