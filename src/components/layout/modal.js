import React from "react";
import {closeModal, connectModal} from "../../redux/actions/modal";
import {connect} from "react-redux";
import {clsx} from "../../utils";
import {TransparentBtn} from "../helpers/btn";
import {CrossIcon} from "../../svg";

const ModalComponent = ({modal}) => {
    const {visible, content, onClose} = modal;

    const closeClick = () => {
        if(onClose) onClose();
        closeModal();
    };

    return(
        <div className={clsx("modal", visible && "open")}>
            <div className="overlay" onClick={closeClick} />
            <div className={clsx("card", "modal__body", "custom-scroll")}>
                {content}
                <TransparentBtn className="modal__cross" onClick={closeClick}>
                    <CrossIcon />
                </TransparentBtn>
            </div>
        </div>
    )
};

export const Modal = connect(connectModal)(ModalComponent);