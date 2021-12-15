import React, {Fragment} from "react";
import {translateStr} from "../../../../utils";
import {BodyBold, Box, Heading} from "../../global";
import {LoginForm} from "./loginForm";
import {closeModal} from "../../../../redux/actions";

export const LoginModal = () => {
    const i18n = translateStr("login");
    const regLink = (
        <BodyBold
            component="a"
            content={i18n("reg")}
            href="https://golos.app/register?invite=graphenelab"
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
            <Box mt={2.2}>
                <LoginForm onFinish={closeModal} />
            </Box>
        </Fragment>
    )
};