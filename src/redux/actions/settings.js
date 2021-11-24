import {getReduxState, reduxDispatch} from "../../utils/store";
import {SET_NIGHT_MODE, SET_SETTINGS} from "../constants";

export const connectSettings = state => ({settings: state.settings});
export const connectNightMode = state => ({nightMode: state.settings.nightMode});
export const getSettings = () => getReduxState("settings");
export const isNightMode = () => getSettings().nightMode;

export const setSettings = payload => reduxDispatch(SET_SETTINGS, payload);
export const setNightMode = payload => reduxDispatch(SET_NIGHT_MODE, payload);