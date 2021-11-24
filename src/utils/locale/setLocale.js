import counterpart from "counterpart";
import {getStorage, setStorage} from "../storage";
import {updateReduxLocale} from "../../redux/actions";

export const setLocale = (selectedLang) => {
    let storagedLocale = getStorage('locale');
    counterpart.setLocale(selectedLang);
    updateReduxLocale(selectedLang);

    if(storagedLocale !== selectedLang) {
        setStorage('locale', selectedLang);
    }
};
