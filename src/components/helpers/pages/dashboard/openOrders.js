import React from "react";
import {OrdersTable} from "../../../pages";
import {filterOpenOrders} from "../../../../utils/dataHandlers";
import {Body, Box} from "../../global";

export const OpenOrders = ({list, onUpdate}) => {
    const rows = list.filter(filterOpenOrders);

    return rows.length
        ? (
            <Box className="custom-scroll">
                <Box>
                    <OrdersTable rows={rows} reloadData={onUpdate} />
                </Box>
            </Box>
        ) : <Body content="trade.emptyOpenOrders" />;
};