import {useClassSetter} from "../../utils";
import {NavLink} from "react-router-dom";
import {cabinet, cabinetMenu, trade} from "../routing";
import {Body, Divider, FlexBox, Subheading} from "../helpers/global";
import {MobileUserDisplay} from "./mobileUserDisplay";
import React from "react";
import {ThemeSwitch} from "./themeSwitch";
import {LangChange} from "./langChange";

export const MobileMenu = ({menuIsOpen, toggleMenu}) => {
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
                    <Divider />
                    <FlexBox p="2rem 2.5rem 2rem 3rem" justify="space-between">
                        <ThemeSwitch />
                        <LangChange />
                    </FlexBox>
                    <Divider />
                    <MobileUserDisplay
                        className={setClass("user-display")}
                        toggleMenu={toggleMenu}
                    />
                </div>
            </div>
        </div>
    )
};