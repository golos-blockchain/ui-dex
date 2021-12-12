import React, {useState} from "react";
import {FlexBox, MetadataBold} from "../global";
import {clsx, translateStr} from "../../../utils";

export const ordersFiltersList = ["all", "buy", "sell"];
export const useOrdersFiltersState = () => useState(ordersFiltersList[0]);
export const filterOrdersList = (rows, filter) => filter === ordersFiltersList[0] ? rows : rows.filter(el => el.type === filter);

export const OrdersFilter = ({filtersState = []}) => {
    const i18n = translateStr("orders");

    const [filter, setFilter] = filtersState;

    return(
        <FlexBox>
            {ordersFiltersList.map(key => (
                <button
                    key={key}
                    className={clsx("orders-filter", key === filter && "active")}
                    onClick={() => setFilter(key)}
                >
                    <MetadataBold content={i18n("types", key)} />
                </button>
            ))}
        </FlexBox>
    )
}