import {getStorage, setStorage} from "../storage";

export const getNodes = () => getStorage("nodes");
export const saveNodes = payload => setStorage("nodes", payload);