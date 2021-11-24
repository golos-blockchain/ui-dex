import React from "react";
import {connect} from "react-redux";
import {connectNightMode} from "../../redux/actions";
import {clsx, handleNightModeChange, useClassSetter} from "../../utils";
import {DayThemeIcon, NightThemeIcon} from "../../svg";

const Display = (props) => {
    const [baseClass, setClass] = useClassSetter("theme-switch");
    const isNightMode = props.nightMode;

    return(
        <button className={clsx(baseClass, isNightMode && "active")} onClick={handleNightModeChange}>
            <div className={setClass("night-icon")}>
                <NightThemeIcon />
            </div>
            <div className={setClass("day-icon")}>
                <DayThemeIcon />
            </div>
            <div className={setClass("caret")} />
        </button>
    );
};

export const ThemeSwitch = connect(connectNightMode)(Display);