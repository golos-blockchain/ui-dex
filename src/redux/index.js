import {connectRouter} from "connected-react-router";
import {combineReducers} from "redux";

import modal from "./reducers/modal";
import settings from "./reducers/settings";
import userData from "./reducers/userData";
import locale from "./reducers/locale";

const red = (history) => combineReducers({
    userData,
    modal,
    settings,
    locale,
    router: connectRouter(history)
});

export default red;