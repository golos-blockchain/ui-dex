import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import {history, initStore} from "./utils";

import "./styles/style.scss";

export const isProd = process.env.NODE_ENV === 'production';
export const store = initStore();

const AppWrapper = () => {
    return(
        <Provider store={store} context={ReactReduxContext}>
            <ConnectedRouter history={history} context={ReactReduxContext}>
                <App />
            </ConnectedRouter>
        </Provider>
    )
};

ReactDOM.render(
    <AppWrapper />,
    document.getElementById('root')
);
