import React from "react";
import {translateStr} from "../../../../utils";
import {Box, FlexBox, Metadata, MetadataBold} from "../../global";
import {ThemeSwitch} from "../../../layout/themeSwitch";

export const ThemeChange = () => {
    const i18n = translateStr("settings");
    return(
        <Box w="100%">
            <Box w="fit-content" mx="auto" mb={.6}>
                <MetadataBold content={i18n("theme")} color="font-secondary" />
            </Box>
            <FlexBox mx="auto" justify="center">
                <Box mr={1.6}>
                    <Metadata content={i18n("lightTheme")} />
                </Box>
                <ThemeSwitch />
                <Box ml={1.6}>
                    <Metadata content={i18n("darkTheme")} />
                </Box>
            </FlexBox>
        </Box>
    )
};