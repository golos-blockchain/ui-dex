import React, {Fragment} from "react";
import {translateStr} from "../../../../utils";
import {BodyBold, Box, Heading} from "../../global";
import {LoginForm} from "./loginForm";

export const LoginDisplay = ({onFinish}) => {
    const i18n = translateStr("login");
    const ref = process.env.REACT_APP_REFERRAL;
    const regHref = `https://golos.app/register${ref ? `?invite=${ref}` : ""}`;
    const regLink = (
        <BodyBold
            component="a"
            content={i18n("reg")}
            color="brand"
            href={regHref}
            target="_blank"
            rel="nofollow"
        />
    );

    return(
        <Fragment>
            <Heading content={i18n("title")} />
            <Box mt={.2}>
                <BodyBold content={i18n("desc")} additionalData={{regLink}} />
            </Box>
            <Box mt={1.75}>
                <LoginForm onFinish={onFinish} />
            </Box>
        </Fragment>
    )
}