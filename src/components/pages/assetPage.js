import React, {Fragment} from "react";
import {LoadData, translateStr} from "../../utils";
import {Box, Card, Heading} from "../helpers/global";
import {TabsWrapper} from "../helpers/tabs";
import {AssetCreate, AssetsList} from "../helpers/pages/assetPage";
import {PageLoader} from "../layout";
import {ApiRequest} from "../../utils/requests";
import {getUserData} from "../../redux/actions/userData";

export const AssetPage = () => {
    const i18n = translateStr("assetPage");
    const tabsHeading = ["list", "create"].map(key => ({content: i18n(key)}));

    const request = () => new ApiRequest().getCreatedAssets(getUserData().name).then(res => {
        return res.map(el => {
            const {image_url, description} = JSON.parse(el.json_metadata);
            const [max_supply, symbol] = el.max_supply.split(" ");
            const can_issue = el.can_issue.split(" ")[0];

            return {...el, max_supply, symbol, can_issue, image_url, description};
        })
    });
    const [list, isLoading, reloadData] = LoadData(request);

    if(isLoading) return <PageLoader />;

    return list && list.length
        ? (
            <Card>
                <TabsWrapper headingList={tabsHeading}>
                    <AssetsList list={list} reloadData={reloadData} />
                    <AssetCreate reloadData={reloadData} />
                </TabsWrapper>
            </Card>
        ) : (
            <Card>
                <Heading content={i18n("create")} />
                <Box mt={2}>
                    <AssetCreate reloadData={reloadData} />
                </Box>
            </Card>
        );
};