import React, {Fragment} from "react";
import {Box, Heading} from "../../global";
import {getUserData} from "../../../../redux/actions/userData";
import {isUserExist} from "../../../../utils/dataHandlers";
import {BroadcastRequest} from "../../../../utils/requests";
import {closeModal} from "../../../../redux/actions";
import {Form, Input} from "../../form/helpers";
import {assetNewOwnerSchema} from "../../form/validation";
import {MailIcon} from "../../../../svg";
import {BrandTextBtn} from "../../btn";

export const AssetNewOwnerModal = ({asset, reloadData}) => {
    const userName = getUserData().name;
    const symbol = asset.symbol;

    const req = async ({to}) => {
        await isUserExist(to);
        return new BroadcastRequest().assetNewOwner(symbol, to);
    };

    const handleResult = () => {
        if(reloadData) reloadData();
        closeModal();
    };

    return(
        <Fragment>
            <Heading content="assetPage.setNewOwnerFor" additionalData={{symbol}} />
            <Box mt={2}>
                <Form
                    defaultData={{can_issue: asset.can_issue}}
                    schema={assetNewOwnerSchema}
                    request={req}
                    handleResult={handleResult}
                >{formData => (
                    <Fragment>
                        <Input iconLeft={MailIcon} name="from" value={userName} disabled />
                        <Input iconLeft={MailIcon} name="to" formData={formData} />
                        <Box>
                            <BrandTextBtn type="submit" content="assetPage.setNewOwner" />
                        </Box>
                    </Fragment>
                )}</Form>
            </Box>
        </Fragment>
    )
}