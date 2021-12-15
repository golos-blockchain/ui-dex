import {confirmPassword, schema, yupString} from "./helpers";

export const loginSchema = schema({
    name: yupString().required(),
    activeKey: yupString().required(),
    newPassword: yupString().required(),
    confirmPassword: yupString().test(confirmPassword).required(),
});