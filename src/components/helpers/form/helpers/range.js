import React from "react";
import {useClassSetter} from "../../../../utils";
import {FlexBox, Metadata} from "../../global";
import {fieldHook} from "../hooks";

export const Range = ({id, ...props}) => {
    const [baseClass, setClass] = useClassSetter("range");

    let { name, value, onChange } = fieldHook(props);

    if(!id) id = name;
    if(!onChange) onChange = () => {};

    return(
        <label htmlFor={id} className={baseClass}>
            <input id={id} name={name} className={setClass("input")} value={value || 1} onChange={onChange} min="1" max="100" type="range" />
            <FlexBox justify="space-between" className={setClass("percents-wrapper")}>
                {[0, 25, 50, 75, 100].map((el, id) => (
                    <Metadata
                        key={id}
                        className={setClass("percent")}
                        text={`${el}%`}
                        style={{left: el}}
                    />
                ))}
            </FlexBox>
        </label>
    )
};