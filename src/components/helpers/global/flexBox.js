import React from "react";
import {Box} from "./box";
import {clsx} from "../../../utils";

export const FlexBox = ({children, className: additionalClassName, direction, justify = "start", align = "center", wrap, ...props}) => {

    const className = clsx(
        "flex",
        justify && `justify-${justify}`,
        align && `align-${align}`,
        direction && `direction-${direction}`,
        wrap && "flex-wrap",
        additionalClassName
    );

    return <Box className={className} {...props}>{children}</Box>
}