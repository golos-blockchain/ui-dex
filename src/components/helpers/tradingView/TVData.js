class TVData{
    constructor(){
        this.pair = { base: '', quote: '' };
        this.list = [];
        this.resolution = 0;
        this.lastPriceTime = 0;
        this.updateFunc = false;
    }
    init(symbols, resolution){
        console.log("INITED!");

        this.pair.base = symbols.baseAsset;
        this.pair.quote = symbols.quoteAsset;
        this.resolution = resolution;
        return this;
    }
    getList(){

        const time = new Date().getTime();
        const startDate = time - 1000*60*60*24*360;
        const endDate = time + 1000*60*60*24*60;

        // return new ApiRequest().getPriceHistory(this.pair, this.resolution, startDate, endDate)
        //     .then(history => {
        //
        //         if(!history.length) return this.list;
        //
        //         const lastElem = history[history.length - 1];
        //
        //         if(this.list.length && this.updateFunc) {
        //             const newBlocksByTime = history.filter(el => el.time > this.lastPriceTime);
        //             newBlocksByTime.length
        //                 ? newBlocksByTime.forEach(this.updateFunc)
        //                 : this.updateFunc(lastElem)
        //         }
        //
        //         this.list = history;
        //         this.lastPriceTime = history[history.length - 1].time;
        //
        //         // store.dispatch({type: 'SET_TV', payload: this});
        //         return this.list;
        //     });
    }
    setUpdate(updateFunc){
        this.updateFunc = updateFunc;
    }
};

export default TVData;