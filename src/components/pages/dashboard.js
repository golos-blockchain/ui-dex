import React from "react";
import {Card, FlexBox, H2, MetadataBold} from "../helpers/global";
import {wallet} from "../routing/";
import {Link} from "react-router-dom";
import {TabsWrapper} from "../helpers/tabs";

export const Dashboard = () => {
    return(
        <div>
            <Card p={4}>
                <FlexBox mb={.4} justify="space-between">
                    <H2 text="Баланс" />
                    <MetadataBold
                        text="В кошелек"
                        component={Link}
                        to={wallet.link}
                    />
                </FlexBox>
                <TabsWrapper headingList={[{text: "first"},{text: "second"}]}>
                    <div>first tab</div>
                    <div>second tab</div>
                </TabsWrapper>
            </Card>
        </div>
    )
};