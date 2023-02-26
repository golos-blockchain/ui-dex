import React, {Fragment, useEffect, useState} from "react";
import {LoadData, translateStr} from "../../../../utils";
import {Body, Box, HeadingBold, Metadata} from "../../global";
import {getAssets} from "../../../../redux/actions/assets";
import {Select} from "../../dropdown";
import {getUserData} from "../../../../redux/actions/userData";
import {CardLoader} from "../../../layout";

const DepositDataDisplay = ({i18n, depositItemsList, activeDeposit}) => (
    activeDeposit && depositItemsList.map(key => (
        activeDeposit[key] && (
            <Box key={key} mt={2.5}>
                <Box>
                    <Metadata content={i18n(key)} color="font-secondary"/>
                </Box>
                <Body text={activeDeposit[key]} />
            </Box>
        )
    ))
);

const DepositByAddress = ({i18n, asset, activeDeposit}) => {
    const loadDepositAddress = async () => {
        const userName = getUserData().name;
        const url = `https://gateway.ecurrex.ru/${asset.toLowerCase()}/get_address/${userName}`;
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                if(!res.address || res.address.golos === "golos_account_is_not_exist") return {address: ""};
                return res;
            })
            .catch(err => {
                console.error(err);
                return {address: ""};
            });
    };

    const [data, isLoading, reloadData] = LoadData(loadDepositAddress);

    useEffect(() => {
        if(!isLoading) reloadData();
    }, [asset]);

    const depositItemsList = [
        "details",
        "address",
        "min_amount",
        "fee"
    ];

    return isLoading
        ? <CardLoader />
        : (
            <DepositDataDisplay
                i18n={i18n}
                depositItemsList={depositItemsList}
                activeDeposit={{...activeDeposit, ...data}}
            />
        )
};

const DefaultDeposit = ({i18n, activeDeposit}) => {
    const depositItemsList = [
        "details",
        "to_transfer",
        "memo_transfer",
        "min_amount",
        "fee"
    ];

    return <DepositDataDisplay
        i18n={i18n}
        depositItemsList={depositItemsList}
        activeDeposit={activeDeposit}
    />
}

export const WalletDepositTab = () => {
    const i18n = translateStr("wallet.deposit");
    const [selected, setSelected] = useState();
    const {list: rawList, params} = getAssets();

    const list = rawList
        .map((symbol, id) => ({id: String(id), text: symbol}))
        .filter(el => params[el.text].deposit);


    const selectedAsset = rawList[selected];
    const activeDeposit = selectedAsset && params[selectedAsset].deposit;

    const depositByAddress = ["YMDASH"].includes(selectedAsset);

    const listProps = {i18n, asset: selectedAsset, activeDeposit};

    return(
        <Fragment>
            <Box p={2}>
                <HeadingBold content={i18n("title")} />
                <Body content={i18n("desc")} />
                <Box mt={3}>
                    <Select
                        name="asset"
                        list={list}
                        value={selected}
                        onChange={({value}) => setSelected(value)}
                    />
                </Box>
                {!selectedAsset
                    ? false
                    : depositByAddress
                        ? <DepositByAddress {...listProps} />
                        : <DefaultDeposit {...listProps} />
                }
            </Box>
        </Fragment>
    )
};