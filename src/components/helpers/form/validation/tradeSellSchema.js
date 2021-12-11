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
    range: yupNum(),
    result: yupString()
        .test(precisionOnAmountChange("quoteAssetId"))
        .required()
});