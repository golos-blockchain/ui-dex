import React from "react";
import {useClassSetter} from "../../utils";
import LogoPng from "../../img/logo.png";

export const EmptyLayout = ({children}) => {
    const [baseClass, setClass] = useClassSetter("empty-layout");

    return(
        <div className={baseClass}>
            <div className={setClass("logo")}>
                <img src={LogoPng} alt=""/>
            </div>
            <div className={setClass("content")}>
                {children}
            </div>
        </div>
    )
};