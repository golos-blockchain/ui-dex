import React from "react";
import {ApiRequest} from "../../utils/requests";
import {getUserData} from "../../redux/actions/userData";
import {handleUserHistory} from "../../utils/dataHandlers";
import {LoadData} from "../../utils";
import {Body, Box, Card, Metadata} from "../helpers/global";
import {Table} from "../helpers/table";
import {PageLoader} from "../layout";

const tableHead = [
    {
        key: 'icon',
        translateTag: '',
        className: "fit-content align-center"
    },
    {
        key: 'timestamp',
        translateTag: 'dateAndTime',
        handleItem: (item) => new Date(item).toLocaleString(),
        isSortable: true
    },
    {
        key: 'type',
        translateTag: 'type',
        handleItem: (item) => <Body content={`historyTable.${item}.title`} />
    },
    {
        key: 'summ',
        translateTag: 'summ',
        className: "summ"
    },
    {
        key: 'descData',
        translateTag: 'desc',
        handleItem: (item, row) => <Metadata content={`historyTable.${row.type}.description`} additionalData={item} />,
        className: "description"
    }
];

export const UserHistory = () => {
    const fn = () => new ApiRequest().getUserHistoryByName(getUserData().name).then(handleUserHistory);
    const [data, isLoading] = LoadData(fn, 500);

    return isLoading
        ? <PageLoader />
        : (
            <Card className="custom-scroll">
                { data.length
                    ? (
                        <Box>
                            <Table tableHead={tableHead} rows={data} />
                        </Box>
                    )
                    : <Body content="history.emptyHistory" />
                }
            </Card>
        )
};