import React from "react";
import {Box, Card, H2} from "../helpers/global";
import {ApiRequest} from "../../utils/requests";
import {getUserData} from "../../redux/actions/userData";
import {handleUserOrders} from "../../utils/dataHandlers";
import {LoadData, translateStr} from "../../utils";
import {OrdersTable} from "./orders";

const OpenOrders = () => {
    const fn = () => new ApiRequest().getUserOrdersByName(getUserData().name).then(handleUserOrders);
    const [data, isLoading, reloadData] = LoadData(fn);

    if(isLoading) return "Loading";

    const rows = data.filter(el => el.percent !== 1 && !el.isCancelled);

    return <OrdersTable rows={rows} reloadData={reloadData} />;
};

export const Dashboard = () => {
    const i18n = translateStr("dashboard");
    return(
        <div>
            <Card py={1.5} px={2}>
                <H2 content={i18n("orders")} />
                <Box mt={1.5}>
                    <OpenOrders />
                </Box>
            </Card>
        </div>
    )
};