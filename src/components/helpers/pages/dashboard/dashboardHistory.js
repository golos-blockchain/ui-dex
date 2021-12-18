import React from "react";
import {clsx, useClassSetter} from "../../../../utils";
import {Body, Box, FlexBox, Metadata} from "../../global";

export const DashboardHistory = ({list}) => {
    const [baseClass, setClass] = useClassSetter("dashboard-history");

    return(
        <div className={clsx(baseClass, "custom-scroll")}>
            <div className={setClass("scroll-wrapper")}>
                {list.length
                    ? list.slice(0, 20).map((el, id) => (
                        <FlexBox key={id} className={setClass("item")} justify="space-between">
                            <FlexBox>
                                <div className={setClass("icon")}>
                                    {el.icon}
                                </div>
                                <div className={setClass("info")}>
                                    <Metadata content={`historyTable.${el.type}.title`} color="font-secondary" />
                                    <div>{el.summ}</div>
                                </div>
                            </FlexBox>
                            <div className={setClass("date")}>
                                <Metadata content="tableHeading.dateAndTime" color="font-secondary" />
                                <Box>
                                    <Body text={new Date(el.timestamp).toLocaleString()} />
                                </Box>
                            </div>
                        </FlexBox>
                    )) : (
                        <Body content="history.emptyHistory" />
                    )
                }
            </div>
        </div>
    )
};