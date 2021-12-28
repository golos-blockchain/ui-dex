import React, {Fragment} from "react";
import {translateStr} from "../../../utils";
import {ApiRequest, BroadcastRequest} from "../../../utils/requests";
import {BodyBold, Box, FlexBox, MetadataBold} from "../global";
import {ConfirmModal} from "./confirmModal";
import {GreenTextBtn} from "../btn";
import {handleAssetsRequest} from "../../../utils/dataHandlers";
import {setAssets} from "../../../redux/actions/assets";

export const NewAssetConfirmation = (props) => {
    const i18n = translateStr("fields");
    const i18nCheckbox = translateStr("checkboxes");
    const {
        maxNum,
        ticker,
        tokenIcon,
        tokenDesc,
        allowFee,
        allowOverrideTransfer,
        resolve
    } = props;

    const action = () => {
        const max = `${maxNum} ${ticker}`;

        const metadataObj = {};

        if(tokenIcon) metadataObj.image_url = tokenIcon;
        if(tokenDesc) metadataObj.description = tokenDesc;

        const metadata = JSON.stringify(metadataObj);

        return new BroadcastRequest().assetCreate(max, allowFee, allowOverrideTransfer, metadata)
            .then(async res => {
                await new ApiRequest().getAssets().then(handleAssetsRequest).then(setAssets);
                return res;
            })
            .then(resolve);
    };

    const additionalContent = (
        <Fragment>
            <FlexBox mt={1}>
                <Box mr={6}>
                    <MetadataBold content={i18n("ticker")} color="font-secondary" />
                    <div><BodyBold text={ticker} /></div>
                </Box>
                <Box>
                    <MetadataBold content={i18n("maxNum")} color="font-secondary" />
                    <div><BodyBold text={maxNum} /></div>
                </Box>
            </FlexBox>
            <Box mt={2}>
                <MetadataBold content={i18n("tokenIcon")} color="font-secondary" />
                <div><BodyBold text={tokenIcon} style={{wordBreak: "break-all"}} /></div>
            </Box>
            <Box mt={2}>
                <MetadataBold content={i18n("tokenDesc")} color="font-secondary" />
                <div><BodyBold text={tokenDesc} /></div>
            </Box>
            <Box mt={2}>
                <MetadataBold content={i18nCheckbox("allowFee")} color={allowFee ? "success" : "error"} />
            </Box>
            <Box mt={2} mb={1}>
                <MetadataBold content={i18nCheckbox("allowOverrideTransfer")} color={allowOverrideTransfer ? "success" : "error"} />
            </Box>
        </Fragment>
    );

    return(
        <ConfirmModal
            tag="newAsset"
            btnComponent={GreenTextBtn}
            additionalContent={additionalContent}
            action={action}
        />
    )
};