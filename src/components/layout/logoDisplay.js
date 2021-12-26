import {connect} from "react-redux";
import {connectSettings} from "../../redux/actions";
import {Logo, LogoDark} from "../../svg";
import React from "react";

const Display = props => {
    const nightMode = props.settings.nightMode;
    const Icon = nightMode ? LogoDark : Logo;

    return <Icon />;
};

export const LogoDisplay = connect(connectSettings)(Display);