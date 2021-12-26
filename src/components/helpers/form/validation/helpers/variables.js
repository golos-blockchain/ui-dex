import * as yup from "yup";

export const schema = (obj) => yup.object(obj);

export const yupString = () => yup.string().max(256);
export const yupBool = () => yup.bool();

export const yupNum = () => yup.number();
// export const yupDate = () => yup.date();
// export const yupArr = (type) => yup.array().of(type);

export const email = yupString().email({type: "email"}).required();