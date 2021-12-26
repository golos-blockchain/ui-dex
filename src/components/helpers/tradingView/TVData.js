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
        this.resolution = 0;
        this.lastStartDate = 0;
        this.lastEndDate = 0;
        this.lastPriceTime = 0;
        this.updateFunc = false;
    }
    init(pair){
        this.pair = pair;
        this.lastStartDate = 0;
        this.lastEndDate = 0;
        this.lastPriceTime = 0;
        this.updateFunc = false;
        return this;
    }
    getPair(){
        return this.pair.join("_")
    }
    request(from, to){
        const [base, quote] = this.pair;

        const basePrecision = getAssetParam(base).precision;
        const quotePrecision = getAssetParam(quote).precision;

        const formatDate = (date) => new Date(date).toISOString().split(".")[0];
        const calculatePrice = (baseAmount, quoteAmount) => {
            const price = toFixedNum(quoteAmount, quotePrecision) / toFixedNum(baseAmount, basePrecision);
            return toFixedNum(price, basePrecision);
        };

        const bucket = getBucketFromResolution(this.resolution);

        const startDate = formatDate(from * 1000);
        const endDate = formatDate(to * 1000);

        return new ApiRequest().getPriceHistory(this.pair, bucket, startDate, endDate)
            .then(res => {
                if(!res || !res.length) return [];

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
            })
    }
    updateLastItem(){
        if(!this.updateFunc) return [];

        return this.request(this.lastStartDate, this.lastEndDate).then(history => {
            if(!history.length) return [];

            const lastElem = history[history.length - 1];
            const newBlocksByTime = history.filter(el => el.time > this.lastPriceTime);

            newBlocksByTime.length
                ? newBlocksByTime.forEach(this.updateFunc)
                : this.updateFunc(lastElem)
        });
    }
    getList(resolution, from, to){
        let setPriceTime = false;

        if(this.resolution !== resolution){
            this.resolution = resolution;
            this.lastStartDate = from;
            this.lastEndDate = to;

            setPriceTime = true;
        }

        return this.request(from, to).then(history => {
            if(setPriceTime) {
                const lastElem = history[history.length - 1] || {};
                this.lastPriceTime = lastElem.time;
            }

            return history;
        });
    }
    setUpdate(updateFunc){
        this.updateFunc = updateFunc;
    }
};

export default TVData;