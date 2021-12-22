import React from "react";
import {reduxDispatch} from "../../utils/store";
import {blockContent} from "../../utils/";
import {CLOSE_MODAL, OPEN_MODAL, ADD_MODAL_CONTENT, REMOVE_MODAL_CONTENT} from "../constants";

export const connectModal = state => ({modal: state.modal});

export const generateModal = payload => () => initModal({content: payload});
export const initModal = payload => {
    blockContent(true);
    reduxDispatch(ADD_MODAL_CONTENT, payload);
    setTimeout(() => reduxDispatch(OPEN_MODAL), 100);
};

export const generatePromiseModal = (ModalBody, props) => (
    new Promise((resolve, reject) => {
        initModal({content: <ModalBody resolve={resolve} reject={reject} {...props}  />, onClose: reject});
    })
);

export const closeModal = () => {
    blockContent(false);
    reduxDispatch(CLOSE_MODAL);
    setTimeout(() => reduxDispatch(REMOVE_MODAL_CONTENT), 450);
};