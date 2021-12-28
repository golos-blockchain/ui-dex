import React, {Fragment} from "react";
import {Route, Switch} from "react-router";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {connectUserData} from "../../redux/actions/userData";
import {useClassSetter} from "../../utils";
import {Body, Box, Divider, FlexBox} from "../helpers/global";
import {cabinetMenu} from "../routing/";
import {Dashboard} from "./dashboard";
import {Wallet} from "./wallet";
import {Orders} from "./orders";
import {UserHistory} from "./userHistory";
import {Settings} from "./settings";
import {LoginScreen} from "../helpers/pages/cabinet";
import {AssetCreate} from "./assetCreate";

const CabinetLayout = () => {
    const [baseClass, setClass] = useClassSetter("cabinet-layout");

    const components = {
        dashboard: Dashboard,
        wallet: Wallet,
        orders: Orders,
        history: UserHistory,
        assetCreate: AssetCreate,
        settings: Settings
    };

    return(
        <FlexBox className={baseClass} align="stretch">
            <aside className={setClass("menu")}>
                {cabinetMenu.map(({icon: IC, tag, link}, id) => {
                    return (
                        <Fragment key={id}>
                            {id === cabinetMenu.length - 2 && (
                                <Box w={17.8} mx="auto" pt={1.5} pb={2.5}><Divider /></Box>
                            )}
                            <NavLink className={setClass("menu-item")} to={link} exact>
                                { IC && <IC /> }
                                <Body content={`${tag}.title`} />
                            </NavLink>
                        </Fragment>
                    )
                })}
            </aside>
            <div className={setClass("content")}>
                <Switch>
                    {cabinetMenu.map((el, id) => (
                        <Route exact key={id} path={el.link} component={components[el.tag]} />
                    ))}
                </Switch>
            </div>
        </FlexBox>
    )
};

const Display = ({userData}) => userData ? <CabinetLayout /> : <LoginScreen />;

export const Cabinet = connect(connectUserData)(Display);