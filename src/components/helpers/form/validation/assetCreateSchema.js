import {
    checkAssetLength,
    checkAssetMaxNum,
    checkAssetPrecision,
    isAssetUnique,
    isLink,
    maxNumHasPrecision, onlySymbols,
    schema, userCanCreate, yupBool,
    yupString
} from "./helpers";

export const assetCreateSchema = schema({
    maxNum: yupString().test(checkAssetMaxNum).test(maxNumHasPrecision).required(),
    ticker: yupString().min(3, "minAssetLength").test(onlySymbols).test(checkAssetLength).test(isAssetUnique).test(userCanCreate).required(),
    precision: yupString().test(checkAssetPrecision).required(),
    tokenIcon: yupString().test(isLink),
    tokenDesc: yupString(),
    allowFee: yupBool(),
    allowOverrideTransfer: yupBool(),
});