import React from "react";
import {cabinet, trade} from "../routing/path";
import {Cabinet, NotFound, Trade} from "../pages";
import {Redirect, Route, Switch} from "react-router";

export const DefaultRoutes = () => {
    const routes = [
        { ...trade, component: Trade },
        { ...cabinet, component: Cabinet }
    ];

    return(
        <Switch>
            {routes.map((el, id) => {
                const {link, component, isExact} = el;
                return (
                    <Route key={id} path={link} component={component} exact={isExact} />
                )
            })}
            <Redirect from="/" to={trade.link} exact />
            <Route component={NotFound} />
        </Switch>
    )
}