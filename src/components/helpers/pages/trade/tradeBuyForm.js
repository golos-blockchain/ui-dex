import React, {Fragment} from "react";
import {Form, NumberInput, Range} from "../../form/helpers";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {i18nGlobal, toFixedNum} from "../../../../utils";
import {GreenTextBtn} from "../../btn";
import {getUserData} from "../../../../redux/actions/userData";
import {BroadcastRequest} from "../../../../utils/requests";
import {getAssets, getAssetsList} from "../../../../redux/actions/assets";
import {tradeBuySchema} from "../../form/validation";
import {generatePromiseModal} from "../../../../redux/actions";
import {TradeBuyConfirm} from "../../confirmModals/tradeBuyConfirm";

export const TradeBuyForm = ({base, quote, orderBook}) => {
    const bestPrice = toFixedNum(orderBook.asks[0].price);

    const userBalance = getUserData().balances[quote].amount;

    const {list, params} = getAssets();

    const baseAssetId = list.find(asset => asset.symbol === base).id;
    const quoteAssetId = list.find(asset => asset.symbol === quote).id;

    const basePrecision = params[base].precision;
    const { precision: quotePrecision, fee_percent } = params[base];

    const toPrecision = (num, precision) => String(toFixedNum(num, precision));
    const resultCalculation = ({price, amount}) => price && amount ? toPrecision(price * amount, quotePrecision) : undefined;
    const rangeCalculation = ({result}) => result && result / userBalance * 100;
    const amountCalculation = ({price, result}) => price && result ? toPrecision(result / price, basePrecision) : undefined;

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

            const result = toPrecision(userBalance * (range / 100), quotePrecision);
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
            clearOnFinish
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