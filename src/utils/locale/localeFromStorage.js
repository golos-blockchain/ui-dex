import {getStorage} from "../storage";
import {defaultLocales} from "./defaultLocales";

export const localeFromStorage = () => {
    let selectedLang = getStorage('locale');

    if(!selectedLang){
        const defaultLanguage = navigator.languages[0].split('-')[0];
        selectedLang = defaultLocales.some(e => e.type === defaultLanguage) ? defaultLanguage : 'en';
    }

    return selectedLang;
};
