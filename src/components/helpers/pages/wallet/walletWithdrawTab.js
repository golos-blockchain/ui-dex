import React from "react";
import {Fragment, useState} from "react";
import {translateStr} from "../../../../utils";
import {Body, Box, HeadingBold} from "../../global";
import {getAssets} from "../../../../redux/actions/assets";
import {Select} from "../../dropdown";

export const WalletWithdrawTab = () => {
    const i18n = translateStr("wallet");
    const [selected, setSelected] = useState();
    const {list: rawList, params} = getAssets();

    const list = rawList.filter(el => params[el.symbol].withdrawal).map(el => ({id: el.id, text: el.symbol}));

    const selectedAsset = rawList[selected];
    const activeWithdrawal = selectedAsset && params[selectedAsset.symbol].withdrawal;

    return(
        <Fragment>
            <Box p={2}>
                <HeadingBold content={i18n("withdraw")} />
                <Body content={i18n("withdrawDesc")} />
                <Box mt={3}>
                    <Select
                        name="asset"
                        list={list}
                        value={selected}
                        onChange={({value}) => setSelected(value)}
                    />
                </Box>
                {activeWithdrawal && activeWithdrawal.details && (
                    <Fragment>
                        <Box mt={2.5}>
                            <Body text={activeWithdrawal.details} />
                        </Box>
                    </Fragment>
                )}
            </Box>
        </Fragment>
    )
};