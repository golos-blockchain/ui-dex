import {useClassSetter} from "../../../../utils";
import {fieldHook} from "../hooks";
import {Box, FlexBox, Metadata} from "../../global";
import React from "react";

export const TickerRange = ({id, ...props}) => {
    const [baseClass, setClass] = useClassSetter("range");

    let { name, value, onChange } = fieldHook(props);

    if(!id) id = name;
    if(!onChange) onChange = () => {};

    const maxPrecision = 8;
    const items = new Array(maxPrecision).fill("").map((el, id) => id + 1);

    return(
        <label htmlFor={id} className={baseClass}>
            <input id={id} name={name} className={setClass("input")} value={value || 1} min="1" max={maxPrecision} onChange={onChange} type="range" />
            <FlexBox justify="space-between" className={setClass("percents-wrapper")}>
                {items.map((el, id) => (
                    <Box key={id} ml={id === 0 && .35}>
                        <Metadata className={setClass("percent")} text={el} />
                    </Box>
                ))}
            </FlexBox>
        </label>
    )
};