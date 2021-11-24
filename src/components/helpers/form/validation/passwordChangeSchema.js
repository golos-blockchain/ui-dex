import {oldPasswordValidation, schema, yupBool, yupString} from "./helpers";

export const passwordChangeSchema = schema({
    currentPassword: yupString().test(oldPasswordValidation).required(),
    generatedPassword: yupString().required(),
    passwordRestoreWarning: yupBool().oneOf([true], 'Field must be checked').required(),
    passwordSaveWarning: yupBool().oneOf([true], 'Field must be checked').required(),
});