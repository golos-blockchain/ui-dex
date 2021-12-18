import React from "react";
import {OrdersTable} from "../../../pages";
import {filterOpenOrders} from "../../../../utils/dataHandlers";
import {Body} from "../../global";

export const OpenOrders = ({list, onUpdate}) => {
    const rows = list.filter(filterOpenOrders);

    return rows.length
        ? <OrdersTable rows={rows} reloadData={onUpdate} />
        : <Body content="trade.emptyOpenOrders" />;
};