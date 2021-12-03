import {SET_ASSETS} from "../constants";

const defaultAssets = {}

export const reducer = (state = {...defaultAssets}, {type, payload}) => {
    switch (type) {
        case SET_ASSETS:   return {...payload};
        default:                return state;
    }
};

export default reducer