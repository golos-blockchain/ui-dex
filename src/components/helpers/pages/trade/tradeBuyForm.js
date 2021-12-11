import React, {Fragment} from "react";
import {Form, NumberInput, Range} from "../../form/helpers";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {i18nGlobal, toFixedNum} from "../../../../utils";
import {GreenTextBtn} from "../../btn";
import {getUserData} from "../../../../redux/actions/userData";
import {BroadcastRequest} from "../../../../utils/requests";
import {getAssetsList} from "../../../../redux/actions/assets";
import {tradeBuySchema} from "../../form/validation";
import {generatePromiseModal} from "../../../../redux/actions";
import {TradeBuyConfirm} from "../../confirmModals/tradeBuyConfirm";

export const TradeBuyForm = ({base, quote, orderBook}) => {
    const bestPrice = toFixedNum(orderBook.asks[0].price);

    const userBalance = getUserData().balances[quote].amount;

    const {id: baseAssetId, fee_percent} = getAssetsList().find(asset => asset.symbol === base);
    const quoteAssetId = getAssetsList().find(asset => asset.symbol === quote).id;

    const toPrecision = (num) => String(toFixedNum(num));
    const resultCalculation = ({price, amount}) => price && amount ? toPrecision(price * amount) : undefined;
    const rangeCalculation = ({result}) => result && result / userBalance * 100;
    const amountCalculation = ({price, result}) => price && result ? toPrecision(result / price) : undefined;

    const modificators = {
        price: (data) => {
            const result = amountCalculation(data);
            return {...data, result};
        },
        amount: (data) => {
            const result = resultCalculation(data);
            const range = rangeCalculation({result});

            return {...data, range, result};
        },
        range: (data) => {
            const {price, range} = data;
            const result = toPrecision(userBalance * (range / 100));
            const amount = amountCalculation({price, result});

            return {...data, amount, result};
        },
        result: (data) => {
            const range = rangeCalculation(data);
            const amount = amountCalculation(data);

            return {...data, range, amount};
        }
    };

    const request = async ({amount, baseAssetId, quoteAssetId, result}) => {
        const args = {amountToBuy: amount, assetToBuy: baseAssetId, amountToSell: result, assetToSell: quoteAssetId};
        return generatePromiseModal(TradeBuyConfirm, args);
    };

    return(
        <Form
            defaultData={{baseAssetId, quoteAssetId}}
            modificators={modificators}
            schema={tradeBuySchema}
            request={request}
        >{formData => {
            const fee = (fee_percent || 0) / 100 * (formData.state.data.amount || 0);
            return (
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
                        <MetadataBold text={`${fee} ${base}`} />
                    </FlexBox>
                    <Box w="fit-content" mt={1} ml="auto">
                        <GreenTextBtn type="submit" content={i18nGlobal("buy")} additionalData={{asset: base}} />
                    </Box>
                </Fragment>
            )
        }}</Form>
    )
}