import {Fragment} from "react";
import {Form, Input, PasswordInput} from "../../form/helpers";
import {loginSchema} from "../../form/validation";
import {handleFirstAuth} from "../../../../utils/dataHandlers";
import {setUserData} from "../../../../redux/actions/userData";
import {MailIcon} from "../../../../svg";
import {RequestError} from "../../form/helpers/requestError";
import {BrandTextBtn} from "../../btn";
import React from "react";

export const LoginForm = ({onFinish}) => {
    const handleResult = (data) => {
        setUserData(data);
        if(onFinish) onFinish();
    }

    // handleFirstAuth({
        // name: "graphene",
        // activeKey: "5JFZC7AtEe1wF2ce6vPAUxDeevzYkPgmtR14z9ZVgvCCtrFAaLw",
        // password: "123"
    // });
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
                    <PasswordInput name="newPassword" formData={formData} />
                    <PasswordInput name="confirmPassword" formData={formData} />
                    <RequestError formData={formData} />
                    <BrandTextBtn type="submit" content="login.title" />
                </Fragment>
            )}</Form>
        </Fragment>
    );
};