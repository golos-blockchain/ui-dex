import React, {useEffect} from "react";
import {setDataFeed} from "./setDataFeed";
import {getTimezone} from "./getTimezone";
import {connectSettings} from "../../../redux/actions";
import {connect} from "react-redux";

const formDefaultParams = (nightMode) => ({
    container_id: "tradingview",
    library_path: `/charting_library/`,
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    locale: "ru",
    autosize: true,
    custom_css_url: nightMode ? "/charting_library/custom-dark-theme.css" : "",
    loading_screen:  { backgroundColor: nightMode ? "#342448" : "white" },
    toolbar_bg: nightMode ? "#342448" : "#fff",
    overrides: {
        "paneProperties.background": nightMode ? "#342448" : "white",
        "paneProperties.vertGridProperties.color": nightMode ? "rgba(128, 255, 209, 0.2)" : "#D7FAEB",
        "paneProperties.horzGridProperties.color": nightMode ? "rgba(128, 255, 209, 0.2)" : "#D7FAEB",
        "scalesProperties.textColor": nightMode ? "#F5F2FA" : "#2C1B48",
        "mainSeriesProperties.candleStyle.wickUpColor": "#50A39A",
        "mainSeriesProperties.candleStyle.wickDownColor": '#DE5E57',
    },
    enabled_features: ["study_templates", "keep_left_toolbar_visible_on_small_screens"],
    disabled_features: ["header_saveload", "symbol_info", "symbol_search_hot_key", "border_around_the_chart", "header_symbol_search", "header_compare", "use_localstorage_for_settings"],
    time_frames: [
        // { text: "50y", resolution: "6M", description: "50 Years" },
        // { text: "3y", resolution: "W", description: "3 Years", title: "3yr" },
        // { text: "8m", resolution: "D", description: "8 Month" },
        // { text: "3d", resolution: "5", description: "3 Days" },
        // { text: "1000y", resolution: "W", description: "All", title: "All" },
    ]
});

const Display = ({settings, base, quote, tradingViewData}) => {
    useEffect(() => {
        const TradingView = window.TradingView;

        const pair = [base, quote];

        const symbol = pair.join("_");

        const defaultParams = {...formDefaultParams(settings.nightMode)};

        const datafeed = setDataFeed(pair.join("_"), tradingViewData);
        const timezone = getTimezone();

        new TradingView.widget({ ...defaultParams, symbol, datafeed, timezone });
    }, [settings.nightMode]);

    return(
        <div id="tradingview" className="tradingview">
            chart
        </div>
    )
};

export const ChartPage = connect(connectSettings)(Display)