import {connectRouter} from "connected-react-router";
import {combineReducers} from "redux";

import modal from "./reducers/modal";
import settings from "./reducers/settings";
import userData from "./reducers/userData";
import locale from "./reducers/locale";
import assets from "./reducers/assets";
import nodes from "./reducers/nodes";

const red = (history) => combineReducers({
    userData,
    modal,
    assets,
    settings,
    locale,
    nodes,
    router: connectRouter(history)
});

export default red;