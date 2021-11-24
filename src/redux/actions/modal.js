import {CLOSE_MODAL, OPEN_MODAL, ADD_MODAL_CONTENT, REMOVE_MODAL_CONTENT} from "../constants";
// import {blockContent} from "../../utils/";
import {reduxDispatch} from "../../utils/store";

export const connectModal = state => ({modal: state.modal});

export const generateModal = payload => () => initModal(payload);
export const initModal = payload => {
    // blockContent(true);
    reduxDispatch(ADD_MODAL_CONTENT, payload)
    setTimeout(() => reduxDispatch(OPEN_MODAL), 100);
}

export const closeModal = () => {
    // blockContent(false);
    reduxDispatch(CLOSE_MODAL);
    setTimeout(() => reduxDispatch(REMOVE_MODAL_CONTENT), 450);
}