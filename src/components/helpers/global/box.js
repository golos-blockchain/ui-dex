import React from "react";
import {clsx} from "../../../utils";

export const formRemVal = val => typeof val === 'string' ? val : `${val}rem`;

const formPositionStyles = (props, type) => {
    const objKey = `--${type}`;
    const result = {};

    let hasChanges = false;
    let resultString = "";

    const resultArr = [0,0,0,0];

    const exceptions = ["mw", "mh"];

    const positions = {
        t: [0],
        r: [1],
        b: [2],
        l: [3],
        y: [0,2],
        x: [1,3]
    }

    for(let key in props) {
        if(!props[key]) continue;
        if(key.length > 2 || !key.includes(type) || exceptions.includes(key)) continue;

        if(key === type) {
            hasChanges = true;
            resultString = formRemVal(props[key]);
            break;
        }

        const elPosition = key.split("")[1];
        const positionIndexes = positions[elPosition];

        if(!positionIndexes) continue;

        hasChanges = true;

        positionIndexes.forEach(id => resultArr[id] = formRemVal(props[key]));
    }

    if(hasChanges){
        result[objKey] = resultString || resultArr.join(" ");
    }

    return result;
}

export const Box = ({className, stretch, style = {}, onClick = () => {}, children, ...props}) => {
    const mStyles = formPositionStyles(props, "m");
    const pStyles = formPositionStyles(props, "p");
    const additionalStyles = {};

    for (let key in props) {
        if(['w', 'h', 'mw', 'br', 'mh'].includes(key)) {
            additionalStyles[`--${key}`] = formRemVal(props[key]);
        } else if(['ta', 'pos'].includes(key)) {
            additionalStyles[`--${key}`] = props[key];
        }else if(key === 'f'){
            additionalStyles["flex"] = props[key];
        }
    }

    const styles = {...style, ...mStyles, ...pStyles, ...additionalStyles};

    return(
        <div className={clsx("box", stretch && "stretch", className)} style={styles} onClick={onClick}>
            {children}
        </div>
    );
};