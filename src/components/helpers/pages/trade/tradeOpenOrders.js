import React from "react";
import {TradeOrdersTable} from "./tradeOrdersTable";
import {Box, MetadataBold} from "../../global";
import {clsx} from "../../../../utils";
import {TransparentBtn} from "../../btn";
import {generateModal} from "../../../../redux/actions";
import {CancelOrderConfirm} from "../../confirmModals";
import {BackspaceIcon} from "../../../../svg";
import {filterOpenOrders} from "../../../../utils/dataHandlers";

export const TradeOpenOrders = ({userOrders = [], base, quote, reloadData, ...props}) => {
    const tableHead = [
        {
            key: 'timestamp',
            translateTag: 'creationDate',
            handleItem: (item) => new Date(item).toLocaleString(),
            className: "fit-content",
            isSortable: true
        },
        {
            key: 'type',
            translateTag: 'type',
            handleItem: (item) => (
                <MetadataBold content={`orders.types.${item}`} className={clsx("order-type", item)} />
            ),
            className: 'align-center',
        },
        {
            key: 'baseAmount',
            translateTag: 'amountWithAsset',
            translateParams: { asset: base },
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
            key: 'quoteAmount',
            translateTag: 'priceWithAsset',
            translateParams: { asset: quote },
            className: 'align-right',
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

    const rows = userOrders.filter(filterOpenOrders);

    return <TradeOrdersTable {...props} emptyTag="emptyOpenOrders" tableHead={tableHead} rows={rows} reloadData={reloadData} />
};