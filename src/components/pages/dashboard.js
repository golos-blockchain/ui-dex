import React from "react";
import {Box, Card, Col, FlexBox, H2, Metadata, Row} from "../helpers/global";
import {ApiRequest} from "../../utils/requests";
import {getUserData} from "../../redux/actions/userData";
import {handleUserHistory, handleUserOrders} from "../../utils/dataHandlers";
import {clsx, LoadData, translateStr, useClassSetter} from "../../utils";
import {OrdersTable} from "./orders";
import {TransparentTextBtn} from "../helpers/btn";
import {ArrowRightIcon} from "../../svg";
import {TabsWrapper} from "../helpers/tabs";
import {userHistory} from "../routing";

const OpenOrders = () => {
    const fn = () => new ApiRequest().getUserOrdersByName(getUserData().name).then(handleUserOrders);
    const [data, isLoading, reloadData] = LoadData(fn);

    if(isLoading) return "Loading";

    const rows = data.filter(el => el.percent !== 1 && !el.isCancelled);

    return <OrdersTable rows={rows} reloadData={reloadData} />;
};

const DashboardHistory = () => {
    const [baseClass, setClass] = useClassSetter("dashboard-history");
    const fn = () => new ApiRequest().getUserHistoryByName(getUserData().name).then(handleUserHistory);
    const [data, isLoading] = LoadData(fn);

    if(isLoading) return "Loading";

    console.log(data.slice(0, 20));

    return(
        <div className={clsx(baseClass, "custom-scroll")}>
            <div className={setClass("scroll-wrapper")}>
                {data.slice(0, 20).map((el, id) => (
                    <FlexBox key={id} className={setClass("item")} justify="space-between">
                        <FlexBox>
                            <div className={setClass("icon")}>
                                {el.icon}
                            </div>
                            <div className={setClass("info")}>
                                <Metadata content={`historyTable.${el.type}.title`} color="font-secondary" />
                                <div>{el.summ}</div>
                            </div>
                        </FlexBox>
                        <div className={setClass("date")}>
                            <Metadata content="tableHeading.dateAndTime" color="font-secondary" />
                            <div>{new Date(el.timestamp).toLocaleString()}</div>
                        </div>
                    </FlexBox>
                ))}
            </div>
        </div>
    )
}

export const Dashboard = () => {
    const i18n = translateStr("dashboard");
    const opsTabsHeading = ["buy", "sell", "send"].map(el => ({content: i18n(el)}));

    return(
        <div>
            <Row>
                <Col md={6}>
                    <Card pt={2.5}>
                        <Box mb={.8}>
                            <H2 content={i18n("operations")} />
                        </Box>
                        <TabsWrapper headingList={opsTabsHeading}>
                            <div>buy</div>
                            <div>sell</div>
                            <div>send</div>
                        </TabsWrapper>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card pt={2.5}>
                        <FlexBox justify="space-between">
                            <H2 content={i18n("history")} />
                            <TransparentTextBtn to={userHistory.link} content={i18n("more")} iconRight={ArrowRightIcon} />
                        </FlexBox>
                        <DashboardHistory />
                    </Card>
                </Col>
            </Row>
            <Card py={1.5} px={2}>
                <H2 content={i18n("orders")} />
                <Box mt={1.5}>
                    <OpenOrders />
                </Box>
            </Card>
        </div>
    )
};