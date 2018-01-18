import React from 'react';
import { Provider } from 'react-redux';
import Main from '../containers/Main';

import createBrowserHistory from 'history/createBrowserHistory'
import {
    Router,
} from 'react-router-dom';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Main />
        </Router>
    </Provider>
);

export default Root;