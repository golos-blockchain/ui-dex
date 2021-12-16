import React from "react";
import {Box, FlexBox} from "../helpers/global";
import {useClassSetter} from "../../utils";
import {UserDisplay} from "./userDisplay";
import {ThemeSwitch} from "./themeSwitch";
import {LangChange} from "./langChange";
import {TopMenu} from "./topMenu";
import {LogoDisplay} from "./logoDisplay";

export const Header = () => {
    const [baseClass, setClass] = useClassSetter("header");

    return(
        <header className={baseClass}>
            <FlexBox pr={2} pl={4} justify="space-between">
                <FlexBox mt="auto" align="end">
                    <Box mr={5.1} pb={1.2} className={setClass("logo")}>
                        <LogoDisplay />
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