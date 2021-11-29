import React, {Fragment} from "react";
import {EmptyLayout} from "../../../layout";
import {Card, BodyBold, Box, Heading} from "../../global";
import {handleUserAuth} from "../../../../utils/dataHandlers";
import {setUserData} from "../../../../redux/actions/userData";
import {Input, Form} from "../../form/helpers";
import {MailIcon} from "../../../../svg";
import {translateStr} from "../../../../utils";
import {BrandTextBtn} from "../../btn";
import {loginSchema} from "../../form/validation";
import {RequestError} from "../../form/helpers/requestError";

const userData = {
    name: 'graphenelab',
    priv: 'P5JwNwn9zsDJpmD8Ktyc8kvtCZUo8ZkCKcbsAiL8xxdTYYGCW8cX'
};

const LoginForm = () => {
    return(
        <Fragment>
            <Form
                schema={loginSchema}
                request={handleUserAuth}
                handleResult={setUserData}
            >{formData => (
                <Fragment>
                    <Input name="name" iconLeft={MailIcon} formData={formData} />
                    <Input name="priv" type="password" formData={formData} />
                    <RequestError formData={formData} />
                    <BrandTextBtn type="submit" content="login.title" />
                </Fragment>
            )}</Form>
        </Fragment>
    );
};

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