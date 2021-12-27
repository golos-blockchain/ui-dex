import React, {Fragment} from "react";
import {getUserData} from "../../../../redux/actions/userData";
import {getAssets} from "../../../../redux/actions/assets";
import {Form, NumberInput, Range} from "../../form/helpers";
import {tradeSellSchema} from "../../form/validation";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {i18nGlobal, toFixedNum} from "../../../../utils";
import {RedTextBtn} from "../../btn";
import {generatePromiseModal} from "../../../../redux/actions";
import {TradeSellConfirm} from "../../confirmModals";

export const TradeSellForm = ({base, quote, orderBook, reloadData}) => {
    const userBalance = getUserData().balances[base] ? getUserData().balances[base].amount : 0;

    const {list, params} = getAssets();

    const baseAssetId = list.findIndex(symbol => symbol === base);
    const quoteAssetId = list.findIndex(symbol => symbol === quote);

    const basePrecision = params[base].precision;
    const { precision: quotePrecision, fee_percent } = params[quote];

    const toPrecision = (num, precision) => String(toFixedNum(num, precision));
    const resultCalculation = ({price, amount}) => price && amount ? toPrecision(price * amount, quotePrecision) : undefined;
    const rangeCalculation = ({amount}) => amount && String(amount / userBalance * 100);
    const amountCalculation = ({price, result}) => price && result ? toPrecision(result / price, basePrecision) : undefined;

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

            const amount = toPrecision(userBalance * (range / 100), basePrecision);
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

    const bestPrice = toFixedNum(orderBook.bids[0] ? orderBook.bids[0].price : 0, basePrecision);

    return(
        <Form
            defaultData={{baseAssetId, quoteAssetId}}
            modificators={modificators}
            schema={tradeSellSchema}
            request={request}
            handleResult={reloadData}
            clearOnFinish
        >{formData => {
            const fee = (fee_percent || 0) / 100 * (formData.state.data.amount || 0);
            return(
                <Fragment>
                    <Row>
                        <Col xl={6} md={12} sm={6} xs={12}>
                            <NumberInput name="price" assetSymbol={quote} formData={formData} />
                        </Col>
                        <Col xl={6} md={12} sm={6} xs={12}>
                            <NumberInput name="amount" assetSymbol={base} formData={formData} />
                        </Col>
                    </Row>
                    <Box mb={2}>
                        <Range name="range" formData={formData} />
                    </Box>
                    <NumberInput name="result" assetSymbol={quote} formData={formData} />
                    <FlexBox justify="space-between">
                        <Metadata content="trade.balance" />
                        <MetadataBold text={`${userBalance} ${base}`} />
                    </FlexBox>
                    <FlexBox mt={.4} justify="space-between">
                        <Metadata content="trade.bestPrice" />
                        <button type="button" onClick={() => formData.onChange({name: "price", value: String(bestPrice)})}>
                            <MetadataBold text={`${bestPrice} ${base}`} color="brand" />
                        </button>
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