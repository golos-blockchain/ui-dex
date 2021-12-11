import {checkBalanceOnTradeSell, schema, yupNum, yupString} from "./helpers";

export const tradeSellSchema = schema({
    price: yupString().required(),
    amount: yupString().test(checkBalanceOnTradeSell).required(),
    range: yupNum(),
    result: yupString().required()
});