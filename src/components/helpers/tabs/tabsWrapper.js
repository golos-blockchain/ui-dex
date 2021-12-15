import React from "react";
import {useState} from "react";
import {TabsHeader} from "./tabsHeader";
import {Box} from "../global";

export const TabsWrapper = ({headingList, defaultActiveId = 0, children}) => {
    const [activeTab, changeActiveTab] = useState(defaultActiveId);

    return(
        <div className="tabs">
            <TabsHeader list={headingList} defaultActiveId={defaultActiveId} handleClick={changeActiveTab} />
            <Box pt={2}>
                {children[activeTab]}
            </Box>
        </div>
    );
};