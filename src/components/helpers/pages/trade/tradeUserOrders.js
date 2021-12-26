import React from "react";
import {MetadataBold} from "../../global";
import {clsx} from "../../../../utils";
import {TradeOrdersTable} from "./tradeOrdersTable";

export const TradeUserOrders = ({userOrders = [], base, quote, ...props}) => {
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
        }
    ];

    return <TradeOrdersTable {...props} emptyTag="emptyUserOrders" tableHead={tableHead} rows={userOrders} />
};