import React from "react";
import {setLocale} from "../../utils/locale";
import {BodyBold} from "../helpers/global";
import {connectLocale} from "../../redux/actions";
import {connect} from "react-redux";

const Display = ({locale}) => {
    const isRuLocal = locale === "ru";

    const onClick = () => {
        const nextLocale = isRuLocal ? "en" : "ru";
        setLocale(nextLocale);
    };

    const baseLocale = isRuLocal ? "ru" : "en";

    return(
        <button className="lang-switch" onClick={onClick}>
            <BodyBold text={baseLocale.toUpperCase()} color="brand" />
        </button>
    );
};

export const LangChange = connect(connectLocale)(Display);