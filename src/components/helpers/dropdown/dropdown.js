import React, {useRef, useState} from "react";
import {clsx} from "../../../utils";
import {DropdownPortal} from "./dropdownPortal";
import {DefaultDropdown, DropdownBtn} from "./defaultDropdown";

export const Dropdown = ({
     className,
     btnContent,
     dropdownComponent,
     btnLabel,
     btnComponent,
     positioningFunc,
     dropdownList,
     hideDivider,
     disabled,
     error
}) => {
    const Btn = btnComponent || DropdownBtn;
    const DropdownComponent = dropdownComponent || DefaultDropdown;

    const ref = useRef();
    const [isOpen, setOpenState] = useState(false);

    const toggleOpenState = () => !disabled && setOpenState(!isOpen);

    const btnProps = { btnContent, btnLabel, btnComponent, toggleOpenState };
    const dropdownProps = {...btnProps, blockRef: ref, positioningFunc, hideDivider, dropdownList};

    return(
        <div ref={ref} className={clsx("dropdown", isOpen && "open", disabled && "disabled", error && "error", className)}>
            <div>
                <Btn {...btnProps} />
            </div>
            { isOpen && <DropdownPortal component={<DropdownComponent {...dropdownProps} />} /> }
        </div>
    )
};