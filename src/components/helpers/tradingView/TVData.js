import {ApiRequest} from "../../../utils/requests";
import {getAssetParam} from "../../../redux/actions/assets";
import {toFixedNum} from "../../../utils";

const getBucketFromResolution = (r) => {
    if (r === "D") return 24 * 60 * 60;

    if (r.indexOf("W") !== -1) {
        return parseInt(r.replace("D", ""), 10) * 7 * 24 * 60 * 60;
    } else if (r.indexOf("D") !== -1) {
        return parseInt(r.replace("D", ""), 10) * 24 * 60 * 60;
    } else if (r.indexOf("S") !== -1) {
        return parseInt(r.replace("S", ""), 10);
    } else {
        return parseInt(r, 10) * 60;
    }
};

class TVData{
    constructor(){
        this.pair = ["", ""];
        this.list = [];
        this.resolution = 0;
        this.lastPriceTime = 0;
        this.updateFunc = false;
    }
    init(pair){
        this.pair = pair;
        return this;
    }
    setResolution(resolution){
        this.list = [];
        this.resolution = resolution;
        return this;
    }
    getPair(){
        return this.pair.join("_")
    }
    getList(){
        const [base, quote] = this.pair;

        const basePrecision = getAssetParam(base).precision;
        const quotePrecision = getAssetParam(quote).precision;

        const formatDate = (date) => new Date(date).toISOString().split(".")[0];

        const time = new Date().getTime();
        const startDate = formatDate(time - 1000*60*60*24*360*2);
        const endDate = formatDate(time + 1000*60*60*24*360);

        const bucket = getBucketFromResolution(this.resolution);

        const calculatePrice = (baseAmount, quoteAmount) => {
            const price = toFixedNum(quoteAmount, quotePrecision) / toFixedNum(baseAmount, basePrecision);
            return toFixedNum(price, basePrecision);
        };

        return new ApiRequest().getPriceHistory(this.pair, bucket, startDate, endDate)
            .then(res => {
                if(!res || !res.length) return [];

                console.log(res);

                return res.map(el => {

                    const time = new Date(el.open).getTime();
                    let low, high, volume, open, close;

                    high = calculatePrice(el.high_asset1, el.high_asset2);
                    low = calculatePrice(el.low_asset1, el.low_asset2);
                    open = calculatePrice(el.open_asset1, el.open_asset2);
                    close = calculatePrice(el.close_asset1, el.close_asset2);
                    volume = toFixedNum(el.asset1_volume, basePrecision);

                    return { time, high, low, open, close, volume };
                })
            }).then(history => {
                if(!history.length) return this.list;

                const lastElem = history[history.length - 1];

                if(this.list.length && this.updateFunc) {
                    const newBlocksByTime = history.filter(el => el.time > this.lastPriceTime);
                    newBlocksByTime.length
                        ? newBlocksByTime.forEach(this.updateFunc)
                        : this.updateFunc(lastElem)
                }

                this.list = history;
                this.lastPriceTime = history[history.length - 1].time;

                // // store.dispatch({type: 'SET_TV', payload: this});
                return this.list;
            });
    }
    setUpdate(updateFunc){
        this.updateFunc = updateFunc;
    }
    cleadData(){
        this.pair = ["", ""];
        this.list = [];
        this.resolution = 0;
        this.lastPriceTime = 0;
        this.updateFunc = false;
    }
};

export default TVData;