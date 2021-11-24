import {store} from '../../index';

export const getReduxState = (param) => {
    const data = store.getState();
    return param ? data[param] : data;
};

export const multiconnect = (...connectorsList) => (state) => {
    let result = {};
    connectorsList.forEach(func => {
        result = {...result, ...func(state)}
    });
    return result;
}

export const reduxDispatch = (type, payload = false) => store.dispatch({type, payload});
