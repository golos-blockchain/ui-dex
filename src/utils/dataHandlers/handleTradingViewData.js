import TVData from "../../components/helpers/tradingView/TVData";

let twData = false;

export const handleTradingViewData = (pair) => {
    const createNewTWData = !twData || twData.getPair() !== pair.join("_");
    const updateTWData = twData && twData.updateFunc;

    if(createNewTWData) {
        twData = new TVData().init(pair);
    } else if(updateTWData) {
        twData.updateLastItem();
    }

    return twData;
};