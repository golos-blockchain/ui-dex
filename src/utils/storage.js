// import {storagePrefix} from "../data/";

const storagePrefix = "GOLOS";

export const setStorage = (item, params) => (
    localStorage.setItem(`${storagePrefix}_${item}`, JSON.stringify(params))
);

export const getStorage = (item) => {
    const data = localStorage.getItem(`${storagePrefix}_${item}`);
    let result = false;

    try{
        const storageItem = JSON.parse(data);
        result = storageItem && storageItem;
    } catch (error) {
        console.log('---storageError', error);
    }

    return result;
};

export const removeStorageItem = (item) => (
    localStorage.removeItem(`${storagePrefix}_${item}`)
);

export const editStorage = (item, params) => (
    setStorage(item, {...getStorage(item), ...params})
);

export const getStorageValue = (name, defaultValue) => {
    const raw = getStorage(name);
    return raw ? Number(JSON.parse(raw)) : defaultValue
};


export const checkDefaultStorageValue = (param, value) => {
    let hasParam = getStorage(param);
    if (Boolean(hasParam)) return hasParam;

    setStorage(param, value);
    return value;
};
