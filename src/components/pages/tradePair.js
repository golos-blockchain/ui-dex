import React, {useEffect} from "react";
import {useParams} from "react-router";
import {Card, Col, FlexBox, Row} from "../helpers/global";
import {TabsWrapper} from "../helpers/tabs";
import {LoadData, translateStr, useClassSetter} from "../../utils";
import {trade} from "../routing/path";
import {PairDisplay, PairParams, PairsList, TradeBuyForm, TradeUserOrders, TradeSellForm} from "../helpers/pages/trade";
import {ApiRequest} from "../../utils/requests";
import {lastTradeToRate} from "../../utils/dataHandlers";
import {getUserData} from "../../redux/actions/userData";

const getPairData = async (base, quote) => {
    const userName = getUserData().name;
    const apiRequest = new ApiRequest();
    const pair = [base, quote];

    const ticker = await apiRequest.getTicker(pair);
    const lastTrades = await apiRequest.getLastTrades(pair, 100);
    const rate = lastTradeToRate(base)(lastTrades);
    const orderBook = await apiRequest.getOrderBook(pair);
    // const userHistory = await apiRequest.getUserOrdersByName(getUserData().name).then(console.log);
    console.log(orderBook);
    return {ticker, rate, orderBook};
};

export const TradePair = () => {
    const {pair} = useParams();
    const [base, quote] = pair.split("_");
    const [baseClass, setClass] = useClassSetter("trade-pair");

    const [data, isLoading, reloadData, reloadPage] = LoadData(() => getPairData(base, quote));

    useEffect(() => {
        if(isLoading) return;
        reloadPage();
    }, [pair]);

    if(isLoading) return "Loading";

    const i18n = translateStr("trade");
    const tradeTabs = ["buy", "sell"].map(el => ({content: i18n(el)}));
    const ordersTabs = ["openOrders", "myOrders", "history"].map(el => ({content: i18n(el)}));

    return(
        <Row className={baseClass}>
            <Col md={9}>
                <Row>
                    <Col xl={2} lg={3}>
                        <Card py={.8} px={2} >
                            <PairDisplay
                                base={base}
                                quote={quote}
                                rate={data.rate}
                                baseClass={baseClass}
                            />
                        </Card>
                    </Col>
                    <Col xl={10} lg={9}>
                        <Card py={1.3} px={4.6}>
                            <PairParams base={base} quote={quote} ticker={data.ticker} />
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card mb={1}>
                            <PairsList />
                        </Card>
                        <Card>
                            <TabsWrapper headingList={tradeTabs}>
                                <TradeBuyForm base={base} quote={quote} orderBook={data.orderBook} />
                                <TradeSellForm base={base} quote={quote} orderBook={data.orderBook} />
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
                                <div>asdasdasd</div>
                                <TradeUserOrders userOrders={data.userOrders} />
                                <div>dsadsadsa</div>
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