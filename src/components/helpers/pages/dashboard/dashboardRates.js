import React from "react";
import {clsx, toFixedNum, useClassSetter} from "../../../../utils";
import {Body, Col, FlexBox, Metadata, Row, SubheadingBold} from "../../global";

const RateDisplay = ({rate, rateChange = 0, img, fullName}) => {
    const [baseClass, setClass] = useClassSetter("dashboard-rate");

    const rateChangeColor = rateChange === 0 ? "font-secondary" : rateChange > 0 ? "success" : "error";
    const rateChangeText = `${toFixedNum(rateChange, 0)}%`;

    return(
        <div className={clsx(baseClass, "bg--secondary")}>
            <div className={setClass("image")}>
                <img src={img} alt={fullName} />
            </div>
            <FlexBox className={setClass("rate")}>
                <SubheadingBold text={rate} className={setClass("amount")} />
            </FlexBox>
            <FlexBox className={setClass("additional-info")}>
                <Body text={fullName} />
                <Metadata text={rateChangeText} className={setClass("daily-change")} color={rateChangeColor} />
            </FlexBox>
        </div>
    );
};

export const DashboardRates = ({rates}) => (
    <Row>
        {rates.map((el, id) => (
            <Col key={id} lg={4} md={6} sm={4} xs={12}>
                <RateDisplay {...el} />
            </Col>
        ))}
    </Row>
);