import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from '../actions';
import { withRouter } from 'react-router-dom';
import History from '../components/History';

class HistoryContainer extends Component {
    constructor(props) {
        super(props);
        props.fetchHistory()
    }

    render(){
        return (
            <History
                {...this.props}
            />
        );
    }
}

HistoryContainer = withRouter(connect(state => ({
    history: state.history,
    isFetching: state.isFetching,
}), {
    fetchHistory,
})(HistoryContainer));

export default HistoryContainer;