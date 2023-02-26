import React, {createRef} from "react";
import {useEffect, useState} from "react";
import {clsx, useClassSetter} from "../../../utils";
import {DropdownBtn} from "./defaultDropdown";
import {Dropdown} from "./dropdown";
import {TableActionsIcon} from "../../../svg";

const TableActionsBtn = ({toggleOpenState}) => (
    <button className="table-actions" onClick={toggleOpenState}>
        <TableActionsIcon />
    </button>
);

const OpenedDropdown = ({blockRef, btnLabel, btnContent, btnComponent, dropdownList, toggleOpenState}) => {
    const DropdownRef = createRef();
    const Btn = btnComponent || DropdownBtn;
    const [baseClass, setClass] = useClassSetter("action-dropdown");
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const [isShown, setShown] = useState();

    const elementPosition = blockRef && blockRef.current ? blockRef.current.getBoundingClientRect() : {};

    const contentStyle = {
        top: elementPosition.top - 14,
        left: elementPosition.left - dropdownWidth + 44
    };

    useEffect(() => {
        setTimeout(() => {
            setDropdownWidth(DropdownRef.current.offsetWidth);
        }, 0);
        setTimeout(() => {
            setShown(true);
        }, 150);
    }, []);

    const closeDropdown = () => {
        setShown(false);
        setTimeout(() => {
            toggleOpenState();
        }, 150);
    };

    return(
        <div className={clsx(baseClass, isShown && "shown")}>
            <div ref={DropdownRef} className={setClass("content")} style={contentStyle}>
                <div className={setClass("btn")}>
                    <Btn btnContent={btnContent} btnLabel={btnLabel} toggleOpenState={closeDropdown} />
                </div>
                <div className={setClass("body")}>
                    {dropdownList && dropdownList.map((el, id) => (
                        <button key={id} className={setClass("list-item")} onClick={closeDropdown}>
                            {el}
                        </button>
                    ))}
                </div>
            </div>
            <div className={setClass("bg-layer")} onClick={closeDropdown} />
        </div>
    )
};

export const TableActionDropdown = ({list}) => {
    return(
        <Dropdown
            btnComponent={TableActionsBtn}
            dropdownComponent={OpenedDropdown}
            dropdownList={list}
        />
    )
};
