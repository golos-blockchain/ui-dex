import React, {useState} from "react";
import {connect} from "react-redux";
import {Card, Body, Box, Col, FlexBox, Row, HeadingBold} from "../helpers/global";
import {ViewChange} from "../helpers/pages/cabinet";
import {TabsWrapper} from "../helpers/tabs";
import {connectUserData} from "../../redux/actions/userData";
import {mixDataToBalance} from "../../utils/dataHandlers";
import {
    WalletCardDisplay,
    WalletDepositTab,
    WalletTableDisplay,
    WalletTransferTab,
    WalletWithdrawTab
} from "../helpers/pages/wallet";
import {translateStr} from "../../utils";

const Display = (props) => {
    const i18n = translateStr("wallet");

    const {totalBalance, balances: rawBalances} = props.userData;
    const balances = mixDataToBalance(rawBalances);

    const cardViewState = useState(false);
    const [isCardView] = cardViewState;

    const opsTabs = ["trx", "deposit", "withdraw"].map(el => ({content: i18n(el, "title")}));

    return(
        <Row>
            <Col xl={7}>
                <Card pt={1.3} pr={1.5} pb={1} pl={2.4}>
                    <FlexBox justify="space-between">
                        <div>
                            <Body content="wallet.totalBalance" color="font-secondary" />
                            <HeadingBold text={`${totalBalance} GOLOS`} color="brand" />
                        </div>
                        <ViewChange cardViewState={cardViewState} />
                    </FlexBox>
                </Card>
                <Box mt={2}>
                    {isCardView ? <WalletCardDisplay balances={balances} /> : <WalletTableDisplay balances={balances} />}
                </Box>
            </Col>
            <Col xl={5}>
                <Card py={2.5} px={2}>
                    <TabsWrapper headingList={opsTabs}>
                        <WalletTransferTab />
                        <WalletDepositTab />
                        <WalletWithdrawTab />
                    </TabsWrapper>
                </Card>
            </Col>
        </Row>
    )
};

export const Wallet = connect(connectUserData)(Display);