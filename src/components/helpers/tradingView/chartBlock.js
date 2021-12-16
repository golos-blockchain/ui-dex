import React, {useEffect} from "react";
import {setDataFeed} from "./setDataFeed";
import {getTimezone} from "./getTimezone";

const defaultParams = {
    container_id: "tradingview",
    library_path: `/`,
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    autosize: true,
    overrides: {
        "paneProperties.background": "rgba(255, 255, 255, 1)",
        "paneProperties.horzGridProperties.color": "rgba(255, 255, 255, 1)",
        "paneProperties.vertGridProperties.color": "rgba(255, 255, 255, 1)"
    },
    enabled_features: ["study_templates", "keep_left_toolbar_visible_on_small_screens"],
    disabled_features: ["header_saveload", "symbol_info", "symbol_search_hot_key", "border_around_the_chart", "header_symbol_search", "header_compare"]
};

export const ChartPage = ({base, quote}) => {
    useEffect(() => {
        const TradingView = window.TradingView;

        const pair = [base, quote];

        // const data = await new ApiRequest().getTicker(pair);

        // console.log(data);

        const symbol = pair.join("_");

        const datafeed = setDataFeed(pair.join("_"));
        const timezone = getTimezone();

        new TradingView.widget({ ...defaultParams, symbol, datafeed, timezone });
    }, []);

    return(
        <div id="tradingview" style={{ display: "block", width: "100%", height: "100%" }}>
            chart
        </div>
    )
};