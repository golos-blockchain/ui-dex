import React from "react";
import {BodyBold, Box} from "../../global";

export const RequestError = (props) => {
    const errors = props.formData.state.errors;

    return errors && errors["request"] ? (
        <Box mb={2.2}>
            <BodyBold content={`errors.${errors["request"].type}`} color="error" />
        </Box>
    ) : (
        <span />
    )
};