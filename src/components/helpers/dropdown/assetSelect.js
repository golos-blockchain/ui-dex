import {Select} from "./select";
import React from "react";
import {getAssetsList} from "../../../redux/actions/assets";

export const AssetSelect = ({whiteList = [], ...props}) => {
    const rawList = whiteList.length ? whiteList : getAssetsList();
    const assetsList = rawList.map(symbol => ({text: symbol}));

    return <Select {...props} list={assetsList} />
};