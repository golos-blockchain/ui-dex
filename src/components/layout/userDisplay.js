import React from "react";
import {connect} from "react-redux";
import {BodyBold, Box, FlexBox} from "../helpers/global";
import {LogoutIcon, MailIcon, SettingsIcon} from "../../svg";
import {Dropdown} from "../helpers/dropdown/dropdown";
import {connectUserData, logout} from "../../redux/actions/userData";
import {useHistory} from "react-router";
import {settings} from "../routing/path";
import {BrandTextBtn} from "../helpers/btn";
import {LoginModal} from "../helpers/pages/cabinet";
import {generateModal} from "../../redux/actions";

const LoginBtn = () => (
    <BrandTextBtn className="header__login-btn" content="login.title" onClick={generateModal(<LoginModal />)} />
);

const LoggedUserDisplay = ({userData}) => {
    const history = useHistory();
    const btnContent = (
        <FlexBox>
            <MailIcon />
            <Box ml={.8}>
                <BodyBold text={userData.name} />
            </Box>
        </FlexBox>
    );

    const dropdownContent = [
        {icon: <SettingsIcon fill="var(--font-disabled)" />, content: "Настройки", onClick: () => history.push(settings.link)},
        {icon: <LogoutIcon fill="var(--error)" />, content: "Выйти", onClick: logout}
    ];

    return(
        <Dropdown
            btnContent={btnContent}
            dropdownList={dropdownContent.map((({icon, content, onClick}, id) => (
                <FlexBox key={id} onClick={onClick}>
                    <Box mr={1}>
                        {icon}
                    </Box>
                    <BodyBold text={content} />
                </FlexBox>
            )))}
        />
    )
};

const Display = ({userData}) => (
    userData
        ? <LoggedUserDisplay userData={userData} />
        : <LoginBtn />
);

export const UserDisplay = connect(connectUserData)(Display);