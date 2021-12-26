import React from "react";

export const Burger = ({toggleMenu}) => {
    return(
        <button onClick={toggleMenu} className="burger">
            <span />
            <span />
            <span />
        </button>
    );
};