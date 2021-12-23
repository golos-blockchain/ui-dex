import {getTimezone} from "./getTimezone";

const supported_resolutions = ["1", "5", "60", "D", "W"];

export const setDataFeed = (pair, twData) => ({
    interval: supported_resolutions[supported_resolutions.length - 1],
    latestBar: 0,
    supported_resolutions,
    ticker: pair,
    onReady: (callback) => (
        setTimeout(() => {
            callback({
                exchanges: [{
                    value: "OPEN.",
                    name: "Openledger",
                    desc: "Openledger Gateway"
                }],
                symbols_types: [],
                supported_resolutions,
                supports_marks: false,
                supports_search: false,
                supports_time: true
            });
        }, 10)
    ),
    resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
        setTimeout(function () {
            if (!symbolName) return;

            const [base, quote] = symbolName.split('_');

            const quoteAsset = { symbol: quote };
            const baseAsset = { symbol: base };

            const symbol_stub = {
                name: symbolName,
                quoteAsset,
                baseAsset,
                description: '',
                timezone: getTimezone(),
                type: 'bitcoin',
                session: '24x7',
                ticker: symbolName,
                minmov: 1,
                pricescale: 10000,
                has_daily: true,
                has_empty_bars: true,
                has_intraday: true,
                has_seconds: false,
                intraday_multipliers: supported_resolutions,
                supported_resolutions,
                data_status: 'streaming',
            };

            if(quoteAsset.symbol.match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) symbol_stub.pricescale = 100;

            onSymbolResolvedCallback(symbol_stub);

        }, 0);
    },
    getBars: (
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback
    ) => {
        twData.getList(resolution, from, to).then(history => {
            if (!history.length) {
                onHistoryCallback([], {noData: true});
                return;
            }

            onHistoryCallback(history, {noData: false});
        });
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        twData.setUpdate(onRealtimeCallback);
    },
    unsubscribeBars: () => {
        //nothing
    },
    calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
        return undefined;
    }
})