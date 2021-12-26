import {DELETE_USER_DATA, LOGIN, LOGOUT, SET_USER_DATA, UPDATE_USER_DATA} from "../constants";

const defaultUserData = false;

export const reducer = (state = defaultUserData, {type, payload}) => {
    switch (type) {
        case LOGIN:   return {...payload};
        case SET_USER_DATA:   return {...payload};
        case UPDATE_USER_DATA:   return {...state, ...payload};
        case DELETE_USER_DATA:   return defaultUserData;
        case LOGOUT:   return defaultUserData;
        default:                return state;
    }
};

export default reducer