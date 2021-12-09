import {useHistory} from "react-router";
import {trade} from "../../../routing";
import {useClassSetter} from "../../../../utils";
import {Fragment} from "react";
import {Body, FlexBox, SubheadingBold} from "../../global";
import {HistoryFillIcon} from "../../../../svg";
import React from "react";

export const PairDisplay = ({base, quote, baseClass}) => {
    const history = useHistory();
    const swapPair = () => history.push(trade.link + `${quote}_${base}`);

    const setClass = useClassSetter(baseClass)[1];

    return(
        <Fragment>
            <FlexBox>
                <Body text={`${base} / ${quote}`} />
                <button className={setClass("change-btn")} onClick={swapPair}>
                    <HistoryFillIcon />
                </button>
            </FlexBox>
            <SubheadingBold text="1,98162542" color="brand" />
        </Fragment>
    )
};