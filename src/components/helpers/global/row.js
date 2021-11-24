import React from "react";
import {FlexBox} from "./flexBox";
import {clsx} from "../../../utils";

export const Row = ({className, children, ...props}) => (
    <FlexBox className={clsx("row", className)} align="stretch" {...props}>{children}</FlexBox>
);