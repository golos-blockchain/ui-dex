import React from "react";
import {fieldHook} from "../hooks";
import {MetadataBold} from "../../global";
import {clsx, useClassSetter} from "../../../../utils";
import {CheckActiveIcon, CheckInactiveIcon} from "../../../../svg";

export const Checkbox = ({id, label, className, type, iconLeft: IL, iconRight: IR, hideLabel, ...props}) => {
    const [baseClass, setClass] = useClassSetter("checkbox");

    let { name, value, disabled, onChange, fieldStateClass } = fieldHook(props);

    if(!id) id = name;
    if(!label) label = name;
    if(!onChange) onChange = () => {};

    const handleChange = () => {
        if(disabled) return;
        onChange({name, value: !value});
    };

    const classesList = [
        baseClass,
        className,
        value && "checked",
        fieldStateClass,
        disabled && "disabled"
    ];

    return(
        <label htmlFor={id} className={clsx(...classesList)} onClick={handleChange}>
            <input type="checkbox" className={setClass("input")} value={value || false} disabled={disabled} />
            <div className={setClass("icon")}>
                {value ? <CheckActiveIcon /> : <CheckInactiveIcon />}
            </div>
            <MetadataBold className={setClass("label")} content={`checkboxes.${label}`} />
        </label>
    );
};