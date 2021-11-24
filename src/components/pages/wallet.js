import React, {useState} from "react";
import {Card, BodyBold, Body, Box, Col, FlexBox, H1, Row} from "../helpers/global";
import {ViewChange} from "../helpers/pages/cabinet";
import {TabsWrapper} from "../helpers/tabs";
import {connectUserData} from "../../redux/actions/userData";
import {connect} from "react-redux";
import {mixDataToBalance} from "../../utils/dataHandlers";
import {Table} from "../helpers/table";

const WalletCardDisplay = ({ balances }) => {
    return(
        <Row>
            {balances.map((balance, id) => {
                const IC = balance.icon;
                return (
                    <Col key={id} sm={6}>
                        <Card py={2} pr={1.1} pl={3}>
                            <FlexBox>
                                {IC && (
                                    <Box mr={2}>
                                        <IC width="5rem" height="5rem" />
                                    </Box>
                                )}
                                <div>
                                    <BodyBold text={balance.fullName} />
                                    <H1 text={`${balance.amount} ${balance.symbol}`} />
                                    <BodyBold text="$ 223 111,41" color="font-secondary" />
                                </div>
                            </FlexBox>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
};

const WalletTableDisplay = ({ balances }) => {
    const tableHead = [
        {
            key: 'fullName',
            translateTag: 'currency',
            handleItem: (fullName, row) => {
                const IC = row.icon;
                return (
                    <FlexBox>
                        {IC && (
                            <Box mr={3.8}>
                                <row.icon width="3.2rem" height="3.2rem" />
                            </Box>
                        )}
                        <Body text={fullName} />
                    </FlexBox>
                )
            },
            className: 'fit-content'
        },
        {
            key: 'amount',
            translateTag: 'balance',
            handleItem: (item, row) => <BodyBold text={`${item} ${row.symbol}`} />,
            className: 'fit-content',
            isSortable: true
        },
        {
            key: 'amountUsdt',
            translateTag: 'balanceUsd',
            handleItem: (item) => <Body text={item} color="font-secondary" />,
            className: 'align-right',
            isSortable: true
        }
    ];

    return(
        <Card>
            <Table tableHead={tableHead} rows={balances} />
        </Card>
    )
};


const Display = (props) => {
    const rawBalances = props.userData.balances;
    const balances = mixDataToBalance(rawBalances);

    const cardViewState = useState(false);
    const [isCardView] = cardViewState;

    const opsTabs = [{text: "Перевод"}, {text: "Пополнение"}, {text: "Вывод"}];

    return(
        <Row>
            <Col lg={7}>
                <Card pt={1.3} pr={1.5} pb={1} pl={2.4}>
                    <FlexBox justify="space-between">
                        <div>
                            <Body text="Общий баланс" color="font-secondary" />
                            <H1 text="$ 7718.31" color="brand" />
                        </div>
                        <ViewChange cardViewState={cardViewState} />
                    </FlexBox>
                </Card>
                <Box mt={1.5}>
                    {isCardView ? <WalletCardDisplay balances={balances} /> : <WalletTableDisplay balances={balances} />}
                </Box>
            </Col>
            <Col lg={5}>
                <Card py={2.5} px={2}>
                    <TabsWrapper headingList={opsTabs}>
                        <BodyBold text="Перевод" />
                        <BodyBold text="Пополнение" />
                        <BodyBold text="Вывод" />
                    </TabsWrapper>
                </Card>
            </Col>
        </Row>
    )
};

export const Wallet = connect(connectUserData)(Display);