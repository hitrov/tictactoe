import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove } from '../actions';
import Move from '../components/Move';

class MoveContainer extends Component {
    render(){
        const { gameId, postMove, action } = this.props;

        return (
            <Move
                action={action}
                onMoveClick={() => postMove(gameId, action)}
            />
        );
    }
}

MoveContainer = connect((state, ownProps) => ({
    gameId: state.gameId,
    action: ownProps.action,
}), {
    postMove,
})(MoveContainer);

export default MoveContainer;