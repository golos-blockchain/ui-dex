import {
    balanceOnAmountChange,
    precisionOnAmountChange,
    schema,
    yupString
} from "./helpers";

export const tradeBuySchema = schema({
    price: yupString().required(),
    amount: yupString()
        .test(precisionOnAmountChange("baseAssetId"))
        .required(),
    range: yupString(),
    result: yupString()
        .test(balanceOnAmountChange("quoteAssetId"))
        .test(precisionOnAmountChange("quoteAssetId"))
        .required()
});