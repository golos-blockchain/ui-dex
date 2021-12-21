import React, {Fragment} from "react";
import {connectUserData} from "../../../../redux/actions/userData";
import {connect} from "react-redux";
import {Body, Box, Col, HeadingBold, Metadata, MetadataBold, Row} from "../../global";
import {mixDataToBalance} from "../../../../utils/dataHandlers";
import {useClassSetter} from "../../../../utils";

const BalanceDisplay = ({img, fullName, amount, symbol}) => {
    const [baseClass, setClass] = useClassSetter("dashboard-balance");
    return(
        <div className={baseClass}>
            <div className={setClass("image")}>
                <img src={img} alt={fullName} />
            </div>
            <MetadataBold text={fullName} className={setClass("name")} />
            <div className={setClass("amount")}>
                <Metadata text={amount} />
                <Metadata text={symbol} color="font-secondary" />
            </div>
        </div>
    );
};

const Display = props => {
    const {totalBalance, balances: rawBalances} = props.userData;
    const balances = mixDataToBalance(rawBalances).slice(0, 4);

    return(
        <Fragment>
            <Box mt={-.5} mb={1.5}>
                <Body content="wallet.totalBalance" color="font-secondary" />
                <HeadingBold text={`${totalBalance} GOLOS`} color="brand" />
            </Box>
            <Row>
                {balances.map((el, id) => (
                    <Col key={id} lg={3} md={12} sm={3} xs={6}>
                        <BalanceDisplay {...el} />
                    </Col>
                ))}
            </Row>
        </Fragment>
    )
};

export const DashboardBalances = connect(connectUserData)(Display);