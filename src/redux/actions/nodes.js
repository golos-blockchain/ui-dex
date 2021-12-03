import {reduxDispatch} from "../../utils/store";
import {SET_ACTIVE_NODE, SET_NODES_DATA, UPDATE_NODES_LIST} from "../constants";

export const connectNodes = state => ({nodes: state.nodes});

const nodeAction = action => payload => reduxDispatch(action, payload);

export const initNodes = nodeAction(SET_NODES_DATA);
export const updateNodesList = nodeAction(UPDATE_NODES_LIST);
export const setActiveNode = nodeAction(SET_ACTIVE_NODE);