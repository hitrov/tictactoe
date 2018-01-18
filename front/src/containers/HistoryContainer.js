import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from '../actions';
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

HistoryContainer = connect(state => ({
    history: state.history,
    isFetching: state.isFetching,
}), {
    fetchHistory,
})(HistoryContainer);

export default HistoryContainer;