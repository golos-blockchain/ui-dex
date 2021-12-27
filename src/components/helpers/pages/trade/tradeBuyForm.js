import React, {Fragment} from "react";
import {Form, NumberInput, Range} from "../../form/helpers";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {i18nGlobal, toFixedNum} from "../../../../utils";
import {GreenTextBtn} from "../../btn";
import {getUserData} from "../../../../redux/actions/userData";
import {getAssets} from "../../../../redux/actions/assets";
import {tradeBuySchema} from "../../form/validation";
import {generatePromiseModal} from "../../../../redux/actions";
import {TradeBuyConfirm} from "../../confirmModals/tradeBuyConfirm";

export const TradeBuyForm = ({base, quote, orderBook, reloadData}) => {
    const userBalance = getUserData().balances[quote] ? getUserData().balances[quote].amount : 0;

    const {list, params} = getAssets();

    const baseAssetId = list.findIndex(symbol => symbol === base);
    const quoteAssetId = list.findIndex(symbol => symbol === quote);

    const basePrecision = params[base].precision;
    const { precision: quotePrecision, fee_percent } = params[quote];

    const toPrecision = (num, precision) => String(toFixedNum(num, precision));
    const resultCalculation = ({price, amount}) => price && amount ? toPrecision(price * amount, quotePrecision) : undefined;
    const rangeCalculation = ({result}) => result && String(result / userBalance * 100);
    const amountCalculation = ({price, result}) => price && result ? toPrecision(result / price, basePrecision) : undefined;

    const modificators = {
        price: (data) => {
            return {...data, amount: amountCalculation(data) || data.amount };
        },
        amount: (data) => {
            const result = resultCalculation(data);
            const range = rangeCalculation({result});

            return {...data, range, result};
        },
        range: (data) => {
            const {price, range} = data;

            const result = toPrecision(userBalance * (range / 100), quotePrecision);
            const amount = amountCalculation({price, result}) || data.amount;

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

    const bestPrice = toFixedNum(orderBook.asks[0] ? orderBook.asks[0].price : 0, quotePrecision);

    return(
        <Form
            defaultData={{baseAssetId, quoteAssetId}}
            modificators={modificators}
            schema={tradeBuySchema}
            request={request}
            handleResult={reloadData}
            clearOnFinish
        >{formData => {
            const fee = (fee_percent || 0) / 100 * (formData.state.data.amount || 0);
            return (
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
                        <MetadataBold text={`${userBalance} ${quote}`} />
                    </FlexBox>
                    <FlexBox mt={.4} justify="space-between">
                        <Metadata content="trade.bestPrice" />
                        <button type="button" onClick={() => formData.onChange({name: "price", value: String(bestPrice)})}>
                            <MetadataBold text={`${bestPrice} ${quote}`} color="brand" />
                        </button>
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