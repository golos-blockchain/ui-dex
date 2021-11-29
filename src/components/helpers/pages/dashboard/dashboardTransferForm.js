import {currenciesList} from "../../../../utils/dataHandlers";
import {Form, Input} from "../../form/helpers";
import {Fragment} from "react";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {Select} from "../../dropdown";
import {i18nGlobal} from "../../../../utils";
import {BrandTextBtn} from "../../btn";
import React from "react";
import {MailIcon} from "../../../../svg";
import {getUserData} from "../../../../redux/actions/userData";

export const DashboardTransferForm = () => {
    const list = currenciesList.map(el => ({text: el}));

    return(
        <Form>{formData => (
            <Fragment>
                <Row>
                    <Col md={6}>
                        <Input name="from" iconLeft={MailIcon} value={getUserData().name} disabled />
                    </Col>
                    <Col md={6}>
                        <Input name="to" iconLeft={MailIcon} formData={formData} />
                    </Col>
                    <Col md={7}>
                        <Input name="summ" formData={formData} />
                    </Col>
                    <Col md={5}>
                        <Select
                            name="currencyToBuy"
                            list={list}
                            formData={formData}
                        />
                    </Col>
                    <Col>
                        <Input name="memo" formData={formData} />
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
                        <BrandTextBtn content={i18nGlobal("send")} />
                    </Box>
                </FlexBox>
            </Fragment>
        )}</Form>
    )
};