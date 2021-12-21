import React, {Fragment, useState} from "react";
import {clsx, useClassSetter} from "../../utils";
import {LogoDisplay} from "./logoDisplay";
import {Body, BodyBold, Box, Divider, FlexBox, Subheading} from "../helpers/global";
import {NavLink} from "react-router-dom";
import {cabinet, trade} from "../routing/path";
import {cabinetMenu} from "../routing";
import {connect} from "react-redux";
import {connectUserData, logout} from "../../redux/actions/userData";
import {generateModal} from "../../redux/actions";
import {LoginModal} from "../helpers/pages/cabinet";
import {BrandTextBtn} from "../helpers/btn";
import {LogoutIcon, MailIcon} from "../../svg";

const MobileUserDisplay = connect(connectUserData)(({className, toggleMenu, userData}) => {
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
            <BrandTextBtn className={className} content="login.title" onClick={handleClick(generateModal(<LoginModal />))} />
        );

    return(
        <Fragment>
            <Box>
                <Divider />
            </Box>
            <Box className={className}>
                {content}
            </Box>
        </Fragment>
    )
});

const MobileMenu = ({menuIsOpen, toggleMenu}) => {
    const [baseClass, setClass] = useClassSetter("mobile-menu");
    return(
        <div className={baseClass}>
            <div className={setClass("overlay")} onClick={toggleMenu} />
            <div className={setClass("body")}>
                <div className={setClass("links")}>
                    <NavLink className={setClass("link")} to={trade.link} onClick={toggleMenu}>
                        <Subheading content={`${trade.tag}.title`} />
                    </NavLink>
                    <NavLink className={setClass("link")} to={cabinet.link} onClick={toggleMenu}>
                        <Subheading content={`${cabinet.tag}.title`} />
                    </NavLink>
                    <div className={setClass("sub-links")}>
                        {cabinetMenu.map(({icon: IC, tag, link}, id) => {
                            return (
                                <NavLink key={id} className={setClass("sub-link")} to={link} onClick={toggleMenu} exact>
                                    { IC && <IC /> }
                                    <Body content={`${tag}.title`} />
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
                <div className={setClass("user-wrapper")}>
                    <MobileUserDisplay className={setClass("user-display")} toggleMenu={toggleMenu} />
                </div>
            </div>
        </div>
    )
};

const Burger = ({toggleMenu}) => {
    return(
        <button onClick={toggleMenu} className="burger">
            <span />
            <span />
            <span />
        </button>
    );
};

export const MobileHeader = () => {
    const [menuIsOpen, setMenuState] = useState();
    const [baseClass, setClass] = useClassSetter("mobile-header");
    const toggleMenu = () => setMenuState(!menuIsOpen);
    return(
        <div className={clsx(baseClass, menuIsOpen && "menu-open")}>
            <div className={setClass("body")}>
                <Burger toggleMenu={toggleMenu} />
                <div className={setClass("logo")}>
                    <LogoDisplay />
                </div>
                <Box w={2.7} />
            </div>
            <MobileMenu toggleMenu={toggleMenu} />
        </div>
    )
};