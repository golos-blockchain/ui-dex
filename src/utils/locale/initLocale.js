import counterpart from "counterpart";
import {setLocale} from "./setLocale";
import {localeFromStorage} from "./localeFromStorage";
import {defaultLocales} from "./defaultLocales";

export const initLocale = () => {
    defaultLocales.forEach(({type, json}) => counterpart.registerTranslations(type, json));
    setLocale(localeFromStorage().toLowerCase());
};
