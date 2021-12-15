import {confirmPassword, schema, yupBool, yupString} from "./helpers";

export const passwordChangeSchema = schema({
    password: yupString().required(),
    newPassword: yupString().required(),
    confirmPassword: yupString().test(confirmPassword).required(),
    passwordSaveWarning: yupBool().oneOf([true], 'Field must be checked').required(),
});