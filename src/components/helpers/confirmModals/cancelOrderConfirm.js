import React from "react";
import {BroadcastRequest} from "../../../utils/requests";
import {ConfirmModal} from "./confirmModal";
import {RedTextBtn} from "../btn";

export const CancelOrderConfirm = ({id, reloadData}) => {
    const action = () => new BroadcastRequest().orderCancel({orderid: id}).then(reloadData);

    return(
        <ConfirmModal
            tag="cancelOrder"
            descAdditionalData={{ id }}
            btnComponent={RedTextBtn}
            action={action}
        />
    )
};