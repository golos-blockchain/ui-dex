import {OPEN_MODAL, ADD_MODAL_CONTENT, CLOSE_MODAL, REMOVE_MODAL_CONTENT} from "../constants";

const defaultState = {visible: false, content: ""};

const reducer = (state = {...defaultState}, {type, payload}) => {
    switch (type) {
        case OPEN_MODAL:   return {...state, visible: true};
        case CLOSE_MODAL:   return {...state, visible: false};
        case ADD_MODAL_CONTENT:   return {...state, content: payload};
        case REMOVE_MODAL_CONTENT:   return {...defaultState};
        default:                return state;
    }
};

export default reducer