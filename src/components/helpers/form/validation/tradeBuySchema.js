import {checkBalanceOnTradeBuy, schema, yupNum, yupString} from "./helpers";

export const tradeBuySchema = schema({
    price: yupString().required(),
    amount: yupString().required(),
    range: yupNum(),
    result: yupString().test(checkBalanceOnTradeBuy).required()
});