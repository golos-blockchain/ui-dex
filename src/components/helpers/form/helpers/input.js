import React from "react";
import {clsx, useClassSetter} from "../../../../utils";
import {BodyBold, Box, FlexBox, MetadataBold} from "../../global";
import {ErrorIcon, MessageIcon, SuccessIcon, WarningIcon} from "../../../../svg";
import {fieldHook} from "../hooks";

const FieldMessage = ({className, type, message}) => {
    const iconsList = {
        message: MessageIcon,
        success: SuccessIcon,
        warning: WarningIcon,
        error: ErrorIcon
    };

    const Icon = iconsList[type];

    return(
        <FlexBox className={clsx(className, message && "shown")}>
            <Box mr={.4}>{Icon && <Icon />}</Box>
            <MetadataBold content={message} />
        </FlexBox>
    );
};

export const Input = ({id, label, className, type, inputMode, assetSymbol, iconLeft: IL, iconRight: IR, hideLabel, ...props}) => {
    const [baseClass, setClass, setEffect] = useClassSetter("field");

    let { name, value, disabled, onChange, fieldStateClass, message } = fieldHook(props);

    if(!id) id = name;
    if(!label) label = name;
    if(!onChange) onChange = () => {};

    const classesList = [
        baseClass,
        className,
        IL && setEffect("hasLeftIcon"),
        message && setEffect("hasMessage"),
        fieldStateClass,
        disabled && "disabled"
    ];

    return(
        <label htmlFor={id} className={clsx(...classesList)}>
            <input
                id={id}
                type={type}
                name={name}
                value={value || ""}
                placeholder=" "
                inputMode={inputMode}
                className={setClass("input")}
                onChange={onChange}
                disabled={disabled}
            />
            {label && !hideLabel && <BodyBold className={setClass("label")} content={`fields.${label}`} />}
            {IL && <div className={setClass("icon-left")}><IL /></div>}
            {IR && <div className={setClass("icon-right")}><IR /></div>}
            {assetSymbol && <div className={setClass("asset")}><MetadataBold text={assetSymbol} color="font-secondary" /></div>}
            <FieldMessage className={setClass("message")} type={fieldStateClass} message={message} />
        </label>
    )
};