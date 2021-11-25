import React, {Fragment, useState} from "react";
import {Body, Box, Card, FlexBox, MetadataBold} from "../helpers/global";
import {Table} from "../helpers/table";
import {BrandTextBtn, TransparentBtn} from "../helpers/btn";
import {getUserData} from "../../redux/actions/userData";
import {clsx, LoadData, translateStr} from "../../utils";
import {BackspaceIcon} from "../../svg";
import {ApiRequest} from "../../utils/requests";
import {handleUserOrders} from "../../utils/dataHandlers";
import {generateModal} from "../../redux/actions";

const tableHead = [
    {
        key: 'timestamp',
        translateTag: 'creationDate',
        handleItem: (item) => new Date(item).toLocaleString(),
        isSortable: true
    },
    {
        key: 'pair',
        translateTag: 'pair',
        handleItem: (item, row) => (
            <FlexBox>
                <Body text={row.baseSymbol} />
                <Box mx={.5}>
                    <Body text="/" />
                </Box>
                <Body text={row.quoteSymbol} color="brand" />
            </FlexBox>
        )
    },
    {
        key: 'type',
        translateTag: 'type',
        handleItem: (item) => (
            <MetadataBold content={`orders.types.${item}`} className={clsx("order-type", item)} />
        ),
        className: 'align-center',
        isSortable: true
    },
    {
        key: 'percent',
        translateTag: 'status',
        handleItem: (item) => <Body content={`orders.statuses.${item === 1 ? "closed" : "opened"}`} />
    },
    {
        key: 'baseAmount',
        translateTag: 'amount',
        handleItem: (item, row) => `${item} ${row.baseSymbol}`,
        isSortable: true
    },
    {
        key: 'quoteAmount',
        translateTag: 'price',
        handleItem: (item, row) => `${item} ${row.quoteSymbol}`,
        isSortable: true
    },
    {
        key: 'percent',
        translateTag: 'completed',
        handleItem: (item) => `${item * 100}%`,
        className: 'align-center',
        isSortable: true
    },
    {
        key: 'id',
        translateTag: 'actions',
        handleItem: (id, row, reloadData) => (
            <Box w="fit-content" mx="auto">
                <TransparentBtn
                    onClick={() => { console.log(id) }}
                    disabled={row.percent === 1}
                >
                    <BackspaceIcon />
                </TransparentBtn>
            </Box>
        ),
        className: 'align-center'
    }
];

export const Orders = () => {
    const i18n = translateStr("orders");
    const fn = () => new ApiRequest().getUserOrdersByName(getUserData().name).then(handleUserOrders);
    const [data, isLoading, reloadData] = LoadData(fn);

    const filtersList = ["all", "buy", "sell"];
    const [filter, setFilter] = useState(filtersList[0]);

    const rows = filter === filtersList[0] ? data : data.filter(el => el.type === filter);

    return(
        <Fragment>
            <Card>
                <FlexBox justify="space-between">
                    <FlexBox>
                        {filtersList.map(key => (
                            <button
                                key={key}
                                className={clsx("orders-filter", key === filter && "active")}
                                onClick={() => setFilter(key)}
                            >
                                <MetadataBold content={i18n("types", key)} />
                            </button>
                        ))}
                    </FlexBox>
                    <BrandTextBtn content={i18n("addOrder")} onClick={generateModal(<span>asdasdasd</span>)} />
                </FlexBox>
            </Card>
            <Card mt={2}>
                {isLoading
                    ? "Loading"
                    : <Table tableHead={tableHead} rows={rows} reloadData={reloadData} />
                }
            </Card>
        </Fragment>
    )
};