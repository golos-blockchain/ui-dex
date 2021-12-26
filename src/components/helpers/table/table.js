import React, {useState} from "react";
import {Body} from "../global";
import {clsx, useClassSetter} from "../../../utils";
import {TableHeading} from "./tableHeading";

const TableScrollWrapper = ({children, maxHeight}) => {
    const [baseClass, setClass] = useClassSetter("table-scroll");
    return(
        <div className={clsx(baseClass, "custom-scroll")} style={{"--mh": maxHeight}}>
            <div className={setClass("content-wrapper")}>
                {children}
            </div>
        </div>
    )
};

const TableDisplay = ({tableHead, rows = [], className, itemComponent, reloadData, onRowClick, defaultSortKey, disableDivider, disableHead}) => {
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
        <table className={clsx(baseClass, className, disableHead && "hidden-head", disableDivider && "hidden-divider")}>
            <TableHeading {...headingProps} />
            <tbody>
            {sortedData.map((row, id) => {
                const rowClick = onRowClick ? () => onRowClick(row) : undefined;
                const classNames = clsx(setClass("row"), rowClick && "w-hover");
                return (
                    <tr key={id} className={classNames} onClick={rowClick}>
                        {tableHead.map((col, id) => {

                            const className = `${setClass("cell")} ${col.className ? col.className : ''}`;
                            const item = row[col.key];
                            const content = col.handleItem ? col.handleItem(item, row, reloadData) : item;
                            const Component = itemComponent ? itemComponent : Body;

                            return (
                                <td key={id} className={className}>
                                    {["string", "number"].includes(typeof content)
                                        ? (
                                            <Component text={content} />
                                        ) : (
                                            content
                                        )
                                    }
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};

export const Table = ({maxHeight, ...tableProps}) => {
    const table = <TableDisplay {...tableProps} />;

    return maxHeight
        ? <TableScrollWrapper maxHeight={maxHeight} children={table} />
        : table;
};