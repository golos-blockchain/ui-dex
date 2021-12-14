import React from "react";
import {MetadataBold} from "../../global";
import {clsx} from "../../../../utils";
import {TradeOrdersTable} from "./tradeOrdersTable";

export const TradeHistory = ({ordersHistory, base, quote, ...props}) => {
    const tableHead = [
        {
            key: 'timestamp',
            translateTag: 'creationDate',
            handleItem: (item) => new Date(item).toLocaleString(),
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
            key: 'price',
            translateTag: 'priceWithAsset',
            translateParams: { asset: base },
        },
        {
            key: 'quoteAmount',
            translateTag: 'quote',
            translateParams: { quote },
        },
        {
            key: 'baseAmount',
            translateTag: 'base',
            translateParams: { base },
            className: 'align-right',
        }
    ];

    return ordersHistory.length
        ? <TradeOrdersTable {...props} tableHead={tableHead} rows={ordersHistory} />
        : "No items"
};