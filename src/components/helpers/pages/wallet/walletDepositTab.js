import React, {Fragment, useState} from "react";
import {translateStr} from "../../../../utils";
import {Body, Box, HeadingBold} from "../../global";
import {getAssets} from "../../../../redux/actions/assets";
import {Select} from "../../dropdown";

export const WalletDepositTab = () => {
    const i18n = translateStr("wallet");
    const [selected, setSelected] = useState();
    const {list: rawList, params} = getAssets();

    const list = rawList.filter(el => params[el.symbol].deposit).map(el => ({id: el.id, text: el.symbol}));

    const selectedAsset = rawList[selected];
    const activeDeposit = selectedAsset && params[selectedAsset.symbol].deposit;

    return(
        <Fragment>
            <Box p={2}>
                <HeadingBold content={i18n("deposit")} />
                <Body content={i18n("depositDesc")} />
                <Box mt={3}>
                    <Select
                        name="asset"
                        list={list}
                        value={selected}
                        onChange={({value}) => setSelected(value)}
                    />
                </Box>
                {activeDeposit && activeDeposit.details && (
                    <Box mt={2.5}>
                        <Body text={activeDeposit.details} />
                    </Box>
                )}
            </Box>
        </Fragment>
    )
};