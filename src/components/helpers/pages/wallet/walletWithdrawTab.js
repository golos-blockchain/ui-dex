import React from "react";
import {Fragment, useState} from "react";
import {i18nGlobal, translateStr} from "../../../../utils";
import {Body, Box, Col, HeadingBold, Metadata, Row} from "../../global";
import {getAssets, getAssetsList} from "../../../../redux/actions/assets";
import {AssetSelect, Select} from "../../dropdown";
import {Form, Input, NumberInput} from "../../form/helpers";
import {MailIcon} from "../../../../svg";
import {getUserData} from "../../../../redux/actions/userData";
import {BrandTextBtn} from "../../btn";
import {generatePromiseModal} from "../../../../redux/actions";
import {TrxConfirm} from "../../confirmModals";
import {withdrawSchemaGenerator} from "../../form/validation";

export const WithdrawForm = ({assetId, withdrawal}) => {
    const from = getUserData().name;
    const symbol = getAssetsList()[assetId];
    const {to, min_amount, ways} = withdrawal;
    const waysList = ways && ways.map((el, id) => ({id: String(id), text: el.prefix}));
    const hasPrefix = ways[0].prefix;

    const req = async ({summ, prefix: prefixIndex, memo: rawMemo}) => {
        const memo = hasPrefix ? `${waysList[prefixIndex].text}${rawMemo}` : rawMemo;
        return generatePromiseModal(TrxConfirm, {from, to, summ, asset: assetId, memo});
    };

    return(
        <Form
            defaultData={{asset: assetId, prefix: "0"}}
            schema={withdrawSchemaGenerator(min_amount)}
            request={req}
            clearOnFinish
        >{formData => {
            const prefixId = formData.state.data.prefix;
            const memo = ways[prefixId].memo;
            return (
                <Fragment>
                    <Row>
                        <Col md={6}>
                            <Input name="from" iconLeft={MailIcon} value={from} disabled />
                        </Col>
                        <Col md={6}>
                            <Input name="to" iconLeft={MailIcon} value={to} disabled />
                        </Col>
                        <Col md={7}>
                            <NumberInput name="summ" comment={min_amount && `Мин.сумма: ${min_amount} ${symbol}`} formData={formData} />
                        </Col>
                        <Col md={5}>
                            <AssetSelect name="asset" value={assetId} disabled />
                        </Col>
                        {hasPrefix && (
                            <Col md={4}>
                                <Box mt={min_amount && 1}>
                                    <Select name="prefix" list={waysList} formData={formData} disabled={waysList.length === 1} />
                                </Box>
                            </Col>
                        )}
                        <Col md={hasPrefix ? 8 : 12}>
                            <Box mt={min_amount && 1}>
                                <Input name="memo" comment={memo && `Введите ${memo}`} formData={formData} />
                            </Box>
                        </Col>
                    </Row>
                    <Box w="fit-content" mt={2} ml="auto">
                        <BrandTextBtn type="submit" content={i18nGlobal("send")} />
                    </Box>
                </Fragment>
            )
        }}</Form>
    )
}

export const WalletWithdrawTab = () => {
    const i18n = translateStr("wallet.withdraw");
    const [selected, setSelected] = useState();
    const {list: rawList, params} = getAssets();

    const list = rawList
        .map((symbol, id) => ({id: String(id), text: symbol}))
        .filter(el => params[el.text].withdrawal);

    const selectedAsset = rawList[selected];
    const activeWithdrawal = selectedAsset && params[selectedAsset].withdrawal;

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
                        {activeWithdrawal.details && (
                            <Box mt={2.5}>
                                <Box>
                                    <Metadata content={i18n("details")} color="font-secondary"/>
                                </Box>
                                <Body text={activeWithdrawal.details} />
                            </Box>
                        )}
                        <Box mt={2.5}>
                            <WithdrawForm
                                assetId={selected}
                                withdrawal={activeWithdrawal}
                            />
                        </Box>
                    </Fragment>
                )}
            </Box>
        </Fragment>
    )
};