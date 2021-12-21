import {useHistory} from "react-router";
import {trade} from "../../../routing";
import {useClassSetter} from "../../../../utils";
import {Body, FlexBox, SubheadingBold} from "../../global";
import {HistoryFillIcon} from "../../../../svg";
import React from "react";

export const PairDisplay = ({base, quote, rate}) => {
    const history = useHistory();
    const [baseClass, setClass] = useClassSetter("pair-display");
    const swapPair = () => history.push(trade.link + `${quote}_${base}`);

    return(
        <div className={baseClass}>
            <FlexBox>
                <Body text={`${base} / ${quote}`} />
                <button className={setClass("change-btn")} onClick={swapPair}>
                    <HistoryFillIcon />
                </button>
            </FlexBox>
            <SubheadingBold text={rate} color="brand" />
        </div>
    )
};