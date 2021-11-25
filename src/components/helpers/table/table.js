import React, {useState} from "react";
import {Body} from "../global";
import {useClassSetter} from "../../../utils";
import {TableHeading} from "./tableHeading";

export const Table = ({tableHead, rows = [], reloadData, defaultSortKey}) => {
    const [baseClass, setClass] = useClassSetter("table");
    const sortState = useState({key: defaultSortKey, type: "abc"});

    const sort = sortState[0];

    const sortedData = !sort.key ? rows : rows.sort((prev, next) => {
        let prevParam = prev[sort.key];
        let nextParam = next[sort.key];

        const sortByType = sort.type === "abc" ? prevParam < nextParam : prevParam > nextParam;

        return sortByType ? 1 : -1;
    });

    const headingProps = {baseClass, tableHead, sortState};

    return(
        <table className={baseClass}>
            <TableHeading {...headingProps} />
            <tbody>
                {sortedData.map((row, id) => (
                    <tr key={id} className={setClass("row")}>
                        {tableHead.map((col, id) => {

                            const className = `${setClass("cell")} ${col.className ? col.className : ''}`;
                            const item = row[col.key];
                            const content = col.handleItem ? col.handleItem(item, row, reloadData) : item;

                            return (
                                <td key={id} className={className}>
                                    {typeof content === "string"
                                        ? (
                                            <Body text={content} />
                                        ) : (
                                            content
                                        )
                                    }
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};