import React from "react";

import {LoadData, translateStr} from "../../utils";
import {TabsWrapper} from "../helpers/tabs";
import {userHistory} from "../routing";
import {orders, wallet} from "../routing/path";
import {Box, Col, Row, Span} from "../helpers/global";

import {
    DashboardBalances, DashboardBuyForm,
    DashboardCard,
    DashboardHistory,
    DashboardRates,
    OpenOrders
} from "../helpers/pages/dashboard";
import {fetchUserData, getAllRates, handleUserHistory, handleUserOrders} from "../../utils/dataHandlers";
import {ApiRequest} from "../../utils/requests";
import {getUserData, updateUserData} from "../../redux/actions/userData";
import {TransferForm} from "../helpers/pages/cabinet";
import {PageLoader} from "../layout";

const loadDashboardData = async () => {
    const name = getUserData().name;
    const rates = await getAllRates("GOLOS", 3);
    const history = await new ApiRequest().getUserHistoryByName(name).then(handleUserHistory);
    const ordersList = await new ApiRequest().getUserOrdersByName(getUserData().name).then(handleUserOrders);

    return { rates, history, ordersList };
};

export const Dashboard = () => {
    const [data, isLoading, reloadData] = LoadData(loadDashboardData, 500);

    if(isLoading) return <PageLoader />;

    const {rates, history, ordersList} = data;

    const i18n = translateStr("dashboard");
    const opsTabsHeading = ["buySell", "send"].map(el => ({content: i18n(el)}));

    const defaultCurrency = (
        <Span
            content={i18n("defaultCurrency")}
            additionalData={{ defaultCurrency: "GOLOS" }}
            color="brand"
        />
    );

    const onUpdate = async () => {
        await fetchUserData(getUserData().name).then(updateUserData).then(reloadData);
    };

    return(
        <div>
            <Row>
                <Col md={5}>
                    <DashboardCard title="balance" linkContent="toWallet" link={wallet.link}>
                        <DashboardBalances />
                    </DashboardCard>
                </Col>
                <Col md={7}>
                    <DashboardCard title="currencies" additionalData={{defaultCurrency}}>
                        <DashboardRates rates={rates} />
                    </DashboardCard>
                </Col>
            </Row>
            <Row>
                <Col xl={6}>
                    <DashboardCard title="operations">
                        <Box mt={-.7}>
                            <TabsWrapper headingList={opsTabsHeading}>
                                <DashboardBuyForm onUpdate={onUpdate} />
                                <TransferForm onUpdate={onUpdate} />
                            </TabsWrapper>
                        </Box>
                    </DashboardCard>
                </Col>
                <Col xl={6}>
                    <DashboardCard title="history" linkContent="more" link={userHistory.link}>
                        <DashboardHistory list={history} />
                    </DashboardCard>
                </Col>
            </Row>
            <DashboardCard title="orders" linkContent="more" link={orders.link}>
                <OpenOrders list={ordersList} onUpdate={onUpdate} />
            </DashboardCard>
        </div>
    )
};