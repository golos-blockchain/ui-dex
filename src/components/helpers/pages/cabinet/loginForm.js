import {Fragment} from "react";
import {Form, Input, PasswordInput} from "../../form/helpers";
import {loginSchema} from "../../form/validation";
import {handleFirstAuth} from "../../../../utils/dataHandlers";
import {setUserData} from "../../../../redux/actions/userData";
import {MailIcon} from "../../../../svg";
import {RequestError} from "../../form/helpers/requestError";
import {BrandTextBtn} from "../../btn";
import React from "react";
import {Box, Metadata} from "../../global";

export const LoginForm = ({onFinish}) => {
    const handleResult = (data) => {
        setUserData(data);
        if(onFinish) onFinish();
    };

    return(
        <Fragment>
            <Form
                schema={loginSchema}
                request={handleFirstAuth}
                handleResult={handleResult}
            >{formData => (
                <Fragment>
                    <Input name="name" iconLeft={MailIcon} formData={formData} />
                    <PasswordInput name="activeKey" formData={formData} />
                    <Box mw={37.4} mb={2.5}>
                        <Metadata content="login.pwdDescription" />
                    </Box>
                    <PasswordInput name="newPassword" formData={formData} />
                    <PasswordInput name="confirmPassword" formData={formData} />
                    <RequestError formData={formData} />
                    <BrandTextBtn type="submit" content="login.title" />
                </Fragment>
            )}</Form>
        </Fragment>
    );
};