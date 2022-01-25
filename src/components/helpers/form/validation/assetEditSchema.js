import {
    isLink,
    schema,
    yupArr,
    yupString
} from "./helpers";

export const assetEditSchema = schema({
    feePercent: yupString(),
    tokenIcon: yupString().test(isLink),
    tokenDesc: yupString(),
    whitelist: yupArr(yupString())
});