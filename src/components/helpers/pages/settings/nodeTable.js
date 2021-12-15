import React from "react";
import {Metadata} from "../../global";
import {TableActionDropdown} from "../../dropdown";
import {TransparentBtn} from "../../btn";
import {Table} from "../../table";
import {generateModal} from "../../../../redux/actions";
import {clsx, connectToNodeOnClick, translateStr} from "../../../../utils";
import {ConnectIcon} from "../../../../svg";
import {DeleteNodeModal, EditNodeModal} from "./nodeModals";


const NodeActions = ({isActiveNode, ...props}) => {
    const i18n = translateStr("settings");

    const defaultList = [{
        content: "connectNode",
        onClick: connectToNodeOnClick(props.id)
    }];

    const additionalList = [
        {
            content: "editNode",
            onClick: generateModal(<EditNodeModal defaultData={props} />)
        },
        {
            content: "deleteNode",
            color: "error",
            onClick: generateModal(<DeleteNodeModal {...props} />)
        }
    ];

    const actionsList = isActiveNode ? additionalList : [...defaultList, ...additionalList];
    const list = actionsList.map((({content, onClick, color}, id) => (
        <div key={id} onClick={onClick}>
            <Metadata content={i18n(content)} color={color} />
        </div>
    )));

    return <TableActionDropdown list={list} />
};

export const NodeTable = ({list, isActiveNode, isUserNode}) => {
    const rowAction = isUserNode
        ? (id, row) => <NodeActions isActiveNode={isActiveNode} {...row} />
        : (id) => (
            <TransparentBtn onClick={connectToNodeOnClick(id)} disabled={isActiveNode}>
                <ConnectIcon />
            </TransparentBtn>
        );


    const heading = [
        {
            key: 'title',
            translateTag: 'name',
            handleItem: (item) => <Metadata text={item} />,
            className: 'fit-content',
        },
        {
            key: 'url',
            translateTag: 'address',
            handleItem: (item) => <Metadata text={item} />,
            className: 'fit-content'
        },
        {
            key: 'ping',
            translateTag: 'status',
            handleItem: (ping) => <span className={clsx("status-dot", ping > 0 ? "success" : "error")} />,
            className: 'align-center'
        },
        {
            key: 'ping',
            translateTag: 'ping',
            handleItem: (item) => <Metadata text={`${item}мс`} />,
            className: 'align-center',
        },
        {
            key: 'id',
            translateTag: 'actions',
            handleItem: rowAction,
            className: 'align-center'
        }
    ];

    return <Table tableHead={heading} rows={list} />
};