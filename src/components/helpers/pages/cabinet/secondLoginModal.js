import React, {Fragment} from "react";
import {translateStr} from "../../../../utils";
import {closeModal} from "../../../../redux/actions";
import {logout, setUserData} from "../../../../redux/actions/userData";
import {Body, Box, FlexBox, Heading} from "../../global";
import {Form, PasswordInput} from "../../form/helpers";
import {secondAuthSchema} from "../../form/validation";
import {handleSecondAuth} from "../../../../utils/dataHandlers";
import {RequestError} from "../../form/helpers/requestError";
import {BrandTextBtn, TransparentTextBtn} from "../../btn";
import {LogoutIcon} from "../../../../svg";

export const SecondLoginModal = ({resolve}) => {
    const i18n = translateStr("login");

    const close = () => {
        resolve();
        closeModal();
    };

    const handleResult = (userData) => {
        setUserData(userData);
        close();
    };

    const onLogoutClick = () => {
        logout();
        close();
    };

    return(
        <Fragment>
            <Heading content={i18n("secondLogin")} />
            <Box mt={1} mb={2}>
                <Body content={i18n("secondLoginDesc")} />
            </Box>
            <Form
                schema={secondAuthSchema}
                request={handleSecondAuth}
                handleResult={handleResult}
            >{formData => (
                <Fragment>
                    <PasswordInput name="password" formData={formData} />
                    <RequestError formData={formData} />
                    <FlexBox justify="space-between">
                        <BrandTextBtn type="submit" content={i18n("title")} />
                        <TransparentTextBtn
                            onClick={onLogoutClick}
                            content={i18n("logout")}
                            iconRight={LogoutIcon}
                        />
                    </FlexBox>
                </Fragment>
            )}</Form>
        </Fragment>
    )
};