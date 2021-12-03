import {isNodeTitleUnique, isNodeUrlSocket, isNodeUrlUnique, schema, yupString} from "./helpers";

export const nodeSchema = schema({
    title: yupString().test(isNodeTitleUnique).required(),
    url: yupString().test(isNodeUrlSocket).test(isNodeUrlUnique).required(),
});