import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove, postCreatePlayers } from '../actions';
import { withRouter } from 'react-router-dom';
import App from '../components/App';

class AppContainer extends Component {
    render(){
        return (
            <App
                postMove={this.props.postMove}
                postCreatePlayers={this.props.postCreatePlayers}
            />
        );
    }
}

AppContainer = withRouter(connect((state, ownProps) => ({

}), {
    postMove,
    postCreatePlayers,
})(AppContainer));

export default AppContainer;