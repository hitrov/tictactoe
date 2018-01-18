import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppContainer from './AppContainer';
import HistoryContainer from "./HistoryContainer";
import NotFound from "../components/NotFound";
import {
    Route,
    Switch,
} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
        return (
            <div>
                <Navbar onSelect={this.onSelectTab}>
                    <Nav>
                        <NavItem eventKey={'/'}>
                            Game
                        </NavItem>
                        <NavItem eventKey={'/history'}>
                            History
                        </NavItem>
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact path="/" component={AppContainer} />
                    <Route path="/history" component={HistoryContainer} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

Main = withRouter(connect()(Main));

export default Main;