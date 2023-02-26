import {amountToObject} from "./handleAssets";
import {Body, BodyBold, Box, FlexBox} from "../../components/helpers/global";
import {
    ArrowIcon,
    HistoryDeleteIcon,
    HistoryFillIcon,
    HistoryPlusIcon,
    HistoryReceiveIcon,
    HistorySendIcon
} from "../../svg";
import {getUserData} from "../../redux/actions/userData";
import React from "react";

const highlightText = (text) => <span className="clr--brand">{text}</span>;
const formOrderSumm = (sell, buy) => {
    const sellObj = amountToObject(sell);
    const buyObj = amountToObject(buy);
    return(
        <FlexBox align="center">
            <Box>
                <BodyBold text={sellObj.amount} color="error" />
                <Body text={` ${sellObj.symbol}`} />
            </Box>
            <Box h={2} mx={.5}>
                <ArrowIcon />
            </Box>
            <Box>
                <BodyBold text={buyObj.amount} color="success" />
                <Body text={` ${buyObj.symbol}`} />
            </Box>
        </FlexBox>
    )
};

const icons = {
    receive: <HistoryReceiveIcon />,
    send: <HistorySendIcon />,
    limit_order_create: <HistoryPlusIcon />,
    buy: <HistoryFillIcon />,
    sell: <HistoryFillIcon />,
    limit_order_cancel: <HistoryDeleteIcon />,
    limit_order_cancel_ex: <HistoryDeleteIcon />
};

const opHandlers = {
    transfer: ({ amount: amountRaw, from, memo, to }) => {
        const userIsSender = from === getUserData().name;

        const change = userIsSender ? "-" : "+";
        const opType = userIsSender ? "send" : "receive";

        const {amount, symbol} = amountToObject(amountRaw);
        const summ = <span><span className={`clr--${userIsSender ? "error" : "success"} bold`}>{change}{amount}</span> <span className="clr--font-primary">{symbol}</span></span>;
        const descData = {
            amount: highlightText(amountRaw),
            from: highlightText(`@${from}`),
            to: highlightText(`@${to}`),
            memo: highlightText(memo)
        };

        return { opType, summ, descData };
    },
    limit_order_create: ({ owner, orderid, amount_to_sell, min_to_receive }) => {

        const summ = formOrderSumm(amount_to_sell, min_to_receive);
        const descData = {
            owner: highlightText(`@${owner}`),
            orderid: highlightText(`#${orderid}`),
            min_to_receive: highlightText(min_to_receive),
            amount_to_sell: highlightText(amount_to_sell)
        };

        return { summ, descData };
    },
    limit_order_cancel: ({ owner, orderid }) => {

        const summ = <Body content="historyTable.empty" color="disabled" />;
        const descData = {
            owner: highlightText(`@${owner}`),
            orderid: highlightText(`#${orderid}`)
        };

        return { summ, descData };
    },
    limit_order_cancel_ex: ({ owner, orderid }) => {

        const summ = <Body content="historyTable.empty" color="disabled" />;
        const descData = {
            owner: highlightText(`@${owner}`),
            orderid: highlightText(`#${orderid}`)
        };

        return { summ, descData };
    },
    fill_order: ({ current_owner, open_owner, current_orderid, open_orderid, current_pays, open_pays, }) => {
        const userIsBuyer = open_owner === getUserData().name;

        const opType = userIsBuyer ? "buy" : "sell";

        const summ = userIsBuyer ? formOrderSumm(open_pays, current_pays) : formOrderSumm(current_pays, open_pays);

        const additionalData = userIsBuyer
            ? {
                open_owner: highlightText(`@${open_owner}`),
                open_orderid: highlightText(`#${open_orderid}`)
            } : {
                current_owner: highlightText(`@${current_owner}`),
                current_orderid: highlightText(`#${current_orderid}`)
            };

        const descData = {
            ...additionalData,
            current_pays: highlightText(current_pays),
            open_pays: highlightText(open_pays)
        };

        return { opType, summ, descData };
    }
};

export const handleUserHistory = (res) => {
    const actualTypes = [
        "transfer",
        "limit_order_create",
        "limit_order_cancel",
        "limit_order_cancel_ex",
        "fill_order"
    ];

    return res.filter(el => {
        const [type] = el[1].op;
        return actualTypes.includes(type);
    }).map(el => {
        const timestamp = el[1].timestamp;
        const [type, operation] = el[1].op;
        const fn = opHandlers[type];

        let opType = type;
        let summ, descData, icon;

        if(fn){
            const data = fn(operation);

            opType = data.opType || type;
            icon = icons[opType];
            summ = data.summ;
            descData = data.descData;
        }

        return { icon, timestamp, type: opType, summ, descData }
    }).reverse();
};