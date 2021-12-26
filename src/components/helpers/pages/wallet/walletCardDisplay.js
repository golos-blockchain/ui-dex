import React from "react";
import {Body, Card, Col, FlexBox, Heading, Row} from "../../global";
import {useClassSetter} from "../../../../utils";

export const WalletCardDisplay = ({ balances }) => {
    const [baseClass, setClass] = useClassSetter("balances-card");
    return(
        <Row>
            {balances.map((balance, id) => (
                <Col key={id} sm={6}>
                    <Card className={baseClass}>
                        <FlexBox>
                            {balance.img && (
                                <div className={setClass("image-wrapper")}>
                                    <img src={balance.img} alt={balance.fullName} />
                                </div>
                            )}
                            <div className={setClass("text-wrapper")}>
                                <Body text={balance.fullName} />
                                <Heading text={`${balance.amount} ${balance.symbol}`} />
                                <Body text={`${balance.amountInGolos} GOLOS`} color="font-secondary" />
                            </div>
                        </FlexBox>
                    </Card>
                </Col>
            ))}
        </Row>
    )
};