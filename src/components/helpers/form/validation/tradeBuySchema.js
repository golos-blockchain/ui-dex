import {checkBalanceOnTradeBuy, schema, yupString} from "./helpers";

export const tradeBuySchema = schema({
    price: yupString().required(),
    amount: yupString().required(),
    range: yupString(),
    result: yupString().test(checkBalanceOnTradeBuy).required()
});