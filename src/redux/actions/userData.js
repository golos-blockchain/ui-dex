import {getReduxState, reduxDispatch} from "../../utils/store";
import {LOGOUT, SET_USER_DATA, UPDATE_USER_DATA} from "../constants";
import {removeStorageItem} from "../../utils";

export const connectUserData = state => ({userData: state.userData});
export const getUserData = () => getReduxState().userData;

export const setUserData = payload => reduxDispatch(SET_USER_DATA, payload);
export const updateUserData = payload => reduxDispatch(UPDATE_USER_DATA, payload);

export const logout = () => {
    removeStorageItem("user");
    reduxDispatch(LOGOUT);
}