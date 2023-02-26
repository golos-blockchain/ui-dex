import {schema, yupString} from "./helpers";

export const assetNewOwnerSchema =  schema({
    to: yupString().required()
});