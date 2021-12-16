import {Box, Metadata} from "../../global";
import {filterOrdersList, OrdersFilter, Table, useOrdersFiltersState} from "../../table";
import {Fragment} from "react";
import React from "react";
import {clsx} from "../../../../utils";

export const TradeOrdersTable = ({tableHead, rows: rawList, className, reloadData, maxHeight}) => {
    const filtersState = useOrdersFiltersState();
    const rows = filterOrdersList(rawList, filtersState[0]);

    return rawList.length
        ? (
            <Fragment>
                <Box mb={2}>
                    <OrdersFilter filtersState={filtersState} />
                </Box>
                {rows.length
                    ? (
                        <Table
                            defaultSortKey="timestamp"
                            tableHead={tableHead}
                            rows={rows}
                            reloadData={reloadData}
                            itemComponent={Metadata}
                            className={className}
                            maxHeight={maxHeight}
                            disableDivider
                        />
                    ) : "No orders"
                }
            </Fragment>
        )
        : "No orders";
};