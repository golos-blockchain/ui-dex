import {clsx, useClassSetter} from "../../../utils";
import {CaretIcon} from "../../../svg";
import {useEffect, useState} from "react";
import {Divider} from "../global";
import React from "react";

export const DropdownBtn = ({btnContent, toggleOpenState}) => {
    const [baseClass, setClass] = useClassSetter("dropdown-btn");
    return(
        <button className={baseClass} onClick={toggleOpenState}>
            {btnContent}
            <div className={setClass("caret")}>
                <CaretIcon />
            </div>
        </button>
    )
};

export const DefaultDropdown = ({blockRef, btnLabel, btnContent, btnComponent, dropdownList, toggleOpenState}) => {
    const Btn = btnComponent || DropdownBtn;
    const [baseClass, setClass] = useClassSetter("dropdown-opened");
    const [isShown, setShown] = useState();

    const elementPosition = blockRef && blockRef.current ? blockRef.current.getBoundingClientRect() : {};
    const contentStyle = {
        width: elementPosition.width + 32,
        top: elementPosition.top - 16 + window.scrollY,
        left: elementPosition.left - 16
    };

    useEffect(() => {
        setTimeout(() => {
            setShown(true);
        }, 0);
    }, []);

    const closeDropdown = () => {
        setShown(false);
        setTimeout(() => {
            toggleOpenState();
        }, 150);
    };

    return(
        <div className={clsx(baseClass, isShown && "shown")}>
            <div className={setClass("content")} style={contentStyle}>
                <div className={setClass("btn")}>
                    <Btn btnContent={btnContent} btnLabel={btnLabel} toggleOpenState={closeDropdown} />
                </div>
                <Divider />
                <div className={clsx(setClass("body"), "custom-scroll")}>
                    <div className={setClass("scroll-wrapper")}>
                        {dropdownList && dropdownList.map((el, id) => (
                            <button key={id} className={setClass("list-item")} onClick={closeDropdown}>
                                {el}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={setClass("bg-layer")} onClick={closeDropdown} />
        </div>
    )
};