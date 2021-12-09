import React from "react";
import {BodyBold, Box, FlexBox, Metadata} from "../../global";
import {translateStr} from "../../../../utils";

export const PairParams = ({base, quote}) => {
    const i18n = translateStr("trade.params");
    const list = [
        "change",
        "max",
        "min",
        "baseVolume",
        "quoteVolume"
    ];

    return(
        <FlexBox justify="space-between">
            {list.map((key, id) => (
                <div key={id}>
                    <div>
                        <Metadata content={i18n(key)} additionalData={{base, quote}} />
                    </div>
                    <BodyBold text="1,98162" color="brand" />
                </div>
            ))}
        </FlexBox>
    )
};