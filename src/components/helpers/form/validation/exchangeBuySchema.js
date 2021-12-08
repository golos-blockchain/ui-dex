import {checkBalanceOnExchangeBuy, schema, yupString} from "./helpers";

export const exchangeBuySchema = schema({
    price: yupString().required(),
    amount: yupString().test(checkBalanceOnExchangeBuy).required(),
    range: yupString(),
    result: yupString()
});