import {translateStr} from "../../utils";
import {EmptyLayout} from "../layout";
import {Box, Heading, HeadingBold} from "../helpers/global";
import {BrandTextBtn} from "../helpers/btn";
import React from "react";

export const ServerError = () => {
    const i18n = translateStr("serverError");
    return(
        <EmptyLayout>
            <HeadingBold text="404" />
            <Box mt={.2}>
                <Heading content={i18n("desc")} />
            </Box>
            <Box w={15} mt={2}>
                <BrandTextBtn content={i18n("btn")} to="/" />
            </Box>
        </EmptyLayout>
    )
};