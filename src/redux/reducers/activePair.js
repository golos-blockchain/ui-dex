import {SET_ACTIVE_PAIR} from "../constants";

export const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case SET_ACTIVE_PAIR:   return payload;
        default:                return state;
    }
};

export default reducer