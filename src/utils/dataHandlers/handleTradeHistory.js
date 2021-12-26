import {amountToObject} from "./handleAssets";
import {getAssetParam} from "../../redux/actions/assets";
import {toFixedNum} from "../numbersOperations";

export const handleTradeHistory = (list, base) => list.map(el => {
    const {current_pays, date, open_pays} = el;

    const timestamp = new Date(date).getTime();
    const {amount: sellAmount, symbol: sellSymbol} = amountToObject(current_pays);
    const {amount: buyAmount, symbol: buySymbol} = amountToObject(open_pays);

    const isSell = sellSymbol === base;
    const type = isSell ? "sell" : "buy";
    const baseSymbol = isSell ? sellSymbol : buySymbol;
    const amounts = [sellAmount, buyAmount];

    if(!isSell) amounts.reverse();

    const [baseAmount, quoteAmount] = amounts;
    const precision = getAssetParam(baseSymbol).precision;

    const price = toFixedNum(baseAmount / quoteAmount, precision);

    return { timestamp, type, baseAmount, quoteAmount, price }
});