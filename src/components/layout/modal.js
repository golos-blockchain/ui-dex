import React from "react";
import {closeModal, connectModal} from "../../redux/actions/modal";
import {connect} from "react-redux";
import {clsx} from "../../utils";
import {TransparentBtn} from "../helpers/btn";
import {CrossIcon} from "../../svg";

const ModalComponent = ({modal}) => {
    const {visible, content} = modal;

    return(
        <div className={clsx("modal", visible && "open", "custom-scroll")}>
            <div className="overlay" onClick={closeModal} />
            <div className={clsx("card", "modal__body")}>
                {content}
                <TransparentBtn className="modal__cross" onClick={closeModal}>
                    <CrossIcon />
                </TransparentBtn>
            </div>
        </div>
    )
};

export const Modal = connect(connectModal)(ModalComponent);