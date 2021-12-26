import React from "react";
import {BodyBold} from "../global";
import {clsx, useClassSetter} from "../../../utils";

export const BtnContent = ({iconLeft: IL, content, text, additionalData, textComponent, iconRight: IR}) => {
    const [baseClass, setClass, setEffect] = useClassSetter("btn-content");
    const effectName = IL && IR ? "both-icons" : IL ? "left-icon" : IR ? "right-icon" : "";
    const C = textComponent || BodyBold;


    return(
        <div className={clsx(baseClass, effectName && setEffect(effectName))}>
            {IL && (
                <div className={setClass("icon-left")}>
                    <IL />
                </div>
            )}
            { (content || text) && (
                <div className={setClass("text")}>
                    <C content={content} text={text} with={additionalData} />
                </div>
            )}
            {IR && (
                <div className={setClass("icon-right")}>
                    <IR />
                </div>
            )}
        </div>
    )
};