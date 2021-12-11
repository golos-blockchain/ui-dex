import {Select} from "./select";
import React from "react";
import {getAssetsList} from "../../../redux/actions/assets";

export const AssetSelect = ({whiteList = [], ...props}) => {
    const defaultAssetsList = getAssetsList().map((symbol, id) => ({id: String(id), text: symbol}));

    const assetsList = whiteList.length
        ? whiteList.map(symbol => defaultAssetsList.find(el => el.text === symbol))
        : defaultAssetsList;

    return <Select {...props} list={assetsList} />
};