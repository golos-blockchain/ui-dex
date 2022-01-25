import React, {Fragment} from "react";
import {BroadcastRequest} from "../../../../utils/requests";
import {closeModal} from "../../../../redux/actions";
import {Body, Box, Heading} from "../../global";
import {Form, Input, NumberInput} from "../../form/helpers";
import {assetEditSchema, assetIssueSchema} from "../../form/validation";
import {BrandTextBtn} from "../../btn";
import {getAssetsList} from "../../../../redux/actions/assets";
import {CheckboxList} from "../../form/helpers/checkboxList";
import {translateStr} from "../../../../utils";

export const AssetEditModal = ({asset, reloadData}) => {
    const i18n = translateStr("assetPage");
    const assetsListRaw = getAssetsList().filter(symbol => symbol !== asset.symbol);
    const assetsList = assetsListRaw.map(symbol => ({name: symbol, text: symbol}));
    const whitelist = asset.symbols_whitelist && asset.symbols_whitelist.length ? asset.symbols_whitelist : assetsListRaw;

    const defaultData = { feePercent: String(asset.fee_percent), tokenIcon: asset.image_url, tokenDesc: asset.description, whitelist }

    const req = async ({whitelist: whitelistRaw, feePercent, tokenIcon, tokenDesc}) => {
        const metadataObj = {};

        if(tokenIcon) metadataObj.image_url = tokenIcon;
        if(tokenDesc) metadataObj.description = tokenDesc;

        const metadata = JSON.stringify(metadataObj);

        const whitelist = whitelistRaw.length === assetsListRaw.length ? [] : whitelistRaw;
        const fee_percent = Number(feePercent);

        return new BroadcastRequest().assetUpdate(asset.symbol, whitelist, fee_percent, metadata);
    };

    const handleResult = () => {
        if(reloadData) reloadData();
        closeModal();
    };

    return(
        <Fragment>
            <Heading content={i18n("editAssetData")} additionalData={{symbol: asset.symbol}} />
            <Box mt={2}>
                <Form
                    defaultData={defaultData}
                    schema={assetEditSchema}
                    request={req}
                    handleResult={handleResult}
                >{formData => (
                    <Fragment>
                        <NumberInput
                            name="feePercent"
                            min={0}
                            max={100}
                            step={1}
                            formData={formData}
                            disabled={!asset.allow_fee}
                            assetSymbol="%"
                        />
                        <Input name="tokenIcon" formData={formData} />
                        <Input name="tokenDesc" formData={formData} />
                        <Box>
                            <Body content={i18n("whitelistTitle")} />
                            <CheckboxList name="whitelist" list={assetsList} formData={formData} />
                        </Box>
                        <Box mt={3}>
                            <BrandTextBtn type="submit" content={i18n("editAssetBtn")} />
                        </Box>
                    </Fragment>
                )}</Form>
            </Box>
        </Fragment>
    )
}