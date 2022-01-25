import {translateStr} from "../../../../utils";
import {TradeBuyForm} from "./tradeBuyForm";
import {TradeSellForm} from "./tradeSellForm";
import {TabsWrapper} from "../../tabs";
import React, {useEffect, useState} from "react";
import {CardLoader} from "../../../layout";

export const OrderCreationTabs = ({orderBook, reloadData: pageDataReload, selectedPrice, handlePriceSelect, ...defaultProps}) => {
    const i18n = translateStr("trade");
    const tradeTabs = ["buy", "sell"].map(el => ({content: i18n(el)}));
    const [reloadForm, setReloadForm] = useState(selectedPrice);

    useEffect(() => {
        setReloadForm(true);
        setTimeout(() => {
            setReloadForm(false);
        }, 500);
    }, [selectedPrice]);

    const reloadData = () => {
        if(handlePriceSelect) handlePriceSelect(false);
        if(pageDataReload) pageDataReload();
    };

    const defaultFormsProps = { ...defaultProps, orderBook, reloadData, selectedPrice };
    const defaultActiveId = !selectedPrice ? 0 : selectedPrice.isAsks ? 0 : 1;
    const isAsks = !selectedPrice || selectedPrice.isAsks;

    return reloadForm
        ? <CardLoader />
        : (
            <TabsWrapper defaultActiveId={defaultActiveId} headingList={tradeTabs}>
                <TradeBuyForm {...defaultFormsProps} selectedPrice={isAsks && selectedPrice} />
                <TradeSellForm {...defaultFormsProps} selectedPrice={!isAsks && selectedPrice} />
            </TabsWrapper>
        )
}