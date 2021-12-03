import React from "react";
import {ApiRequest} from "../../../../utils/requests";
import {clsx, LoadData, useClassSetter} from "../../../../utils";
import {getUserData} from "../../../../redux/actions/userData";
import {handleUserHistory} from "../../../../utils/dataHandlers";
import {FlexBox, Metadata} from "../../global";

export const DashboardHistory = () => {
    const [baseClass, setClass] = useClassSetter("dashboard-history");
    const fn = () => new ApiRequest().getUserHistoryByName(getUserData().name).then(handleUserHistory);
    const [data, isLoading] = LoadData(fn);

    if(isLoading) return "Loading";

    return(
        <div className={clsx(baseClass, "custom-scroll")}>
            <div className={setClass("scroll-wrapper")}>
                {data.slice(0, 20).map((el, id) => (
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
                            <div>{new Date(el.timestamp).toLocaleString()}</div>
                        </div>
                    </FlexBox>
                ))}
            </div>
        </div>
    )
};