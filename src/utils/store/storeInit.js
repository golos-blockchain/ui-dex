import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk'
import {createHashHistory} from "history";
import reducers from "../../redux";
import {isProd} from "../../index";

export const history = createHashHistory();

export const initStore = () => {
    const middleware = [ thunk, routerMiddleware(history) ];

    if (!isProd) { middleware.push(createLogger()) }

    return createStore(
        reducers(history),
        compose(applyMiddleware(...middleware)),
    );
};
