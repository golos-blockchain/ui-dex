import React, {useState} from "react";
import QRCode from "react-qr-code";
import {clsx, translateStr, useClassSetter} from "../../../../utils";
import {FlexBox, Metadata, MetadataBold} from "../../global";
import {TransparentTextBtn} from "../../btn";
import {PasswordHideIcon, PasswordShowIcon} from "../../../../svg";
import {getUserData} from "../../../../redux/actions/userData";

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
                <div className={setClass("qr")}>
                    <QRCode size={33.33} value={userKey} />
                </div>
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
    return list.map(type => <PermissionBlock key={type} type={type} userKey={keys[type]} />)
};