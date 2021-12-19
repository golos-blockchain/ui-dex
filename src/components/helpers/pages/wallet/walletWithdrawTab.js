import React from "react";
import {Fragment, useState} from "react";
import {translateStr} from "../../../../utils";
import {Body, Box, HeadingBold, Metadata} from "../../global";
import {getAssets} from "../../../../redux/actions/assets";
import {Select} from "../../dropdown";

export const WalletWithdrawTab = () => {
    const i18n = translateStr("wallet.withdraw");
    const [selected, setSelected] = useState();
    const {list: rawList, params} = getAssets();

    const list = rawList
        .map((symbol, id) => ({id: String(id), text: symbol}))
        .filter(el => params[el.text].withdrawal);

    const selectedAsset = rawList[selected];
    const activeWithdrawal = selectedAsset && params[selectedAsset].withdrawal;
    const activeWithdrawalPrefix = activeWithdrawal && activeWithdrawal.ways && activeWithdrawal.ways[0].prefix;

    const withdrawItemsList = [ "details", "to", "min_amount" ];

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
                {activeWithdrawal && (
                    <Fragment>
                        {withdrawItemsList.map(key => (
                            activeWithdrawal[key] && (
                                <Box key={key} mt={2.5}>
                                    <Box>
                                        <Metadata content={i18n(key)} color="font-secondary"/>
                                    </Box>
                                    <Body text={activeWithdrawal[key]} />
                                </Box>
                            )))
                        }
                        {activeWithdrawalPrefix && (
                            <Box mt={2.5}>
                                <Box>
                                    <Metadata content={i18n("memo")} color="font-secondary"/>
                                </Box>
                                <Body text={activeWithdrawalPrefix} />
                            </Box>
                        )}
                    </Fragment>
                )}
            </Box>
        </Fragment>
    )
};