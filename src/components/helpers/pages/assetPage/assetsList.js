import React from "react";
import {BodyBold, FlexBox, Metadata} from "../../global";
import {Table} from "../../table";
import {translateStr, useClassSetter} from "../../../../utils";
import {TableActionDropdown} from "../../dropdown";
import {generateModal} from "../../../../redux/actions";
import {AssetIssueModal} from "./assetIssueModal";
import {AssetNewOwnerModal} from "./assetNewOwnerModal";
import {AssetEditModal} from "./assetEditModal";

const AssetActions = ({asset, reloadData}) => {
    const i18n = translateStr("assetPage");

    const actionsList = [
        {
            content: "edit",
            onClick: generateModal(<AssetEditModal asset={asset} reloadData={reloadData} />)
        },
        {
            content: "issue",
            onClick: generateModal(<AssetIssueModal asset={asset} reloadData={reloadData} />)
        },
        {
            content: "newOwner",
            onClick: generateModal(<AssetNewOwnerModal asset={asset} reloadData={reloadData} />)
        },
    ];

    const list = actionsList.map((({content, onClick, color}, id) => (
        <div key={id} onClick={onClick}>
            <Metadata content={i18n(content)} color={color} />
        </div>
    )));

    return <TableActionDropdown list={list} />
};

export const AssetsList = ({list, reloadData}) => {
    const [baseClass, setClass] = useClassSetter("balances-table");

    const tableHead = [
        {
            key: 'symbol',
            translateTag: 'currency',
            handleItem: (item, row) => (
                <FlexBox className={baseClass}>
                    {row.image_url && (
                        <div className={setClass("image-wrapper")}>
                            <img src={row.image_url} alt={row.fullName} />
                        </div>
                    )}
                    <BodyBold text={item} />
                </FlexBox>
            )
        },
        {
            key: 'max_supply',
            translateTag: 'maxSupply'
        },
        {
            key: 'can_issue',
            translateTag: 'canIssue'
        },
        {
            key: 'fee_percent',
            translateTag: 'fee',
            handleItem: item => `${item}%`
        },
        {
            key: 'symbols_whitelist',
            translateTag: 'whitelist',
            handleItem: item => item.length ? `${item.length} asset${item.length > 1 ? "s" : ""}` : "All",
            className: 'align-center'
        },
        {
            key: 'id',
            translateTag: 'actions',
            handleItem: (item, row) => <AssetActions asset={row} reloadData={reloadData} />,
            className: 'align-center fit-content'
        }
    ];
    return(
        <Table tableHead={tableHead} rows={list} />
    )
};