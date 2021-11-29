import React, {Fragment} from "react";
import {Card, Box, Col, FlexBox, H1, MetadataBold, Row, Heading} from "../helpers/global";
import {translateStr, useClassSetter} from "../../utils";
import {TabsWrapper} from "../helpers/tabs";
import {LanguageChange, Nodes, Permissions, ThemeChange} from "../helpers/pages/settings";
import {Checkbox, Form, Input} from "../helpers/form/helpers";
import {getUserData} from "../../redux/actions/userData";
import {MailIcon} from "../../svg";
import {BorderedTextBtn, BrandTextBtn} from "../helpers/btn";
import {FormatterRequest} from "../../utils/requests";
import {passwordChangeSchema} from "../helpers/form/validation";

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
            >{formData => (
                <Fragment>
                    <Box>
                        <Input name="currentPassword" type="password" formData={formData} />
                    </Box>
                    <FlexBox align="start">
                        <Box f="1">
                            <Input name="generatedPassword" formData={formData} disabled />
                        </Box>
                        <Box w="fit-content" ml={1.5}>
                            <BorderedTextBtn content={i18n("generateNewPassword")} onClick={() => {
                                const newPassword = new FormatterRequest().generatePassword();
                                formData.onChange({name: "generatedPassword", value: newPassword});
                            }} />
                        </Box>
                    </FlexBox>
                    <Box mt={1} mb={2.6}>
                        <Checkbox name="passwordRestoreWarning" formData={formData} />
                    </Box>
                    <Box mb={2.6}>
                        <Checkbox name="passwordSaveWarning" formData={formData} />
                    </Box>
                    <BrandTextBtn type="submit" content={i18n("updatePassword")} />
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
           <Col md={6}>
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
           <Col md={6}>
               <Card className={setClass("interface")}>
                   <Heading content={i18n("interface")} />
                   <FlexBox mt={1} justify="space-between" align="center">
                       <LanguageChange />
                       <div className={setClass("interface-divider")} />
                       <ThemeChange />
                   </FlexBox>
               </Card>
               <Card mt={2}>
                   <Nodes />
               </Card>
           </Col>
        </Row>
    )
};