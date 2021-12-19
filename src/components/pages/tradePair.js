import React, {useEffect} from "react";
import {useLocation, useParams} from "react-router";
import ScrollContainer from 'react-indiana-drag-scroll'
import {BodyBold, Box, Card, Col, FlexBox, Row} from "../helpers/global";
import {TabsWrapper} from "../helpers/tabs";
import {LoadData, toFixedNum, translateStr, useClassSetter} from "../../utils";
import {trade} from "../routing/path";
import {
    PairDisplay,
    PairParams,
    PairsList,
    TradeBuyForm,
    TradeUserOrders,
    TradeSellForm,
    TradeHistory, TradeOpenOrders, TradeOrderBook
} from "../helpers/pages/trade";
import {ApiRequest} from "../../utils/requests";
import {
    fetchUserData,
    handleOrderBook,
    handleTradeHistory, handleTradingViewData,
    handleUserOrdersByPair,
    lastTradeToRate
} from "../../utils/dataHandlers";
import {connectUserData, getUserData, updateUserData} from "../../redux/actions/userData";
import {generateModal} from "../../redux/actions";
import {LoginModal} from "../helpers/pages/cabinet";
import {TransparentBtn} from "../helpers/btn";
import {connect} from "react-redux";
import {ChartPage} from "../helpers/tradingView/chartBlock";
import {PageLoader} from "../layout";

const getPairData = async (base, quote) => {
    const userName = getUserData().name;
    const apiRequest = new ApiRequest();
    const pair = [base, quote];

    const ticker = await apiRequest.getTicker(pair);
    const lastTrades = await apiRequest.getLastTrades(pair, 100);

    const rate = lastTradeToRate(base)(lastTrades);
    const ordersHistory = handleTradeHistory(lastTrades, base);
    const orderBook = await apiRequest.getOrderBook(pair).then(handleOrderBook(pair));
    const userOrders = userName
        ? await apiRequest.getUserOrdersByName(userName).then(handleUserOrdersByPair(pair))
        : [];

    const tradingViewData = handleTradingViewData(pair);

    return { ticker, rate, orderBook, userOrders, ordersHistory, tradingViewData };
};

const Display = ({userData}) => {
    const {pair} = useParams();
    const [base, quote] = pair.split("_");
    const [baseClass] = useClassSetter("trade-pair");

    const [data, isLoading, reloadData, reloadPage] = LoadData(() => getPairData(base, quote), 500);

    useEffect(() => {
        if(isLoading) return;
        reloadPage();
    }, [pair]);
    useEffect(() => {
        if(isLoading) return;
        reloadData();
    }, [userData.name]);
    // useEffect(() => {
    //     const interval = setInterval(reloadData, 5000);
    //     return () => clearInterval(interval);
    // }, [pair]);

    if(isLoading) return <PageLoader />;

    const i18n = translateStr("trade");
    const tradeTabs = ["buy", "sell"].map(el => ({content: i18n(el)}));
    const ordersTabs = ["openOrders", "myOrders", "history"].map(el => ({content: i18n(el)}));

    const reloadDataWithBalance = async () => {
        await fetchUserData(getUserData().name).then(updateUserData);
        reloadData();
    };

    const defaultProps = {baseClass, base, quote};
    const defaultHistoryProps = { ...defaultProps, className: "trade-history", maxHeight: "40rem" };
    const defaultFormsProps = { ...defaultProps, orderBook: data.orderBook, reloadData: reloadDataWithBalance };

    const loginBtn = (
        <Box w="fit-content" mx="auto">
            <TransparentBtn onClick={generateModal(<LoginModal />)}>
                <BodyBold content={i18n("loginBtn")} color="brand" />
            </TransparentBtn>
        </Box>
    );

    return(
        <Row className={baseClass}>
            <Col md={9}>
                <Row>
                    <Col xl={2} lg={3}>
                        <Card py={.8} px={2} >
                            <PairDisplay {...defaultProps} rate={data.rate} />
                        </Card>
                    </Col>
                    <Col xl={10} lg={9}>
                        <Card py={1.3} px={4.6}>
                            <PairParams {...defaultProps} ticker={data.ticker} />
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card mb={1}>
                            <PairsList {...defaultProps} />
                        </Card>
                        <Card>
                            {!!userData.name
                                ? (
                                    <TabsWrapper headingList={tradeTabs}>
                                        <TradeBuyForm {...defaultFormsProps} />
                                        <TradeSellForm {...defaultFormsProps} />
                                    </TabsWrapper>
                                ) : loginBtn
                            }
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card h={50} mb={1} p="0">
                            <ChartPage {...defaultProps} tradingViewData={data.tradingViewData} />
                        </Card>
                        <Card>
                            <TabsWrapper defaultActiveId={userData.name ? 0 : 2} headingList={ordersTabs}>
                                {!!userData.name
                                    ? (
                                        <TradeOpenOrders {...defaultHistoryProps} userOrders={data.userOrders} reloadData={reloadDataWithBalance} />
                                    ) : loginBtn
                                }
                                {!!userData.name
                                    ? (
                                        <TradeUserOrders {...defaultHistoryProps} userOrders={data.userOrders} />
                                    ) : loginBtn
                                }
                                <TradeHistory {...defaultHistoryProps} ordersHistory={data.ordersHistory} />
                            </TabsWrapper>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col md={3}>
                <Card>
                    <TradeOrderBook {...defaultProps} ordersHistory={data.ordersHistory} orderBook={data.orderBook} />
                </Card>
            </Col>
        </Row>
    )
};

export const TradePair = connect(connectUserData)(Display);