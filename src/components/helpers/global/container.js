import React from "react";
import {clsx} from "../../../utils";

export const Container = ({className, fullHeight, style, children}) => (
    <div className={clsx("container", className, fullHeight && "full-height")} style={style}>{children}</div>
);