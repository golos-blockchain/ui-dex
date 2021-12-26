import React, {Fragment, useState} from "react";
import {translateStr} from "../../../utils";
import {Body, Box, Heading} from "../global";
import {closeModal} from "../../../redux/actions";
import {BrandTextBtn} from "../btn";

export const ConfirmModal = ({tag, hideDesc, descAdditionalData, additionalContent, btnComponent, action}) => {
    const [error, setError] = useState();
    const i18n = translateStr(`confirmModal.${tag}`);
    const Btn = btnComponent || BrandTextBtn;

    const onClick = async () => {
        try{
            if(action) await action();
            closeModal();
        } catch(err) {
            console.error(err);
            setError(err.message);
        }
    };

    return(
        <Fragment>
            <Heading content={i18n("title")} />
            {hideDesc && !additionalContent
                ? ""
                : (
                    <Box mt={1}>
                        {!hideDesc && <Body content={i18n("desc")} additionalData={descAdditionalData} />}
                        {additionalContent}
                    </Box>
                )
            }
            {error && (
                <Box mt={1.5}>
                    <Body text={error} color="error" />
                </Box>
            )}
            <Box mt={2}>
                <Btn content={i18n("btn")} onClick={onClick} />
            </Box>
        </Fragment>
    )
};