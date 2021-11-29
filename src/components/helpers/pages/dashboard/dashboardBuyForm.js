import React, {Fragment} from "react";
import {Form, Input} from "../../form/helpers";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {Select} from "../../dropdown";
import {currenciesList} from "../../../../utils/dataHandlers";
import {i18nGlobal} from "../../../../utils";
import {GreenTextBtn} from "../../btn";

export const DashboardBuyForm = () => {
    const list = currenciesList.map(el => ({text: el}));

    return(
        <Form>{formData => (
            <Fragment>
                <Row>
                    <Col md={7}>
                        <Input name="sellAmount" formData={formData} />
                    </Col>
                    <Col md={5}>
                        <Select
                            name="currencyToSell"
                            list={list}
                            formData={formData}
                        />
                    </Col>
                    <Col md={7}>
                        <Input name="buyAmount" formData={formData} />
                    </Col>
                    <Col md={5}>
                        <Select
                            name="currencyToBuy"
                            list={list}
                            formData={formData}
                        />
                    </Col>
                </Row>
                <FlexBox>
                    <div>
                        <div>
                            <Metadata content={i18nGlobal("commission")} />
                        </div>
                        <MetadataBold text="1,981625 GOLOS" />
                    </div>
                    <Box ml="auto">
                        <GreenTextBtn content={i18nGlobal("buy")} />
                    </Box>
                </FlexBox>
            </Fragment>
        )}</Form>
    )
};