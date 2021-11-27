import React from "react";
import {ApiRequest} from "../../utils/requests";
import {getUserData} from "../../redux/actions/userData";
import {balanceToObject, handleUserOrders} from "../../utils/dataHandlers";
import {LoadData} from "../../utils";
import {
    ArrowIcon,
    HistoryDeleteIcon,
    HistoryFillIcon,
    HistoryPlusIcon,
    HistoryReceiveIcon,
    HistorySendIcon
} from "../../svg";
import {Body, BodyBold, Box, Card, FlexBox, Metadata} from "../helpers/global";
import {Table} from "../helpers/table";

const checkUniqueTypes = (res) => {
    let uniqueTypes = res.reduce((acc, el) => {
        const [type] = el[1].op;
        if(!acc.includes(type)) acc.push(type);
        return acc;
    }, []);

    console.log(uniqueTypes);
};

// 0: "claim"
// 1: "fill_vesting_withdraw"
// 2: "transfer_to_vesting"
// 3: "comment_mention"
// 4: "worker_request_vote"
// 5: "vote"
// 6: "curation_reward"
// 7: "custom_json"
// 8: "transfer"
// 9: "donate"
// 10: "comment"
// 11: "comment_options"
// 12: "withdraw_vesting"
// 13: "author_reward"
// 14: "total_comment_reward"
// 15: "limit_order_create"
// 16: "limit_order_cancel"
// 17: "convert"
// 18: "fill_convert_request"
// 19: "fill_order"
// 20: "transfer_to_savings"
// 21: "account_reputation"

const highlightText = (text) => <span className="clr--brand">{text}</span>;
const formOrderSumm = (sell, buy) => {
    const sellObj = balanceToObject(sell);
    const buyObj = balanceToObject(buy);
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
};

const opHandlers = {
    transfer: ({ amount: amountRaw, from, memo, to }) => {
        const userIsSender = from === getUserData().name;

        const change = userIsSender ? "-" : "+";
        const opType = userIsSender ? "send" : "receive";

        const {amount, symbol} = balanceToObject(amountRaw);
        const summ = <span><span className={`clr--${userIsSender ? "error" : "success"} bold`}>{change}{amount}</span> {symbol}</span>;
        const descData = {
            amount: highlightText(amountRaw),
            from: highlightText(`@${from}`),
            to: highlightText(`@${to}`),
            memo
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
    fill_order: ({ current_owner, open_owner, current_orderid, open_orderid, current_pays, open_pays, }) => {
        const userIsBuyer = open_owner === getUserData().name;

        // console.log(current_owner, open_owner, current_orderid, open_orderid, current_pays, open_pays);

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

        console.log(descData);

        return { opType, summ, descData };
    }
};

const handleUserHistory = (res) => {
    // checkUniqueTypes(res);

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

        console.log(type, operation);

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