import React, {Fragment} from "react";
import {Box, FlexBox, H1, Heading, Metadata, Subheading} from "../../global";
import {BrandTextBtn} from "../../btn";
import {clsx, translateStr} from "../../../../utils";
import {Table} from "../../table";
import {TableActionDropdown} from "../../dropdown";

const NodeActions = ({address}) => {
    const i18n = translateStr("settings");

    const list = [
        {
            content: "connectNode",
            onClick: () => { console.log(address) }
        },
        {
            content: "editNode",
            onClick: () => { console.log(address) }
        },
        {
            content: "deleteNode",
            color: "error",
            onClick: () => { console.log(address) }
        }
    ].map((({content, onClick, color}, id) => (
        <div key={id} onClick={onClick}>
            <Metadata content={i18n(content)} color={color} />
        </div>
    )));

    return <TableActionDropdown list={list} />
};

const NodeTable = ({list}) => {
    const heading = [
        {
            key: 'name',
            translateTag: 'name',
            handleItem: (item) => <Metadata text={item} />,
            className: 'fit-content',
        },
        {
            key: 'address',
            translateTag: 'address',
            handleItem: (item) => <Metadata text={item} />,
            className: 'fit-content'
        },
        {
            key: 'isAvailable',
            translateTag: 'status',
            handleItem: (isAvailable) => <span className={clsx("status-dot", isAvailable ? "success" : "error")} />,
            className: 'align-center'
        },
        {
            key: 'ping',
            translateTag: 'ping',
            handleItem: (item) => <Metadata text={`${item}мс`} />,
            className: 'align-center',
        },
        {
            key: 'address',
            translateTag: 'actions',
            handleItem: (item) => <NodeActions address={item} />,
            className: 'align-right'
        }
    ];

    return <Table tableHead={heading} rows={list} />
};


export const Nodes = () => {
    const i18n = translateStr("settings");

    const activeNode = [
        {
            name: "Node 1",
            address: "wss://www.zencorporation.com/",
            isAvailable: true,
            ping: 121
        }
    ];
    const nodesList = [
        {
            name: "Node 1",
            address: "wss://www.zencorporation.com/",
            isAvailable: true,
            ping: 121
        },
        {
            name: "Node 1",
            address: "wss://www.zencorporation.com/",
            isAvailable: false,
            ping: 0
        },
        {
            name: "Node 1",
            address: "wss://www.zencorporation.com/",
            isAvailable: true,
            ping: 121
        },
        {
            name: "Node 1",
            address: "wss://www.zencorporation.com/",
            isAvailable: false,
            ping: 0
        }
    ];

    return(
        <Fragment>
            <FlexBox mt={1} justify="space-between" align="center">
                <Heading content={i18n("nodes")} />
                <BrandTextBtn content={i18n("addNode")} />
            </FlexBox>
            <Box mt={.8}>
                <Subheading content={i18n("connected")} />
                <Box mt={1}>
                    <NodeTable list={activeNode} />
                </Box>
            </Box>
            <Box mt={1.7}>
                <Subheading content={i18n("nodesList")} />
                <Box mt={1}>
                    <NodeTable list={nodesList} />
                </Box>
            </Box>
        </Fragment>
    )
};