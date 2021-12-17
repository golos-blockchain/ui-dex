import React from "react";
import {EmptyLayout} from "../../../layout";
import {Card, BodyBold, Box, Heading} from "../../global";
import {translateStr} from "../../../../utils";
import {LoginForm} from "./loginForm";

export const LoginScreen = () => {
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
        <EmptyLayout>
            <Card p={4}>
                <Heading content={i18n("title")} />
                <Box mt={.2}>
                    <BodyBold content={i18n("desc")} additionalData={{regLink}} />
                </Box>
                <Box mt={2.2}>
                    <LoginForm />
                </Box>
            </Card>
        </EmptyLayout>
    )
};