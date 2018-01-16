import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from '../containers/AppContainer';
import HistoryContainer from '../containers/HistoryContainer';
import NotFound from './NotFound';

import createBrowserHistory from 'history/createBrowserHistory'
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <div>
                <Switch>
                    <Route exact path="/" component={AppContainer} />
                    <Route path="/history" component={HistoryContainer} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default Root;