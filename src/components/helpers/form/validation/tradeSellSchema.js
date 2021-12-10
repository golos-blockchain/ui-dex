import {checkBalanceOnTradeSell, schema, yupString} from "./helpers";

export const tradeSellSchema = schema({
    price: yupString().required(),
    amount: yupString().test(checkBalanceOnTradeSell).required(),
    range: yupString(),
    result: yupString().required()
});