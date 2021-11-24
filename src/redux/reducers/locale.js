import {SET_LOCALE} from "../constants";

export const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case SET_LOCALE:   return payload;
        default:                return state;
    }
};

export default reducer