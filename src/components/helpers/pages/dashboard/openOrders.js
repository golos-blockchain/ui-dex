import React from "react";
import {OrdersTable} from "../../../pages";
import {filterOpenOrders} from "../../../../utils/dataHandlers";

export const OpenOrders = ({list, onUpdate}) => {
    const rows = list.filter(filterOpenOrders);

    return <OrdersTable rows={rows} reloadData={onUpdate} />;
};