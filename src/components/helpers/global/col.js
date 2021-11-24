import React from "react";
import {clsx} from "../../../utils";

export const Col = ({className, children, ...props}) => {

    let classes = clsx("col", className);
    const params = ["xs", "sm", "md", "lg", "xl"];

    for(let key in props){
        if(params.includes(key)) classes = clsx(classes, `${key}-${props[key]}`);
    }

    return (
        <div className={classes}>{children}</div>
    );
}