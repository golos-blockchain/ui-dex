import React, {useEffect, useRef, useState} from "react";
import {Body} from "../global";
import {clsx, useClassSetter} from "../../../utils";
import {connectLocale} from "../../../redux/actions";
import {connect} from "react-redux";

const Display = ({list, handleClick, defaultActiveId = 0, itemComponent, locale}) => {
    const C = itemComponent || "button";

    const itemsRef = useRef([]);
    const [baseClass, setClass] = useClassSetter("tabs-heading");
    const [caretParams, setCaretParams] = useState({ "--w": 0, "--l": 0, transition: "0ms" });
    const [activeId, setActiveId] = useState(defaultActiveId);

    const changeCaretPosition = (id, animate) => {
        const node = itemsRef.current[id];
        const transition = animate ? "var(--qSpeed)" : "0ms";

        if(!node) return;

        setCaretParams({ "--w": `${node.offsetWidth}px`, "--l": `${node.offsetLeft}px`, transition });
    };

    useEffect(() => {
        changeCaretPosition(activeId, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale]);

    const onClick = id => () => {
        changeCaretPosition(id, true);
        setActiveId(id);
        if(handleClick) handleClick(id);
    };

    return(
        <div className={baseClass}>
            {list && list.map((el, id) => {
                const { text, content, ...componentData } = el;
                return(
                    <C
                        key={id}
                        ref={el => itemsRef.current[id] = el}
                        {...componentData}
                        className={clsx(setClass("item"), activeId === id && "active")}
                        onClick={onClick(id)}
                    >
                        <Body text={text} content={content} />
                    </C>
                );
            })}
            <div className={setClass("border")} style={caretParams} />
        </div>
    )
};

export const TabsHeader = connect(connectLocale)(Display);