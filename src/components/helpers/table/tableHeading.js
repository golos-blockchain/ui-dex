import React from "react";
import {Box, FlexBox, Metadata} from "../global";
import {useClassSetter} from "../../../utils";
import {SortIcon} from "../../../svg";

export const TableHeading = ({baseClass, tableHead, sortState}) => {
    const setClass = useClassSetter(baseClass)[1];
    const [sort, setSort] = sortState;

    const handleSortChange = (key) => () => {
        const newState = { key: "", type: "" };

        newState.key = key;
        newState.type = sort.key !== key ? "abc" : sort.type === "abc" ? "cba" : "abc";

        setSort(newState);
    };

    return(
        <thead>
            <tr className={setClass("header")}>
                {tableHead.map((el, id) => {
                    const className = `${setClass("cell")} ${el.className ? el.className : ''}`;
                    const content = el.translateTag && (
                        <Metadata
                            content={`tableHeading.${el.translateTag}`}
                            color="font-secondary"
                            additionalData={el.translateParams}
                        />
                    );

                    return (
                        <th key={id} className={className}>
                            {el.isSortable
                                ? (
                                    <button onClick={handleSortChange(el.key)}>
                                        <FlexBox>
                                            {content}
                                            <Box ml={.5}>
                                                <SortIcon />
                                            </Box>
                                        </FlexBox>
                                    </button>
                                ) : (
                                    content
                                )
                            }
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
};