import {Select} from "./select";
import React from "react";
import {getAssetsList, getWhitelist} from "../../../redux/actions/assets";

export const AssetSelect = ({whitelistBase, ...props}) => {
    const defaultAssetsList = whitelistBase ? getWhitelist(whitelistBase) : getAssetsList();
    const assetsList = defaultAssetsList.map((symbol, id) => ({id: String(id), text: symbol}));

    return <Select {...props} list={assetsList} />
};