import React from "react";

import {translateStr} from "../../utils";
import {TabsWrapper} from "../helpers/tabs";
import {userHistory} from "../routing";
import {orders, wallet} from "../routing/path";
import {Box, Col, Row, Span} from "../helpers/global";

import {
    DashboardBalances, DashboardBuyForm,
    DashboardCard,
    DashboardHistory,
    DashboardRates, DashboardSellForm, DashboardTransferForm,
    OpenOrders
} from "../helpers/pages/dashboard";

export const Dashboard = () => {
    const i18n = translateStr("dashboard");
    const opsTabsHeading = ["buy", "sell", "send"].map(el => ({content: i18n(el)}));

    const defaultCurrency = (
        <Span
            content={i18n("defaultCurrency")}
            additionalData={{ defaultCurrency: "GOLOS" }}
            color="brand"
        />
    );

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
                        <DashboardRates />
                    </DashboardCard>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <DashboardCard title="operations">
                        <Box mt={-.7}>
                            <TabsWrapper headingList={opsTabsHeading}>
                                <DashboardBuyForm />
                                <DashboardSellForm />
                                <DashboardTransferForm />
                            </TabsWrapper>
                        </Box>
                    </DashboardCard>
                </Col>
                <Col md={6}>
                    <DashboardCard title="history" linkContent="more" link={userHistory.link}>
                        <DashboardHistory />
                    </DashboardCard>
                </Col>
            </Row>
            <DashboardCard title="orders" linkContent="more" link={orders.link}>
                <OpenOrders />
            </DashboardCard>
        </div>
    )
};