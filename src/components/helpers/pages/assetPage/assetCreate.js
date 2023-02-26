import React, {Fragment} from "react";
import {Box, Card, Col, FlexBox, Heading, Metadata, MetadataBold, Row} from "../../global";
import {Checkbox, Form, Input, NumberInput, TickerRange} from "../../form/helpers";
import {BrandTextBtn} from "../../btn";
import {assetCreateSchema} from "../../form/validation";
import {generatePromiseModal} from "../../../../redux/actions";
import {NewAssetConfirmation} from "../../confirmModals";

export const AssetCreate = ({reloadData}) => {
    const req = props => generatePromiseModal(NewAssetConfirmation, props);

    const modificators = {
        maxNum: data => {
            const maxNum = data.maxNum;
            let decimalStr = "";

            if(maxNum.includes(".")){
                decimalStr = maxNum.split(".")[1];
            } else if(maxNum.includes(",")){
                decimalStr = maxNum.split(",")[1];
            }

            const precision = decimalStr ? String(decimalStr.length) : "0";

            return {...data, precision};
        },
        precision: data => {
            const {maxNum: oldMaxNum, precision} = data;
            const maxNum = Number(oldMaxNum).toFixed(precision);

            return {...data, maxNum};
        },
        ticker: data => ({...data, ticker: data.ticker.toUpperCase()})
    };

    const defaultData = {maxNum: "100000.000", precision: "3", allowFee: false, allowOverrideTransfer: false};

    return(
        <Form
            defaultData={defaultData}
            modificators={modificators}
            schema={assetCreateSchema}
            request={req}
            handleResult={reloadData}
            clearOnFinish
        >{formData => {
            const ticker = formData.state.data.ticker;
            const price = !ticker || ticker.length <= 2
                ? 0
                : ticker.length === 3
                    ? 25000
                    : ticker.length === 4
                        ? 5000
                        : 500;

            return (
                <Fragment>
                    <Row>
                        <Col md={7}>
                            <NumberInput name="maxNum" formData={formData} />
                        </Col>
                        <Col md={5}>
                            <Input name="ticker" formData={formData} />
                        </Col>
                    </Row>
                    <Box mb={2}>
                        <Metadata content="fields.precision" />
                        <TickerRange name="precision" formData={formData} />
                    </Box>
                    <Input name="tokenIcon" formData={formData} />
                    <Input name="tokenDesc" formData={formData} />
                    <Box mb={2}>
                        <Checkbox name="allowFee" formData={formData} />
                    </Box>
                    <Box mb={2}>
                        <Checkbox name="allowOverrideTransfer" formData={formData} />
                    </Box>
                    <Box mb={2}>
                        <Metadata content="assetPage.warning" color="font-secondary" />
                    </Box>
                    {!!price && (
                        <FlexBox mb={2}>
                            <Metadata content="assetPage.price" />
                            <Box ml={1}>
                                <MetadataBold text={`${price} GBG`} />
                            </Box>
                        </FlexBox>
                    )}
                    <BrandTextBtn type="submit" content="assetPage.btn" />
                </Fragment>
            )
        }}</Form>
    )
};