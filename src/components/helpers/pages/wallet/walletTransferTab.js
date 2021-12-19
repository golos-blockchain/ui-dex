import React, {Fragment} from "react";
import {translateStr} from "../../../../utils";
import {Body, Box, HeadingBold} from "../../global";
import {TransferForm} from "../cabinet";
import {fetchUserData} from "../../../../utils/dataHandlers";
import {getUserData, updateUserData} from "../../../../redux/actions/userData";

export const WalletTransferTab = () => {
    const i18n = translateStr("wallet.trx");

    const onUpdate = async () => {
        await fetchUserData(getUserData().name).then(updateUserData);
    };

    return(
        <Fragment>
            <Box p={2}>
                <HeadingBold content={i18n("title")} />
                <Body content={i18n("desc")} />
                <Box mt={3}>
                    <TransferForm onUpdate={onUpdate} />
                </Box>
            </Box>
        </Fragment>
    )
};