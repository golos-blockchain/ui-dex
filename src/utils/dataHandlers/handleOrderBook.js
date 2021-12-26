import {getAssetParam} from "../../redux/actions/assets";

export const handleOrderBook = pair => ({asks, bids}) => {
    const [base, quote] = pair;
    const baseParams = getAssetParam(base);
    const quoteParams = getAssetParam(quote);

    const handleOrder = ({price, asset1, asset2}) => {
        const base = asset1 / Math.pow(10, baseParams.precision);
        const quote = asset2 / Math.pow(10, quoteParams.precision);
        return { base, quote, price: Number(price) };
    };

    return {
        asks: asks.map(handleOrder),
        bids: bids.map(handleOrder)
    };
};