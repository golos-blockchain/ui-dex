import {connectRouter} from "connected-react-router";
import {combineReducers} from "redux";

import modal from "./reducers/modal";
import settings from "./reducers/settings";
import userData from "./reducers/userData";
import locale from "./reducers/locale";
import assets from "./reducers/assets";
import nodes from "./reducers/nodes";
import activePair from "./reducers/activePair";

const red = (history) => combineReducers({
    userData,
    modal,
    assets,
    settings,
    activePair,
    locale,
    nodes,
    router: connectRouter(history)
});

export default red;