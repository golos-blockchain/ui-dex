import React from "react";
import {ApiRequest} from "../../utils/requests";
import {getUserData} from "../../redux/actions/userData";
import {balanceToObject, handleUserHistory, handleUserOrders} from "../../utils/dataHandlers";
import {LoadData} from "../../utils";
import {Body, BodyBold, Box, Card, FlexBox, Metadata} from "../helpers/global";
import {Table} from "../helpers/table";

const tableHead = [
    {
        key: 'icon',
        translateTag: ''
    },
    {
        key: 'timestamp',
        translateTag: 'dateAndTime',
        handleItem: (item) => new Date(item).toLocaleString(),
        className: "fit-content",
        isSortable: true
    },
    {
        key: 'type',
        translateTag: 'type',
        handleItem: (item) => <Body content={`historyTable.${item}.title`} />,
        className: "fit-content"
    },
    {
        key: 'summ',
        translateTag: 'summ',
        className: "fit-content"
    },
    {
        key: 'descData',
        translateTag: 'desc',
        handleItem: (item, row) => <Metadata content={`historyTable.${row.type}.description`} additionalData={item} />,
        className: "fit-content"
    }
]

export const UserHistory = () => {
    const fn = () => new ApiRequest().getUserHistoryByName(getUserData().name).then(handleUserHistory);
    const [data, isLoading, reloadData] = LoadData(fn);

    console.log(data);

    return(
        <Card>
            { !isLoading && <Table tableHead={tableHead} rows={data} /> }
        </Card>
    )
};