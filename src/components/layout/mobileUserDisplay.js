import {connect} from "react-redux";
import {connectUserData, logout} from "../../redux/actions/userData";
import {BodyBold, Box, Divider, FlexBox} from "../helpers/global";
import {LogoutIcon, MailIcon} from "../../svg";
import {BrandTextBtn} from "../helpers/btn";
import {generateModal} from "../../redux/actions";
import {LoginModal} from "../helpers/pages/cabinet";
import React from "react";

export const MobileUserDisplay = connect(connectUserData)(({className, toggleMenu, userData}) => {
    const handleClick = (fn) => () => {
        toggleMenu();
        if(fn) fn();
    };

    const name = userData.name;
    const content = name
        ? (
            <FlexBox justify="space-between">
                <FlexBox>
                    <MailIcon />
                    <Box mx={.8}>
                        <BodyBold text={userData.name} />
                    </Box>
                </FlexBox>
                <button onClick={handleClick(logout)}>
                    <LogoutIcon fill="var(--error)" />
                </button>
            </FlexBox>
        ) : (
            <BrandTextBtn content="login.title" onClick={handleClick(generateModal(<LoginModal />))} />
        );

    return(
        <Box className={className}>
            {content}
        </Box>
    )
});