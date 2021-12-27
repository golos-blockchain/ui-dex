import React, {Fragment, useState} from "react";
import {Box, FlexBox, Heading, Metadata, MetadataBold} from "../../global";
import {Table} from "../../table";
import {clsx, toFixedNum, useClassSetter} from "../../../../utils";
import {getAssetParam} from "../../../../redux/actions/assets";
import {BookAllIcon, BookBuyIcon, BookSellIcon, CaretIcon} from "../../../../svg";
import {Select} from "../../dropdown";

const OrderBookTable = ({base, quote, precision, list: rawList, isAsks, disableHeading}) => {
    let total = 0;

    const list = rawList.reduce((acc, next) => {
        total += next.quote;

        const lastItemIndex = acc.length - 1;
        const lastItem = acc[lastItemIndex] || {};
        const nextFixedPrice = toFixedNum(next.price, precision);

        if(lastItem.price === nextFixedPrice){
            acc[lastItemIndex] = {
                price: nextFixedPrice,
                base: toFixedNum(lastItem.base + next.base, precision),
                quote: toFixedNum(lastItem.quote + next.quote, precision)
            }
        } else {
            acc.push({ ...next, price: nextFixedPrice });
        }



        return acc;
    }, []);

    const [baseClass, setClass] = useClassSetter("order-book");
    const priceColor = isAsks ? "error" : "success";

    const tableHead = [
        {
            key: 'price',
            translateTag: 'priceWithAsset',
            handleItem: item => <MetadataBold text={item} color={priceColor} />,
            translateParams: { asset: quote },
        },
        {
            key: 'base',
            translateTag: 'amountWithAsset',
            translateParams: { asset: base },
        },
        {
            key: 'quote',
            translateTag: 'total',
            className: 'align-right',
        }
    ];

    return(
        <div className={baseClass}>
            <div className={setClass("table-wrapper")}>
                <Table
                    tableHead={tableHead}
                    rows={list}
                    itemComponent={Metadata}
                    disableHead={disableHeading}
                />
            </div>
            <div className={setClass("lines-wrapper")}>
                {list.map((el, id) => {
                    const classNames = clsx(setClass("line"), `bg--${priceColor}`);
                    const top = disableHeading ? id  * 2.6 + "rem" : id * 2.6 + 2.4 + "rem";
                    const width = el.quote / total * 100;
                    const style = { width: width + "%", top };
                    return (
                        <div key={id} className={classNames} style={style} />
                    )
                })}
            </div>
        </div>
    )
};

const LastTradeDisplay = ({base, quote, ordersHistory}) => {
    const lastOrder = ordersHistory[0]
        ? ordersHistory[0]
        : { quoteAmount : 0, baseAmount: 1 };

    const {quoteAmount, baseAmount, type} = lastOrder;
    const precision = getAssetParam(quote).precision;
    const lastPrice = toFixedNum(quoteAmount / baseAmount, precision);
    const isBuy = type === "buy";

    return (
        <FlexBox className={clsx("book-price", isBuy && "is-buy")} my={1}>
            <Heading text={lastPrice} color={isBuy ? "success" : "error"} />
            <CaretIcon />
        </FlexBox>
    )
};

const OrderBookFilters = ({filtersState}) => {
    const list = ["all", "bids", "asks"];
    const icons = { all: BookAllIcon, bids: BookSellIcon, asks: BookBuyIcon };
    const [selectedFilter, setFilter] = filtersState;

    return(
        <FlexBox>
            {list.map(key => {
                const IC = icons[key];
                const className = clsx("book-filter", key === selectedFilter && "active");
                return (
                    <button
                        key={key}
                        className={className}
                        onClick={() => setFilter(key)}
                    >
                        <IC />
                    </button>
                )
            })}
        </FlexBox>
    )
};

export const TradeOrderBook = ({base, quote, ordersHistory, orderBook}) => {
    const filtersState = useState("all");
    const activeFilter = filtersState[0];

    const precisionsList = ["0.00001", "0.0001", "0.001", "0.01", "0.1"];
    const [selectedPrecision, setPrecision] = useState("0");

    const precision = precisionsList[selectedPrecision].split(".")[1].length;

    const asks = [...orderBook.asks].reverse();
    const bids = orderBook.bids;

    const defaultProps = {base, quote, precision};

    const blancTable = <OrderBookTable {...defaultProps} list={[]} />;
    const asksTable = <OrderBookTable {...defaultProps} list={asks} isAsks disableHeading={activeFilter !== "all"} />;
    const lastTrade = <LastTradeDisplay {...defaultProps} ordersHistory={ordersHistory} />;
    const bidsTable = <OrderBookTable {...defaultProps} list={bids} disableHeading />;

    const contentDisplay = {
        all: (
            <Fragment>
                {asksTable}
                {lastTrade}
                {bidsTable}
            </Fragment>
        ),
        bids: (
            <Fragment>
                {blancTable}
                {lastTrade}
                {bidsTable}
            </Fragment>
        ),
        asks: (
            <Fragment>
                {blancTable}
                {lastTrade}
                {asksTable}
            </Fragment>
        )
    };

    return(
        <Fragment>
            <FlexBox mt={.7} justify="space-between" wrap>
                <Box mb={2}>
                    <OrderBookFilters filtersState={filtersState} />
                </Box>
                <Box w={12} mb={2}>
                    <Select
                        list={precisionsList.map((text, id) => ({text, id: String(id)}))}
                        value={selectedPrecision}
                        onChange={({value}) => setPrecision(value)}
                        hideLabel
                    />
                </Box>
            </FlexBox>
            <Box className="custom-scroll" mr={-2}>
                <Box>
                    {contentDisplay[filtersState[0]]}
                </Box>
            </Box>
        </Fragment>
    )
};