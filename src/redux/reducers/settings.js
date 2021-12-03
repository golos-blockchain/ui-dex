import {SET_NIGHT_MODE, SET_SETTINGS} from "../constants";

const defaultSettings = {
    nightMode: false,
}

export const reducer = (state = {...defaultSettings}, {type, payload}) => {
    switch (type) {
        case SET_SETTINGS:   return {...payload};
        case SET_NIGHT_MODE:   return {...state, nightMode: payload};
        default:                return state;
    }
};

export default reducer