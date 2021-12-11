import {translateStr} from "../../../utils";
import {BroadcastRequest} from "../../../utils/requests";
import {Fragment} from "react";
import {BodyBold, Box, FlexBox, MetadataBold} from "../global";
import {getAssetById} from "../../../redux/actions/assets";
import {ConfirmModal} from "./confirmModal";
import {GreenTextBtn} from "../btn";
import React from "react";

export const NewOrderConfirm = ({tag, btnComponent, ...broadcastProps}) => {
    const i18n = translateStr("fields");
    const {amountToBuy, assetToBuy, amountToSell, assetToSell, resolve} = broadcastProps;

    const action = () => (
        new BroadcastRequest()
            .orderCreate({amountToBuy, amountToSell, assetToSell, assetToBuy})
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
            tag={tag}
            btnComponent={btnComponent ? btnComponent : GreenTextBtn}
            additionalContent={additionalContent}
            action={action}
        />
    )
};