import React from "react";
import {clsx, generateRipples, useClassSetter} from "../../../utils";
import DelayLink from "./delayLink";

export const BtnWrapper = ({type = "button", className, modification, children, fullWidth, onClick, to, ...rest}) => {
    const classSetter = useClassSetter('btn');

    const baseClass = classSetter[0];
    const setModifier = classSetter[2];

    const wrapperClasses = clsx(baseClass, modification && setModifier(modification), fullWidth && "full-width", className);
    return !to ? (
        <button {...rest} type={type} className={wrapperClasses} onClick={generateRipples(onClick)}>
            {children}
        </button>
    ) : (
        <DelayLink {...rest} className={wrapperClasses} to={to} onClick={onClick} onDelayStart={generateRipples()} delay={125}>
            {children}
        </DelayLink>
    )
}

export const BtnWrapperConstructor = (modification) => (props) => <BtnWrapper {...props} modification={modification} />;

export const BrandBtn = BtnWrapperConstructor("brand");
export const RedBtn = BtnWrapperConstructor("red");
export const GreenBtn = BtnWrapperConstructor("green");

export const BorderedBtn = BtnWrapperConstructor("bordered");
export const TransparentBtn = BtnWrapperConstructor("transparent");
