import React from "react";
import {ApiRequest} from "../../../../utils/requests";
import {getUserData} from "../../../../redux/actions/userData";
import {handleUserOrders} from "../../../../utils/dataHandlers";
import {LoadData} from "../../../../utils";
import {OrdersTable} from "../../../pages";

export const OpenOrders = () => {
    const fn = () => new ApiRequest().getUserOrdersByName(getUserData().name).then(handleUserOrders);
    const [data, isLoading, reloadData] = LoadData(fn);

    if(isLoading) return "Loading";

    const rows = data.filter(el => el.percent !== 1 && !el.isCancelled);

    return <OrdersTable rows={rows} reloadData={reloadData} />;
};