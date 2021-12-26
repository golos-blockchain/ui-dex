import React from "react";
import {NavLink} from "react-router-dom";
import {topMenuList} from "../routing/menu";
import {TabsHeader} from "../helpers/tabs/";
import {useLocation} from "react-router";

export const TopMenu = () => {
    const location = useLocation();

    const list = topMenuList.map(el => ({
        content: `${el.tag}.title`,
        to: el.link
    }));

    const defaultActiveId = topMenuList.findIndex(el => (
        location.pathname.includes(el.link)
    ));
    
    return(
        <TabsHeader
            itemComponent={NavLink}
            defaultActiveId={defaultActiveId > 0 ? defaultActiveId : 0}
            list={list}
        />
    )
};