import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const middlewares = [thunk];
    middlewares.push(createLogger({
        diff: true,
    }));

    const persistedState = loadState() || {
        recents: [],
    };

    const store = createStore(
        reducer,
        persistedState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    store.subscribe(throttle(() => saveState(store.getState())));

    return store;
};

export default configureStore;
