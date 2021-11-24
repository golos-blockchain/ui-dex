import {clsx, useClassSetter} from "../../../../utils";
import {CardViewIcon, TableViewIcon} from "../../../../svg";
import {FlexBox} from "../../global";
import React from "react";

export const ViewChange = ({cardViewState}) => {
    const [baseClass, setClass] = useClassSetter("view-change");

    const [isCardView, setCardView] = cardViewState;
    const onIconClick = (bool) => () => setCardView(bool);

    const items = [
        {icon: TableViewIcon, isActive: !isCardView, paramToSet: false},
        {icon: CardViewIcon, isActive: isCardView, paramToSet: true}
    ];

    return(
        <FlexBox className={baseClass}>
            {items.map(({icon: IC, isActive, paramToSet}, id) => (
                <button
                    key={id}
                    className={clsx(setClass("btn"), isActive && "active")}
                    onClick={onIconClick(paramToSet)}
                >
                    { IC && <IC /> }
                </button>
            ))}
        </FlexBox>
    );
};
