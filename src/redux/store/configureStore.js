import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {middleware as awaitMiddleware} from 'redux-await';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from '../reducers';

export default function configureStore(initialState = {}, client, routerHistory) {
    return createStore(
        combineReducers(
            {
                ...rootReducers,
                apollo: client.reducer()
            }
        ),
        initialState,
        compose(
            applyMiddleware(client.middleware(), thunkMiddleware, awaitMiddleware, routerMiddleware(routerHistory)),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}