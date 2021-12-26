import React from "react";
import {BodyBold, FlexBox, Metadata} from "../../global";
import {toFixedNum, translateStr, useClassSetter} from "../../../../utils";

export const PairParams = ({base, quote, ticker = {}}) => {
    const i18n = translateStr("trade.params");
    const [baseClass, setClass] = useClassSetter("pair-params");
    const list = [
        { content: "change", key: "percent_change1", handleData: (item) => toFixedNum(item, 2) + "%" },
        { content: "max", key: "highest_bid" },
        { content: "min", key: "lowest_ask" },
        { content: "baseVolume", key: "asset1_volume" },
        { content: "quoteVolume", key: "asset2_volume" }
    ];

    return(
        <FlexBox className={baseClass} justify="space-between" wrap>
            {list.map(({handleData, content, key}) => {
                const item = ticker[key];

                if(!item) return false;

                const text = handleData ? handleData(item) : toFixedNum(item, 3);

                return(
                    <div key={key} className={setClass("item")}>
                        <div>
                            <Metadata content={i18n(content)} additionalData={{base, quote}} />
                        </div>
                        <BodyBold text={text} color="brand" />
                    </div>
                );
            })}
        </FlexBox>
    )
};