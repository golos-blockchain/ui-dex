import React, {useState} from "react";
import {blockContent, clsx, useClassSetter} from "../../utils";
import {LogoDisplay} from "./logoDisplay";
import {Box} from "../helpers/global";
import {Burger} from "./burger";
import {MobileMenu} from "./mobileMenu";

export const MobileHeader = () => {
    const [menuIsOpen, setMenuState] = useState();
    const [baseClass, setClass] = useClassSetter("mobile-header");
    const toggleMenu = () => {
        blockContent(!menuIsOpen);
        setMenuState(!menuIsOpen);
    };
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