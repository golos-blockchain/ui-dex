import React, {useRef} from "react";
import {clsx, useClassSetter} from "../../../../utils";
import {BodyBold, Box, FlexBox, Metadata, MetadataBold} from "../../global";
import {ErrorIcon, MessageIcon, SuccessIcon, WarningIcon} from "../../../../svg";
import {fieldHook} from "../hooks";

const FieldMessage = ({className, type, message, messageParams}) => {
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
            <MetadataBold content={message} additionalData={messageParams} />
        </FlexBox>
    );
};

export const Input = ({id, label, className, type, inputMode, assetSymbol, prefix, iconLeft: IL, iconRight: IR, comment, hideLabel, ...props}) => {
    const ref = useRef();
    const [baseClass, setClass, setEffect] = useClassSetter("field");

    let { name, value, disabled, onChange, fieldStateClass, message, messageParams } = fieldHook(props);

    if(!id) id = name;
    if(!label) label = name;
    if(!onChange) onChange = () => {};

    const classesList = [
        baseClass,
        className,
        value && "hasValue",
        IL && setEffect("hasLeftIcon"),
        message && setEffect("hasMessage"),
        fieldStateClass,
        disabled && "disabled"
    ];

    return(
        <label htmlFor={id} className={clsx(...classesList)}>
            <div className={setClass("body")}>
                <input
                    id={id}
                    ref={ref}
                    type={type}
                    name={name}
                    value={value || ""}
                    placeholder=" "
                    inputMode={inputMode}
                    className={setClass("input")}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className={setClass("bg-layer")} />
                {label && !hideLabel && <BodyBold className={setClass("label")} content={`fields.${label}`} />}
                {IL && <div className={setClass("icon-left")}><IL /></div>}
                {IR && <div className={setClass("icon-right")}><IR /></div>}
                {assetSymbol && <div className={setClass("asset")}><MetadataBold text={assetSymbol} color="font-secondary" /></div>}
            </div>
            {comment && <div className={setClass("comment")}><Metadata text={comment} color="font-secondary" /></div>}
            <FieldMessage className={setClass("message")} type={fieldStateClass} message={message} messageParams={messageParams} />
        </label>
    )
};