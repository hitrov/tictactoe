import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove } from '../actions';
import { withRouter } from 'react-router-dom';
import App from '../components/App';

class AppContainer extends Component {
    render(){
        return (
            <App
                postMove={this.props.postMove}
            />
        );
    }
}

AppContainer = withRouter(connect((state, ownProps) => ({

}), {
    postMove,
})(AppContainer));

export default AppContainer;