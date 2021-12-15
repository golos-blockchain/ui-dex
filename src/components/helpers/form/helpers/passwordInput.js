import React, {useState} from "react";
import {PasswordHideIcon, PasswordShowIcon} from "../../../../svg";
import {Input} from "./input";

export const PasswordInput = props => {
    const [showPassword, setPasswordState] = useState(false);
    const IC = showPassword ? PasswordShowIcon :  PasswordHideIcon;
    const icon = () => (
        <button type="button" onClick={() => setPasswordState(!showPassword)}>
            <IC />
        </button>
    );
    return(
        <Input {...props} type={showPassword ? "text" : "password"} iconRight={icon} />
    )
};