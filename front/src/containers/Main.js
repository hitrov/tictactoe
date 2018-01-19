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

class Main extends Component {
    constructor(props) {
        super(props);
        this.onSelectTab = this.onSelectTab.bind(this);
    }

    onSelectTab(href) {
        const { history } = this.props;
        history.push(href);
    }

    render(){
        const { error, dismissError } = this.props;

        return (
            <Grid>
                {error &&
                <Alert bsStyle="danger" onDismiss={dismissError}>
                    <h4>{error}</h4>
                </Alert>}
                <Header />
                <Switch>
                    <Route exact path="/" component={CreateContainer} />
                    <Route path="/play" component={PlayContainer} />
                    <Route path="/history" component={HistoryContainer} />
                    <Route component={NotFound} />
                </Switch>
            </Grid>
        );
    }
}

Main = withRouter(connect(state => ({
    error: state.errorMessage,
}), {
    dismissError,
})(Main));

export default Main;