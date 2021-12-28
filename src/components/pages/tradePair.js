import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router";
import {BodyBold, Box, Card, Col, FlexBox, Heading, Row} from "../helpers/global";
import {TabsWrapper} from "../helpers/tabs";
import {LoadData, translateStr, useClassSetter} from "../../utils";
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
    fetchUserData, handleOpenOrders,
    handleOrderBook,
    handleTradeHistory, handleTradingViewData,
    handleUserOrdersByPair,
    lastTradeToRate
} from "../../utils/dataHandlers";
import {connectUserData, getUserData, updateUserData} from "../../redux/actions/userData";
import {generateModal} from "../../redux/actions";
import {LoginModal} from "../helpers/pages/cabinet";
import {BrandTextBtn, TransparentBtn} from "../helpers/btn";
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

    const openOrders = userName
        ? await apiRequest.getUserOpenOrdersByName(userName, pair).then(handleOpenOrders(pair))
        : [];
    const userOrders = userName
        ? await apiRequest.getUserOrdersByName(userName).then(handleUserOrdersByPair(pair))
        : [];

    const tradingViewData = handleTradingViewData(pair);

    return { ticker, rate, orderBook, userOrders, ordersHistory, tradingViewData, openOrders };
};

const DesktopDisplay = (props) => {
    const { pairDisplay, pairParams, pairsList, ordersCreationTabs, chart, historyTabs, orderBook } = props.components;

    return(
        <Row className="trade-pair">
            <Col md={9}>
                <Row>
                    <Col xl={2} lg={3}>
                        <Card py={.8} px={2}>{pairDisplay}</Card>
                    </Col>
                    <Col xl={10} lg={9}>
                        <Card p="0">{pairParams}</Card>
                    </Col>
                    <Col md={4}>
                        <Card mb={1}>{pairsList}</Card>
                        <Card>{ordersCreationTabs}</Card>
                    </Col>
                    <Col md={8}>
                        <Card h={50} mb={1} p="0">{chart}</Card>
                        <Card>{historyTabs}</Card>
                    </Col>
                </Row>
            </Col>
            <Col md={3}>
                <Card>{orderBook}</Card>
            </Col>
        </Row>
    )
};

const PairModal = ({pairsList}) => {
    return(
        <Fragment>
            <Heading content="trade.changePair" />
            <Box mt={2}>
                {pairsList}
            </Box>
        </Fragment>
    )
};

const MobileDisplay = (props) => {
    const { pairDisplay, pairParams, pairsList, ordersCreationTabs, chart, historyTabs, orderBook } = props.components;

    return(
        <div className="trade-pair">
            <Box>
                <Card py={.8} px={2}>
                    <FlexBox justify="space-between">
                        {pairDisplay}
                        <BrandTextBtn content="trade.changePair" onClick={generateModal(<PairModal pairsList={pairsList} />)} />
                    </FlexBox>
                </Card>
            </Box>
            <Box mt={1}>
                <Card p="0">{pairParams}</Card>
            </Box>
            <Box mt={1}>
                <Card h={50} mb={1} p="0">{chart}</Card>
            </Box>
            <Box mt={1}>
                <Card>{orderBook}</Card>
            </Box>
            <Box mt={1}>
                <Card>{ordersCreationTabs}</Card>
            </Box>
            <Box mt={1}>
                <Card>{historyTabs}</Card>
            </Box>
        </div>
    )
};

const LayoutWrapper = props => {
    const [isMobile, setMobileState] = useState(window.innerWidth <= 900);

    useEffect(() => {
        const resizeListener = () => {
            const width = window.innerWidth;

            if(width <= 900){
                setMobileState(true);
            } else if(width > 900){
                setMobileState(false);
            }
        };

        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isMobile ? <MobileDisplay {...props} /> : <DesktopDisplay {...props} />
};

const Display = ({userData}) => {
    const {pair} = useParams();
    const [base, quote] = pair.split("_");
    const [baseClass] = useClassSetter("trade-pair");

    const [data, isLoading, reloadData, reloadPage] = LoadData(() => getPairData(base, quote), 500);

    useEffect(() => {
        if(isLoading) return;
        reloadPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pair]);
    useEffect(() => {
        if(isLoading) return;
        reloadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const pairDisplay = <PairDisplay {...defaultProps} rate={data.rate} />;
    const pairParams = <PairParams {...defaultProps} ticker={data.ticker} />;
    const pairsList = <PairsList {...defaultProps} />;
    const ordersCreationTabs = !!userData.name
        ? (
            <TabsWrapper headingList={tradeTabs}>
                <TradeBuyForm {...defaultFormsProps} />
                <TradeSellForm {...defaultFormsProps} />
            </TabsWrapper>
        ) : loginBtn;
    const chart = <ChartPage {...defaultProps} tradingViewData={data.tradingViewData} />;
    const historyTabs = (
        <TabsWrapper defaultActiveId={userData.name ? 0 : 2} headingList={ordersTabs}>
            {!!userData.name
                ? (
                    <TradeOpenOrders {...defaultHistoryProps} userOrders={data.openOrders} reloadData={reloadDataWithBalance} />
                ) : loginBtn
            }
            {!!userData.name
                ? (
                    <TradeUserOrders {...defaultHistoryProps} userOrders={data.userOrders} />
                ) : loginBtn
            }
            <TradeHistory {...defaultHistoryProps} ordersHistory={data.ordersHistory} />
        </TabsWrapper>
    );
    const orderBook = <TradeOrderBook {...defaultProps} ordersHistory={data.ordersHistory} orderBook={data.orderBook} />;

    const components = { pairDisplay, pairParams, pairsList, ordersCreationTabs, chart, historyTabs, orderBook };

    return <LayoutWrapper components={components} />
};

export const TradePair = connect(connectUserData)(Display);