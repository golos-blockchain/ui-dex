import React, {Fragment} from "react";
import {BroadcastRequest} from "../../../utils/requests";
import {ConfirmModal} from "./confirmModal";
import {GreenTextBtn} from "../btn";
import {BodyBold, Box, FlexBox, HeadingBold, MetadataBold} from "../global";
import {translateStr} from "../../../utils";
import {getAssetById} from "../../../redux/actions/assets";

export const TrxConfirm = ({from, to, summ, asset: assetId, memo, resolve}) => {
    const i18n = translateStr("fields");
    const asset = getAssetById(assetId);
    const amount = `${summ} ${asset.symbol}`;
    const action = () => new BroadcastRequest().transfer({to, amount: summ, asset: assetId, memo}).then(resolve);

    const additionalContent = (
        <Fragment>
            <Box mt={1}>
               <BodyBold content={i18n("summ")} color="font-secondary" />
               <HeadingBold text={amount} color="brand" />
            </Box>
            <FlexBox mt={1}>
                <Box mr={6}>
                   <MetadataBold content={i18n("from")} color="font-secondary" />
                   <div><BodyBold text={`@${from}`} /></div>
                </Box>
                <Box>
                   <MetadataBold content={i18n("to")} color="font-secondary" />
                    <div><BodyBold text={`@${to}`} /></div>
                </Box>
            </FlexBox>
            {memo && (
                <Box mt={1}>
                    <MetadataBold content={i18n("memo")} color="font-secondary" />
                    <div><BodyBold text={memo} /></div>
                </Box>
            )}
        </Fragment>
    );

    return(
        <ConfirmModal
            tag="trx"
            btnComponent={GreenTextBtn}
            additionalContent={additionalContent}
            action={action}
        />
    )
};