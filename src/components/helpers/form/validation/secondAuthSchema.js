import {schema, yupString} from "./helpers";

export const secondAuthSchema = schema({
    password: yupString().required()
});