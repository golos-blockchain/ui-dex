import React, {Fragment, useState} from "react";
import QRCode from "react-qr-code";
import {clsx, translateStr, useClassSetter} from "../../../../utils";
import {Body, Box, FlexBox, Heading, Metadata, MetadataBold} from "../../global";
import {TransparentTextBtn} from "../../btn";
import {PasswordHideIcon, PasswordShowIcon} from "../../../../svg";
import {getUserData} from "../../../../redux/actions/userData";
import {generateModal, getSettings} from "../../../../redux/actions";

const QRModal = ({type, userKey}) => {
    const i18n = translateStr("settings.permissions");
    const nightMode = getSettings().nightMode;
    const qrProps = {
        bgColor: nightMode ? "#342448" : "white",
        fgColor: nightMode ? "white" : "dark",
        size: window.devicePixelRatio > 1 ? 200 : 400,
        value: userKey
    };
    return(
        <Fragment>
            <Heading content={i18n(type, "title")} />
            <Box mt={1} mb={3}>
                <Body content={i18n(type, "desc")} />
            </Box>
            <QRCode {...qrProps} />
        </Fragment>
    )
};

const PermissionBlock = ({userKey, type}) => {
    const i18n = translateStr("settings.permissions");
    const [baseClass, setClass] = useClassSetter("permission");
    const [shown, setShownState] = useState(false);

    const hiddenKey = new Array(47).fill("*").join("");

    const btnProps = {
        content: i18n(shown ? "hideKey" : "showKey"),
        iconLeft: shown ? PasswordHideIcon : PasswordShowIcon,
        onClick: () => setShownState(!shown)
    };

    const generateQRModal = generateModal(<QRModal type={type} userKey={userKey} />)

    return(
        <div className={baseClass}>
            <div className={setClass("title")}>
                <MetadataBold content={i18n(type, "title")} color="brand" />
            </div>
            <div className={setClass("desc")}>
                <Metadata content={i18n(type, "desc")} />
            </div>
            <FlexBox mt={.2}>
                <div className={clsx(setClass("key"), shown && "shown")}>
                    <MetadataBold text={!shown ? hiddenKey : userKey} />
                </div>
                <button className={setClass("qr")} onClick={generateQRModal}>
                    <QRCode size={33.33} value={userKey} />
                </button>
            </FlexBox>
            <div className={setClass("btn")}>
                <TransparentTextBtn {...btnProps} />
            </div>
        </div>
    )
};

export const Permissions = () => {
    const keys = getUserData().keys;
    const list = ["posting", "active", "owner", "memo"];
    return list.map(type => keys[type] && <PermissionBlock key={type} type={type} userKey={keys[type]} />)
};