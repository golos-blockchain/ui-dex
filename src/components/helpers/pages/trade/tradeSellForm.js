import {getUserData} from "../../../../redux/actions/userData";
import {getAssetsList} from "../../../../redux/actions/assets";
import {Form, NumberInput, Range} from "../../form/helpers";
import {tradeSellSchema} from "../../form/validation";
import {Fragment} from "react";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {i18nGlobal, toFixedNum} from "../../../../utils";
import {RedTextBtn} from "../../btn";
import React from "react";
import {generatePromiseModal} from "../../../../redux/actions";
import {TradeSellConfirm} from "../../confirmModals";

export const TradeSellForm = ({base, quote, orderBook}) => {
    const bestPrice = toFixedNum(orderBook.bids[0].price);

    const userBalance = getUserData().balances[base].amount;

    const baseAssetId = getAssetsList().find(asset => asset.symbol === base).id;
    const {id: quoteAssetId, fee_percent} = getAssetsList().find(asset => asset.symbol === quote);

    const toPrecision = (num) => String(toFixedNum(num));
    const resultCalculation = ({price, amount}) => price && amount ? toPrecision(price * amount) : undefined;
    const rangeCalculation = ({amount}) => amount && amount / userBalance * 100;
    const amountCalculation = ({price, result}) => price && result ? toPrecision(result / price) : undefined;

    const modificators = {
        price: (data) => {
            return {...data, result: resultCalculation(data)};
        },
        amount: (data) => {
            const result = resultCalculation(data);
            const range = rangeCalculation(data);

            return {...data, range, result};
        },
        range: (data) => {
            const {price, range} = data;

            const amount = toPrecision(userBalance * (range / 100));
            const result = resultCalculation({price, amount});

            return {...data, amount, result};
        },
        result: (data) => {
            const {price} = data;

            const amount = amountCalculation(data);
            const range = rangeCalculation({price, amount});

            return {...data, amount, range};
        }
    };

    const request = async ({amount, baseAssetId, quoteAssetId, result}) => {
        const args = {amountToBuy: result, amountToSell: amount, assetToSell: baseAssetId, assetToBuy: quoteAssetId};
        return generatePromiseModal(TradeSellConfirm, args);
    };

    return(
        <Form
            defaultData={{baseAssetId, quoteAssetId}}
            modificators={modificators}
            schema={tradeSellSchema}
            request={request}
        >{formData => {
            const fee = (fee_percent || 0) / 100 * (formData.state.data.amount || 0);
            return(
                <Fragment>
                    <Row>
                        <Col md={6}>
                            <NumberInput name="price" assetSymbol={quote} formData={formData} />
                        </Col>
                        <Col md={6}>
                            <NumberInput name="amount" assetSymbol={base} formData={formData} />
                        </Col>
                    </Row>
                    <Box mb={2}>
                        <Range name="range" formData={formData} />
                    </Box>
                    <NumberInput name="result" assetSymbol={quote} formData={formData} />
                    <FlexBox justify="space-between">
                        <Metadata content="trade.bestPrice" />
                        <MetadataBold text={`${bestPrice} ${quote}`} />
                    </FlexBox>
                    <FlexBox mt={.4} justify="space-between">
                        <Metadata content={i18nGlobal("commission")} />
                        <MetadataBold text={`${fee} ${quote}`} />
                    </FlexBox>
                    <Box w="fit-content" mt={1} ml="auto">
                        <RedTextBtn type="submit" content={i18nGlobal("sell")} additionalData={{asset: base}} />
                    </Box>
                </Fragment>
            )
        }}</Form>
    )
};