import {checkAssetIssue, schema, yupString} from "./helpers";

export const assetIssueSchema =  schema({
    to: yupString().required(),
    amount: yupString()
        .test(checkAssetIssue)
        .required()
});