import React, {Fragment, useState} from "react";
import {translateStr} from "../../../../utils";
import {Body, Box, HeadingBold, Metadata} from "../../global";
import {getAssets} from "../../../../redux/actions/assets";
import {Select} from "../../dropdown";

export const WalletDepositTab = () => {
    const i18n = translateStr("wallet.deposit");
    const [selected, setSelected] = useState();
    const {list: rawList, params} = getAssets();

    const list = rawList
        .map((symbol, id) => ({id: String(id), text: symbol}))
        .filter(el => params[el.text].deposit);


    const selectedAsset = rawList[selected];
    const activeDeposit = selectedAsset && params[selectedAsset].deposit;

    const depositItemsList = [
        "details",
        "to_transfer",
        "memo_transfer",
        "min_amount",
        "fee"
    ];

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
                {activeDeposit && depositItemsList.map(key => (
                    activeDeposit[key] && (
                        <Box key={key} mt={2.5}>
                            <Box>
                                <Metadata content={i18n(key)} color="font-secondary"/>
                            </Box>
                            <Body text={activeDeposit[key]} />
                        </Box>
                    )
                ))}
            </Box>
        </Fragment>
    )
};