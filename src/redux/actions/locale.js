import {reduxDispatch} from "../../utils/store";
import {SET_LOCALE} from "../constants";

export const connectLocale = state => ({locale: state.locale});
export const updateReduxLocale = payload => reduxDispatch(SET_LOCALE, payload);