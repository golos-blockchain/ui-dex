import React, {useEffect} from "react";
import {useParams} from "react-router";
import {Card, Col, FlexBox, Row} from "../helpers/global";
import {TabsWrapper} from "../helpers/tabs";
import {LoadData, translateStr, useClassSetter} from "../../utils";
import {trade} from "../routing/path";
import {
    PairDisplay,
    PairParams,
    PairsList,
    TradeBuyForm,
    TradeUserOrders,
    TradeSellForm,
    TradeHistory, TradeOpenOrders
} from "../helpers/pages/trade";
import {ApiRequest} from "../../utils/requests";
import {handleTradeHistory, handleUserOrdersByPair, lastTradeToRate} from "../../utils/dataHandlers";
import {getUserData} from "../../redux/actions/userData";

const getPairData = async (base, quote) => {
    const apiRequest = new ApiRequest();
    const pair = [base, quote];

    const ticker = await apiRequest.getTicker(pair);
    const lastTrades = await apiRequest.getLastTrades(pair, 100);

    const rate = lastTradeToRate(base)(lastTrades);
    const ordersHistory = handleTradeHistory(lastTrades, base);
    const orderBook = await apiRequest.getOrderBook(pair);
    const userOrders = await apiRequest.getUserOrdersByName(getUserData().name).then(handleUserOrdersByPair(pair));

    return {ticker, rate, orderBook, userOrders, ordersHistory};
};

export const TradePair = () => {
    const {pair} = useParams();
    const [base, quote] = pair.split("_");
    const [baseClass] = useClassSetter("trade-pair");

    const [data, isLoading, reloadData, reloadPage] = LoadData(() => getPairData(base, quote));

    useEffect(() => {
        if(isLoading) return;
        reloadPage();
    }, [pair]);

    if(isLoading) return "Loading";

    const i18n = translateStr("trade");
    const tradeTabs = ["buy", "sell"].map(el => ({content: i18n(el)}));
    const ordersTabs = ["openOrders", "myOrders", "history"].map(el => ({content: i18n(el)}));

    const defaultProps = {baseClass, base, quote};
    const defaultHistoryProps = { ...defaultProps, className: "trade-history", maxHeight: "40rem" };
    const defaultFormsProps = { ...defaultProps, orderBook: data.orderBook, reloadData };

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
                            <PairsList />
                        </Card>
                        <Card>
                            <TabsWrapper headingList={tradeTabs}>
                                <TradeBuyForm {...defaultFormsProps} />
                                <TradeSellForm {...defaultFormsProps} />
                            </TabsWrapper>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card h={38.3} mb={1} p={0}>
                            <FlexBox h="100%" justify="center" align="center">
                                ЗДЕСЬ БУДЕТ ТРЭЙДИНГ ВЬЮ!
                            </FlexBox>
                        </Card>
                        <Card>
                            <TabsWrapper headingList={ordersTabs}>
                                <TradeOpenOrders {...defaultHistoryProps} userOrders={data.userOrders} reloadData={reloadData} />
                                <TradeUserOrders {...defaultHistoryProps} userOrders={data.userOrders} />
                                <TradeHistory {...defaultHistoryProps} ordersHistory={data.ordersHistory} />
                            </TabsWrapper>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col md={3}>
                <Card>

                </Card>
            </Col>
        </Row>
    )
}