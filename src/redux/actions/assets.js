import {getReduxState, reduxDispatch} from "../../utils/store";
import {SET_ASSETS} from "../constants";

export const connectAssets = state => ({assets: state.assets});
export const setAssets = payload => reduxDispatch(SET_ASSETS, payload);

export const getAssets = () => getReduxState("assets");

export const getAssetsList = () => getAssets().list;
export const getAssetsParams = () => getAssets().params;

export const getAssetParam = (symbol) => getAssetsParams()[symbol];

export const getAssetById = (id) => {
    id = String(id);

    if(!id) return false;

    const {list, params} = getAssets();
    const symbol = list[id];

    return params[symbol];
};