import React from "react";
import {clsx, useClassSetter} from "../../utils";

export const Loader = () => {
    const [baseClass, setClass] = useClassSetter("loader");
    return(
        <div className={baseClass}>
            <div className={clsx(setClass("body"), "card")}>
                <div className={setClass("circle")} />
            </div>
        </div>
    )
};

export const GlobalLoader = () => (
    <div className="global-loader">
        <Loader />
    </div>
);

export const PageLoader = () => (
    <div className="page-loader">
        <Loader />
    </div>
);

export const CardLoader = () => (
    <div className="card-loader">
        <Loader />
    </div>
);