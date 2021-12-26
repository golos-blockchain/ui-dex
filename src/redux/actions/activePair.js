import {getReduxState, reduxDispatch} from "../../utils/store";
import {SET_ACTIVE_PAIR} from "../constants";

export const connectActivePair = state => ({activePair: state.activePair});
export const getActivePair = () => getReduxState("activePair");
export const updateActivePair = payload => reduxDispatch(SET_ACTIVE_PAIR, payload);