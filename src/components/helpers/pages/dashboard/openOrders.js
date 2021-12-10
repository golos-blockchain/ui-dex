import React from "react";
import {OrdersTable} from "../../../pages";

export const OpenOrders = ({list, onUpdate}) => {
    const rows = list.filter(el => el.percent !== 1 && !el.isCancelled);

    console.log(rows);

    return <OrdersTable rows={rows} reloadData={onUpdate} />;
};