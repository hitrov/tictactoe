import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateContainer from './CreateContainer';
import HistoryContainer from "./HistoryContainer";
import PlayContainer from "./PlayContainer";
import NotFound from "../components/NotFound";
import {dismissError, getGameId } from '../actions';
import {
    Route,
    Switch,
} from 'react-router-dom';
import { Navbar, Nav, NavItem, Alert, Grid } from 'react-bootstrap';

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
        const { error, dismissError, gameId } = this.props;

        return (
            <Grid>
                {error &&
                <Alert bsStyle="danger" onDismiss={dismissError}>
                    <h4>{error}</h4>
                </Alert>}
                <Navbar onSelect={this.onSelectTab}>
                    <Nav>
                        <NavItem eventKey={'/'}>Home</NavItem>
                        {gameId !== null && <NavItem eventKey={'/play'}>Game</NavItem>}
                        <NavItem eventKey={'/history'}>History</NavItem>
                    </Nav>
                </Navbar>
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
    gameId: getGameId(state),
}), {
    dismissError,
})(Main));

export default Main;