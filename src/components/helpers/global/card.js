import React from "react";
import {clsx} from "../../../utils";
import {Box} from "./box";

export const Card = ({className, children, ...boxParams}) => {
    return(
        <Box className={clsx("card", className)} {...boxParams}>
            {children}
        </Box>
    )
}