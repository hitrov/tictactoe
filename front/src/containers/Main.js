import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateContainer from './CreateContainer';
import HistoryContainer from "./HistoryContainer";
import PlayContainer from "./PlayContainer";
import Header from '../components/Header';
import NotFound from "../components/NotFound";
import { dismissError } from '../actions';
import {
    Route,
    Switch,
} from 'react-router-dom';
import { Alert, Grid } from 'react-bootstrap';
import '../components/App.css';
import { PATH_HOME, PATH_GAME, PATH_HISTORY } from '../constants';

class Main extends Component {
    render(){
        const { errorMessage, dismissError, player1Id, player2Id, history } = this.props;

        return (
            <Grid>
                {errorMessage &&
                <Alert bsStyle="danger" onDismiss={dismissError}>
                    <h4>{errorMessage}</h4>
                </Alert>}
                <Header
                    pathName={history.location.pathname}
                    displayGameHistoryLinks={player1Id && player2Id}
                />
                <Switch>
                    <Route exact path={PATH_HOME} component={CreateContainer} />
                    <Route path={PATH_GAME} component={PlayContainer} />
                    <Route path={PATH_HISTORY} component={HistoryContainer} />
                    <Route component={NotFound} />
                </Switch>
            </Grid>
        );
    }
}

Main = withRouter(connect(state => {
    const { errorMessage, player1Id, player2Id } = state;

    return {
        errorMessage,
        player1Id,
        player2Id,
    };
}, {
    dismissError,
})(Main));

export default Main;