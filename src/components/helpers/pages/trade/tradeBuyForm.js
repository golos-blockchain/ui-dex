import React, {Fragment} from "react";
import {Form, NumberInput, Range} from "../../form/helpers";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {i18nGlobal} from "../../../../utils";
import {GreenTextBtn} from "../../btn";
import {getUserData} from "../../../../redux/actions/userData";
import {BroadcastRequest} from "../../../../utils/requests";
import {getAssetsList} from "../../../../redux/actions/assets";
import {exchangeBuySchema} from "../../form/validation";

export const TradeBuyForm = ({base, quote, rates}) => {
    // const rate = rates[0].rate;
    const rate = 0;

    const userBalance = getUserData().balances[base].amount;

    const baseAssetId = getAssetsList().find(asset => asset.symbol === base).id;
    const quoteAssetId = getAssetsList().find(asset => asset.symbol === quote).id;

    const modificators = {
        price: (data) => {
            const {price, amount} = data;
            const result = price && amount ? price * amount : undefined;

            return {...data, result};
        },
        amount: (data) => {
            const {price, amount} = data;
            const result = price && amount ? price * amount : undefined;
            const range = amount / userBalance * 100;

            return {...data, range, result};
        },
        range: (data) => {
            const {price, range} = data;
            const amount = +((userBalance * (range / 100)).toFixed(5));
            const result = price && amount ? +((price * amount).toFixed(5)) : undefined;

            return {...data, amount, result};
        }
    };

    const request = async ({amount, baseAssetId, quoteAssetId, result}) => {
        const args = {amountToBuy: result, amountToSell: amount, assetToSell: baseAssetId, assetToBuy: quoteAssetId};
        return new BroadcastRequest().orderCreate(args);
    };

    return(
        <Form
            defaultData={{baseAssetId, quoteAssetId}}
            modificators={modificators}
            schema={exchangeBuySchema}
            request={request}
        >{formData => (
            <Fragment>
                <Row>
                    <Col md={6}>
                        <NumberInput name="price" formData={formData} />
                    </Col>
                    <Col md={6}>
                        <NumberInput name="amount" formData={formData} />
                    </Col>
                </Row>
                <Box mb={2}>
                    <Range name="range" formData={formData} />
                </Box>
                <NumberInput name="result" formData={formData} disabled />
                <FlexBox justify="space-between">
                    <Metadata content="trade.bestPrice" />
                    <MetadataBold text={`${rate} ${quote}`} />
                </FlexBox>
                <FlexBox mt={.4} justify="space-between">
                    <Metadata content={i18nGlobal("commission")} />
                    <MetadataBold text="0 GOLOS" />
                </FlexBox>
                <Box w="fit-content" mt={1} ml="auto">
                    <GreenTextBtn type="submit" content={i18nGlobal("buy")} />
                </Box>
            </Fragment>
        )}</Form>
    )
}