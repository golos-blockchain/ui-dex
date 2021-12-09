import {Select} from "./select";
import React from "react";
import {getAssetsList} from "../../../redux/actions/assets";

export const AssetSelect = ({whiteList = [], ...props}) => {
    const defaultAssetsList = getAssetsList();

    const rawList = whiteList.length
        ? whiteList.map(symbol => defaultAssetsList.find(el => el.symbol === symbol))
        : defaultAssetsList;

    const assetsList = rawList.map((el) => ({id: el.id, text: el.symbol}));

    return <Select {...props} list={assetsList} />
};