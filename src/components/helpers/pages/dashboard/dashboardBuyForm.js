import React, {Fragment} from "react";
import {Form, NumberInput} from "../../form/helpers";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {AssetSelect} from "../../dropdown";
import {i18nGlobal, toFixedNum, translateStr} from "../../../../utils";
import {GreenTextBtn} from "../../btn";
import {getAssetById} from "../../../../redux/actions/assets";
import {ApiRequest} from "../../../../utils/requests";
import {buySchema} from "../../form/validation";
import {generatePromiseModal} from "../../../../redux/actions";
import {QuickBuyConfirm} from "../../confirmModals";

export const DashboardBuyForm = ({onUpdate}) => {
    const getResultParams = (data, formCtx) => {
        const { amountToSell, assetToSell, assetToBuy } = data;

        const assetToSellSelected = assetToSell || assetToSell === 0;
        const assetToBuySelected = assetToBuy || assetToBuy === 0;

        const pairIsUnique = assetToSell !== assetToBuy;

        const allowToCheckRate = amountToSell && assetToSellSelected && assetToBuySelected && pairIsUnique;

        if(!allowToCheckRate) return {...data, amountToBuy: 0, price: 0};

        const assetToSellData = getAssetById(assetToSell || 0);
        const assetToBuyData = getAssetById(assetToBuy || 0);

        formCtx.setState({isLoading: true});

        new ApiRequest().getOrderBook([assetToSellData.symbol, assetToBuyData.symbol])
            .then(res => {
                const allOrders = res.bids;

                let sellSumm = 0;
                let amountToBuy = 0;

                for(let id in allOrders){
                    const {price, asset1, asset2} = allOrders[id];

                    const orderSellAmount = asset1 / Math.pow(10, assetToSellData.precision);
                    const orderBuyAmount = asset2 / Math.pow(10, assetToBuyData.precision);

                    if(amountToSell <= sellSumm + orderSellAmount){
                        amountToBuy += Number(price) * (amountToSell - sellSumm);
                        break;
                    } else {
                        sellSumm += orderSellAmount;
                        amountToBuy += orderBuyAmount
                    }
                }

                amountToBuy = String(toFixedNum(amountToBuy, assetToBuyData.precision));

                const price = +((amountToBuy / amountToSell).toFixed(5));

                formCtx.setState({data: {...data, amountToBuy, price}, isLoading: false});
                formCtx.focusOn("amountToSell");
            });

        return data;
    };

    const i18n = translateStr("dashboard");

    const request = (props) => generatePromiseModal(QuickBuyConfirm, {...props, fillOrKill: true});

    const modificators = {
        assetToSell: getResultParams,
        assetToBuy: getResultParams,
        amountToSell: getResultParams
    };

    return(
        <Form
            modificators={modificators}
            request={request}
            schema={buySchema}
            handleResult={onUpdate}
            clearOnFinish
        >{formData => {
            const {amountToBuy, price, assetToSell, assetToBuy} = formData.state.data;

            const assetToSellData = getAssetById(assetToSell || 0);
            const assetToBuyData = getAssetById(assetToBuy || 0);
            const fee = `${amountToBuy * (assetToBuyData.fee_percent / 100)} ${assetToBuyData.symbol}`;

            const assetToSellSelected = assetToSell || assetToSell === 0;
            const assetToBuySelected = assetToBuy || assetToBuy === 0;

            return (
                <Fragment>
                    <Row>
                        <Col md={6}>
                            <Box mb={2}>
                                <AssetSelect name="assetToSell" formData={formData} />
                            </Box>
                        </Col>
                        <Col md={6}>
                            <Box mb={2}>
                                <AssetSelect
                                    name="assetToBuy"
                                    whiteList={assetToSellData.whitelist}
                                    formData={formData}
                                    disabled={!assetToSellSelected}
                                />
                            </Box>
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                name="amountToSell"
                                formData={formData}
                                disabled={!assetToSellSelected && !assetToBuySelected}
                            />
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                name="amountToBuy"
                                formData={formData}
                                disabled
                            />
                        </Col>
                    </Row>
                    <FlexBox wrap>
                        {!!amountToBuy && (
                            <Fragment>
                                <Box mr={3}>
                                    <div>
                                        <Metadata content={i18n("price")} additionalData={{buySymbol: assetToBuyData.symbol}} />
                                    </div>
                                    <MetadataBold text={`~${price} ${assetToSellData.symbol}`} />
                                </Box>
                                <Box>
                                    <div>
                                        <Metadata content={i18nGlobal("commission")} />
                                    </div>
                                    <MetadataBold text={fee} />
                                </Box>
                            </Fragment>
                        )}
                        <Box ml="auto">
                            <GreenTextBtn type="submit" content={i18nGlobal("buy")} />
                        </Box>
                    </FlexBox>
                </Fragment>
            )
        }}</Form>
    )
};