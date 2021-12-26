import React from "react";
import {RedTextBtn} from "../btn";
import {NewOrderConfirm} from "./newOrderConfirm";

export const TradeSellConfirm = (props) => (
    <NewOrderConfirm tag="tradeSell" btnComponent={RedTextBtn} {...props} />
);