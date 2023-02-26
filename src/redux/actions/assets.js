import {getReduxState, reduxDispatch} from "../../utils/store";
import {SET_ASSETS} from "../constants";

export const connectAssets = state => ({assets: state.assets});
export const setAssets = payload => reduxDispatch(SET_ASSETS, payload);

export const getAssets = () => getReduxState("assets");

export const getAssetsList = () => getAssets().list;
export const getAssetsParams = () => getAssets().params;

export const getAssetParam = (symbol) => getAssetsParams()[symbol];

export const getWhitelist = (base) => {
    const {list: rawList, params} = getAssets();
    const baseWhitelistRaw = params[base].whitelist;
    const baseWhitelist = baseWhitelistRaw.length ? baseWhitelistRaw : rawList.filter(symbol => symbol !== base)

    return baseWhitelist.filter(key => {
        const quoteWhitelist = params[key].whitelist;
        return quoteWhitelist.length ? quoteWhitelist.includes(base) : true;
    });
};

export const getAssetById = (id) => {
    id = String(id);

    if(!id) return false;

    const {list, params} = getAssets();
    const symbol = list[id];

    return params[symbol];
};