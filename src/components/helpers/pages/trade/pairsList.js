import React, {Fragment, useState} from "react";
import {Input} from "../../form/helpers";
import {Box, Metadata} from "../../global";
import {SearchIcon} from "../../../../svg";
import {TabsWrapper} from "../../tabs";
import {getAssets, getAssetsList} from "../../../../redux/actions/assets";

export const PairsList = () => {
    const [search, setSearch] = useState();
    const {list, params} = getAssets();
    const tabsHeading = list.map(el => ({text: el.symbol}));
    return(
        <Fragment>
            <Box>
                <Input
                    name="currency"
                    value={search}
                    iconRight={SearchIcon}
                    onChange={e => setSearch(e.target.value.toUpperCase())}
                />
            </Box>
            {/*<TabsWrapper headingList={tabsHeading}>*/}
                {/*{list.map((base) => {*/}
                    {/*const whitelist = params[base.symbol].whitelist;*/}
                    {/*const quoteList = whitelist.length ? whitelist.map(el => ({symbol: el})) : list.filter(el => el.symbol !== base.symbol);*/}
                    {/*return (*/}
                        {/*<div key={base.symbol}>*/}
                            {/*{quoteList.map(quote => {*/}
                                {/*const show = !search*/}
                                    {/*|| base.symbol.includes(search)*/}
                                    {/*|| quote.symbol.includes(search);*/}

                                {/*return show && (*/}
                                    {/*<Box key={quote.symbol}>*/}
                                        {/*<Metadata text={`${base.symbol} / ${quote.symbol}`} />*/}
                                    {/*</Box>*/}
                                {/*)*/}
                            {/*})}*/}
                        {/*</div>*/}
                    {/*)*/}
                {/*})}*/}
            {/*</TabsWrapper>*/}
        </Fragment>
    )
};