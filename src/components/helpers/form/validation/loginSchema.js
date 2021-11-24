import {schema, yupString} from "./helpers";

export const loginSchema = schema({
    name: yupString().required(),
    priv: yupString().required(),
});