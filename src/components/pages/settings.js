import React, {Fragment} from "react";
import {Card, Box, Col, FlexBox, MetadataBold, Row, Heading} from "../helpers/global";
import {setStorage, translateStr, useClassSetter} from "../../utils";
import {TabsWrapper} from "../helpers/tabs";
import {LanguageChange, Nodes, Permissions, ThemeChange} from "../helpers/pages/settings";
import {Checkbox, Form, Input, PasswordInput} from "../helpers/form/helpers";
import {getUserData} from "../../redux/actions/userData";
import {MailIcon} from "../../svg";
import {BrandTextBtn} from "../helpers/btn";
import {passwordChangeSchema} from "../helpers/form/validation";
import {decodeUserData, encodeUserData} from "../../utils/dataHandlers";

const pwdChange = async ({password, newPassword}) => {
    const userData = decodeUserData({password})
    const ciphertext = encodeUserData({...userData, password: newPassword});
    setStorage("user", ciphertext);
};

const PasswordChange = () => {
    const i18n = translateStr("settings");
    const userData = getUserData();

    return(
        <Box pt={0} px={2} pb={2}>
            <MetadataBold content={i18n("passwordChangeWarning")} color="brand" />
            <Box mt={2.2}>
                <Input name="name" value={userData.name} iconLeft={MailIcon} disabled />
            </Box>
            <Form
                schema={passwordChangeSchema}
                request={pwdChange}
                clearOnFinish
            >{formData => (
                <Fragment>
                    <PasswordInput name="password" label="currentPassword" formData={formData} />
                    <PasswordInput name="newPassword" formData={formData} />
                    <PasswordInput name="confirmPassword" formData={formData} />
                    <Box mb={2.6}>
                        <Checkbox name="passwordSaveWarning" formData={formData} />
                    </Box>
                    <BrandTextBtn type="submit" content={i18n("updatePassword")} disabled={formData.props.disableForm} />
                </Fragment>
            )}</Form>
        </Box>
    )
};

export const Settings = () => {
    const [baseClass, setClass] = useClassSetter("settings");
    const i18n = translateStr("settings");
    const headingList = [{content: i18n("passwordChange")}, {content: i18n("permissions.title")}];
    return(
        <Row className={baseClass}>
           <Col lg={6}>
               <Card className={setClass("security")}>
                   <Heading content={i18n("security")} />
                   <Box mt={1}>
                       <TabsWrapper headingList={headingList}>
                           <PasswordChange />
                           <Permissions />
                       </TabsWrapper>
                   </Box>
               </Card>
           </Col>
           <Col lg={6}>
               <Card className={setClass("interface")}>
                   <Heading content={i18n("interface")} />
                   <Box className={setClass("interface-params")} mt={1} justify="space-between" align="center">
                       <LanguageChange />
                       <div className={setClass("interface-divider")} />
                       <ThemeChange />
                   </Box>
               </Card>
               <Card mt={2}>
                   <Nodes />
               </Card>
           </Col>
        </Row>
    )
};