import React from "react";
import {useState} from "react";
import {TabsHeader} from "./tabsHeader";
import {Box} from "../global";

export const TabsWrapper = ({headingList, children}) => {
    const [activeTab, changeActiveTab] = useState(0);

    return(
        <div className="tabs">
            <TabsHeader list={headingList} handleClick={changeActiveTab} />
            <Box pt={2}>
                {children[activeTab]}
            </Box>
        </div>
    );
};