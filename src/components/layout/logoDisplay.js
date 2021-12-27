import {connect} from "react-redux";
import {connectSettings} from "../../redux/actions";
import {Logo, LogoDark} from "../../svg";
import React from "react";
import {Link} from "react-router-dom";

const Display = props => {
    const nightMode = props.settings.nightMode;
    const Icon = nightMode ? LogoDark : Logo;

    return <Link to="/"><Icon /></Link>;
};

export const LogoDisplay = connect(connectSettings)(Display);