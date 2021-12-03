import React from "react";
import {clsx, LoadData, useClassSetter} from "../../../../utils";
import {getAllRates} from "../../../../utils/dataHandlers";
import {Body, Col, FlexBox, Metadata, Row, Subheading, SubheadingBold} from "../../global";

const RateDisplay = ({rate, rateChange = 0, img, fullName}) => {
    const [baseClass, setClass] = useClassSetter("dashboard-rate");

    const rateChangePrefix = rateChange === 0 ? "" : rateChange > 0 ? "+" : "-";
    const rateChangeColor = rateChange === 0 ? "font-secondary" : rateChange > 0 ? "success" : "error";
    const rateChangeText = `${rateChangePrefix}${rateChange}%`;

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

export const DashboardRates = () => {
    const [data, isLoading] = LoadData(getAllRates);

    return isLoading
        ? "Loading"
        : (
            <Row>
                {data.map((el, id) => (
                    <Col key={id} md={4}>
                        <RateDisplay {...el} />
                    </Col>
                ))}
            </Row>
        );
};