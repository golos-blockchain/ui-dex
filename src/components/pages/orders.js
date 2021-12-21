import React, {Fragment, useState} from "react";
import {Body, Box, Card, FlexBox, MetadataBold} from "../helpers/global";
import {
    filterOrdersList,
    OrdersFilter,
    ordersFiltersList,
    Table,
    useFiltersState,
    useOrdersFiltersState
} from "../helpers/table";
import {BrandTextBtn, TransparentBtn} from "../helpers/btn";
import {getUserData} from "../../redux/actions/userData";
import {clsx, LoadData, translateStr} from "../../utils";
import {BackspaceIcon} from "../../svg";
import {ApiRequest} from "../../utils/requests";
import {filterOpenOrders, handleUserOrders} from "../../utils/dataHandlers";
import {generateModal, initModal} from "../../redux/actions";
import {CancelOrderConfirm, CancelAllOrderConfirm} from "../helpers/confirmModals/";
import {PageLoader} from "../layout";

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
        handleItem: (item, row) => {
            const status = item === 1 ? "closed" : row.isCancelled ? "cancelled" : row.isExpired ? "expired" : "opened";
            return <Body content={`orders.statuses.${status}`} />
        }
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
        handleItem: (item) => `${+(item * 100).toFixed(2)}%`,
        className: 'align-center',
        isSortable: true
    },
    {
        key: 'id',
        translateTag: 'actions',
        handleItem: (id, row, reloadData) => (
            <Box w="fit-content" mx="auto">
                <TransparentBtn
                    onClick={generateModal(<CancelOrderConfirm id={id} reloadData={reloadData} />)}
                    disabled={row.percent === 1 || row.isCancelled || row.isExpired}
                >
                    <BackspaceIcon />
                </TransparentBtn>
            </Box>
        ),
        className: 'align-center'
    }
];

export const OrdersTable = ({rows, reloadData}) => {
    return rows.length
        ? (
            <Box>
                <Table tableHead={tableHead} rows={rows} reloadData={reloadData} />
            </Box>
        )
        : <Body content="orders.emptyFilter" />;
};

export const Orders = () => {
    const i18n = translateStr("orders");
    const fn = () => new ApiRequest().getUserOrdersByName(getUserData().name).then(handleUserOrders);
    const [data, isLoading, reloadData] = LoadData(fn, 500);
    const filtersState = useOrdersFiltersState();

    if(isLoading) return <PageLoader />;

    const rows = filterOrdersList(data, filtersState[0]);

    const onCancel = () => {
        const allOpenOrders = data.filter(filterOpenOrders);
        initModal({content: <CancelAllOrderConfirm openOrders={allOpenOrders} reloadData={reloadData} /> })
    };

    return(
        <Fragment>
            <Card p="1rem 2rem">
                <FlexBox justify="space-between" wrap>
                    <Box p="1rem 0">
                        <OrdersFilter filtersState={filtersState} />
                    </Box>
                    {/*<Box p="1rem 0">*/}
                        {/*<BrandTextBtn content={i18n("closeAllOrders")} onClick={onCancel} />*/}
                    {/*</Box>*/}
                </FlexBox>
            </Card>
            <Card className="custom-scroll" mt={2}>
                {rows.length
                    ? <OrdersTable rows={rows} reloadData={reloadData} />
                    : <Body content="trade.emptyUserOrders" />
                }
            </Card>
        </Fragment>
    )
};