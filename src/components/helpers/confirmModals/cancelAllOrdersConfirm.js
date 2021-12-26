import {BroadcastRequest} from "../../../utils/requests";
import {ConfirmModal} from "./confirmModal";
import {RedTextBtn} from "../btn";
import React from "react";
import {closeModal} from "../../../redux/actions";

export const CancelAllOrderConfirm = ({openOrders, reloadData}) => {
    const action = () => {
        const extensions = openOrders.reduce((acc, next) => {
            const pair = `${next.baseSymbol} ${next.quoteSymbol}`;

            if(!acc.includes(pair)){
                acc.push(pair)
            }

            return acc;
        }, []).map(pair => {
            const [base, quote] = pair.split(" ");
            return [0, { base, quote, reverse: false }]
        });

        new BroadcastRequest().cancelAllOrders({extensions}).then(reloadData);
    };

    const props = openOrders.length
        ? {
            tag: "cancelAllOrders",
            btnComponent: RedTextBtn,
            action
        } : {
            tag: "cancelAllOrdersEmpty",
            action: closeModal
        };

    return <ConfirmModal {...props} />;
};