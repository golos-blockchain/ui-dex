import {Form, Input, NumberInput} from "../../form/helpers";
import {Fragment} from "react";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {AssetSelect} from "../../dropdown";
import {i18nGlobal} from "../../../../utils";
import {BrandTextBtn} from "../../btn";
import React from "react";
import {MailIcon} from "../../../../svg";
import {getUserData} from "../../../../redux/actions/userData";
import {trxSchema} from "../../form/validation";
import {getAssetById} from "../../../../redux/actions/assets";
import {ApiRequest} from "../../../../utils/requests";
import {TrxConfirm} from "../../confirmModals";
import {initModal} from "../../../../redux/actions";

export const DashboardTransferForm = ({onUpdate}) => {
    const from = getUserData().name;

    const req = async (props) => {
        const userIsExist = await new ApiRequest().checkUserExistence(props.to);

        //gusaru

        if(!userIsExist){
            const err = new Error();

            err.field = "to";
            err.message = "userNotExist";

            throw err;
        }

        initModal(<TrxConfirm from={from} {...props}  />)
    };


    return(
        <Form
            schema={trxSchema}
            request={req}
            handleResult={onUpdate}
            clearOnFinish
        >{formData => {
            const {summ = 0, asset = 0} = formData.state.data;
            const selectedAsset = getAssetById(asset);
            const fee = `${summ * (selectedAsset.fee_percent / 100)} ${selectedAsset.symbol}`;

            return (
                <Fragment>
                    <Row>
                        <Col md={6}>
                            <Input name="from" iconLeft={MailIcon} value={from} disabled />
                        </Col>
                        <Col md={6}>
                            <Input name="to" iconLeft={MailIcon} formData={formData} />
                        </Col>
                        <Col md={7}>
                            <NumberInput name="summ" formData={formData} />
                        </Col>
                        <Col md={5}>
                            <AssetSelect name="asset" formData={formData} />
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
                            <MetadataBold text={fee} />
                        </div>
                        <Box ml="auto">
                            <BrandTextBtn type="submit" content={i18nGlobal("send")} />
                        </Box>
                    </FlexBox>
                </Fragment>
            )
        }}</Form>
    )
};