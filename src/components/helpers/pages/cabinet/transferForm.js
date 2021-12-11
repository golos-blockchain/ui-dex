import {getUserData} from "../../../../redux/actions/userData";
import {ApiRequest} from "../../../../utils/requests";
import {generatePromiseModal} from "../../../../redux/actions";
import {TrxConfirm} from "../../confirmModals";
import {Form, Input, NumberInput} from "../../form/helpers";
import {trxSchema} from "../../form/validation";
import {getAssetById} from "../../../../redux/actions/assets";
import {Fragment} from "react";
import {Box, Col, FlexBox, Metadata, MetadataBold, Row} from "../../global";
import {MailIcon} from "../../../../svg";
import {AssetSelect} from "../../dropdown";
import {i18nGlobal} from "../../../../utils";
import {BrandTextBtn} from "../../btn";
import React from "react";

export const TransferForm = ({onUpdate}) => {
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

        return generatePromiseModal(TrxConfirm, {from, ...props});
    };

    const handleResult = onUpdate ? onUpdate : undefined;

    return(
        <Form
            schema={trxSchema}
            request={req}
            handleResult={handleResult}
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