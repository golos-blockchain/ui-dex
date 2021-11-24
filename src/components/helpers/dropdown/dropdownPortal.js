import {useEffect} from "react";
import {createPortal} from "react-dom";

export const DropdownPortal = ({component}) => {
    const body = document.getElementById("root");
    const el = document.createElement('div');

    useEffect(() => {
        body.appendChild(el);
        return () => body.removeChild(el);
    }, []);

    return createPortal(
        component,
        el
    )
};