import {connect} from "react-redux";
import {connectLocale} from "../../../../redux/actions";
import {defaultLocales, setLocale} from "../../../../utils/locale";
import {Select} from "../../dropdown";
import React from "react";

export const LanguageChange = connect(connectLocale)(({locale}) => {

    const list = defaultLocales.map((el, id) => ({ id, text: el.title }));
    const value = defaultLocales.findIndex(el => el.type === locale);
    const onChange = ({value}) => setLocale(defaultLocales[value].type);

    return(
        <Select
            name="language"
            list={list}
            value={value}
            onChange={onChange}
        />
    );
});