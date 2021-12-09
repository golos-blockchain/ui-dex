import {translateStr} from "../../../utils";
import {getAssetById} from "../../../redux/actions/assets";
import {BroadcastRequest} from "../../../utils/requests";
import {Fragment} from "react";
import {BodyBold, Box, FlexBox, MetadataBold} from "../global";
import {ConfirmModal} from "./confirmModal";
import {GreenTextBtn} from "../btn";
import React from "react";

export const DashboardBuyConfirm = ({amountToBuy, amountToSell, assetToSell, assetToBuy, resolve}) => {
    const i18n = translateStr("fields");

    const action = () => (
        new BroadcastRequest()
            .orderCreate({amountToBuy, amountToSell, assetToSell, assetToBuy, fillOrKill: true})
            .then(resolve)
    );

    const additionalContent = (
        <Fragment>
            <FlexBox mt={1}>
                <Box mr={6}>
                    <MetadataBold content={i18n("amountToSell")} color="font-secondary" />
                    <div><BodyBold text={`${amountToSell} ${getAssetById(assetToSell).symbol}`} /></div>
                </Box>
                <Box>
                    <MetadataBold content={i18n("amountToBuy")} color="font-secondary" />
                    <div><BodyBold text={`${amountToBuy} ${getAssetById(assetToBuy).symbol}`} /></div>
                </Box>
            </FlexBox>
        </Fragment>
    );

    return(
        <ConfirmModal
            tag="dashboardBuy"
            btnComponent={GreenTextBtn}
            additionalContent={additionalContent}
            action={action}
        />
    )
};