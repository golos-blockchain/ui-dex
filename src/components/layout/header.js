import React from "react";
import {Box, FlexBox} from "../helpers/global";
import {Logo} from "../../svg";
import {useClassSetter} from "../../utils";
import {UserDisplay} from "./userDisplay";
import {ThemeSwitch} from "./themeSwitch";
import {LangChange} from "./langChange";
import {TopMenu} from "./topMenu";

export const Header = () => {
    const [baseClass, setClass] = useClassSetter("header");

    return(
        <header className={baseClass}>
            <FlexBox pr={2} pl={4} justify="space-between">
                <FlexBox align="center">
                    <Box mt={1.8} mr={5.1} mb={1.2} className={setClass("logo")}>
                        <Logo />
                    </Box>
                    <Box mt="auto">
                        <TopMenu />
                    </Box>
                </FlexBox>
                <FlexBox mt={1.6} mb={1} className={setClass("options")} align="stretch">
                    <FlexBox className={setClass("option")} align="center">
                        <UserDisplay />
                    </FlexBox>
                    <FlexBox className={setClass("option")} align="center">
                        <ThemeSwitch />
                    </FlexBox>
                    <FlexBox className={setClass("option")} align="center">
                        <LangChange />
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </header>
    )
};