import React, {Fragment} from "react";
import {getUserData} from "../../../../redux/actions/userData";
import {Box, Col, Heading, Row} from "../../global";
import {Form, Input, NumberInput} from "../../form/helpers";
import {MailIcon} from "../../../../svg";
import {AssetSelect} from "../../dropdown";
import {getAssetsList} from "../../../../redux/actions/assets";
import {isUserExist} from "../../../../utils/dataHandlers";
import {BrandTextBtn} from "../../btn";
import {BroadcastRequest} from "../../../../utils/requests";
import {closeModal} from "../../../../redux/actions";
import {assetIssueSchema} from "../../form/validation";

export const AssetIssueModal = ({asset, reloadData}) => {
    const userName = getUserData().name;
    const symbolId = getAssetsList().findIndex(el => el === asset.symbol);

    const req = async ({to, amount}) => {
        await isUserExist(to);
        return new BroadcastRequest().assetIssue(to, amount, symbolId);
    };

    const handleResult = () => {
        if(reloadData) reloadData();
        closeModal();
    };

    return(
        <Fragment>
            <Heading content="assetPage.issue" />
            <Box mt={2}>
                <Form
                    defaultData={{can_issue: asset.can_issue}}
                    schema={assetIssueSchema}
                    request={req}
                    handleResult={handleResult}
                >{formData => (
                    <Fragment>
                        <Row>
                            <Col>
                                <Input iconLeft={MailIcon} name="from" value={userName} disabled />
                            </Col>
                            <Col>
                                <Input iconLeft={MailIcon} name="to" formData={formData} />
                            </Col>
                            <Col md={7}>
                                <NumberInput name="amount" formData={formData} />
                            </Col>
                            <Col md={5}>
                                <AssetSelect name="asset" value={String(symbolId)} disabled />
                            </Col>
                        </Row>
                        <Box>
                            <BrandTextBtn type="submit" content="assetPage.issue" />
                        </Box>
                    </Fragment>
                )}</Form>
            </Box>
        </Fragment>
    )
}