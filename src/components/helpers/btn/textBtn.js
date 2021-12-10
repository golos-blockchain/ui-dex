import React from "react";
import {BtnContent} from "./btnContent";
import {BorderedBtn, BrandBtn, GreenBtn, RedBtn, TransparentBtn} from "./btnWrapper";

const textBtnConstructor = Wrapper => ({iconLeft, content, text, textComponent, additionalData, iconRight, ...props}) => {
    const contentProps = {iconLeft, content, text, textComponent, additionalData, iconRight};
    return (
        <Wrapper {...props}>
            <BtnContent {...contentProps} />
        </Wrapper>
    );
};

export const BrandTextBtn = textBtnConstructor(BrandBtn);
export const RedTextBtn = textBtnConstructor(RedBtn);
export const GreenTextBtn = textBtnConstructor(GreenBtn);
export const BorderedTextBtn = textBtnConstructor(BorderedBtn);
export const TransparentTextBtn = textBtnConstructor(TransparentBtn);