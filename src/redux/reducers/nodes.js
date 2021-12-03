import {SET_NODES_DATA, UPDATE_NODES_LIST, SET_ACTIVE_NODE} from "../constants";

export const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case SET_NODES_DATA:   return payload;
        case UPDATE_NODES_LIST:   return {...state, list: payload};
        case SET_ACTIVE_NODE:   return {...state, activeNode: payload};
        default:          return state;
    }
};

export default reducer