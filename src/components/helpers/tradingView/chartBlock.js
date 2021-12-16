import React, {useEffect} from "react";
import {setDataFeed} from "./setDataFeed";
import {getTimezone} from "./getTimezone";

const defaultParams = {
    container_id: "tradingview",
    library_path: `/charting_library/`,
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    autosize: true,
    overrides: {
        "paneProperties.background": "rgba(255, 255, 255, 1)",
        "paneProperties.horzGridProperties.color": "rgba(255, 255, 255, 1)",
        "paneProperties.vertGridProperties.color": "rgba(255, 255, 255, 1)",
        "symbolWatermarkProperties.transparency": "0.01",
    },
    enabled_features: ["study_templates", "keep_left_toolbar_visible_on_small_screens"],
    disabled_features: ["header_saveload", "symbol_info", "symbol_search_hot_key", "border_around_the_chart", "header_symbol_search", "header_compare"]
};

export const ChartPage = ({base, quote, tradingViewData}) => {
    useEffect(() => {
        const TradingView = window.TradingView;

        const pair = [base, quote];

        const symbol = pair.join("_");

        const datafeed = setDataFeed(pair.join("_"), tradingViewData);
        const timezone = getTimezone();

        new TradingView.widget({ ...defaultParams, symbol, datafeed, timezone });
    }, []);

    return(
        <div id="tradingview" className="tradingview">
            chart
        </div>
    )
};