import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove } from '../actions';
import Move from '../components/Move';

class MoveContainer extends Component {
    render(){
        const { gameId, postMove, action, symbol } = this.props;

        return (
            <Move
                action={action}
                symbol={symbol}
                onMoveClick={() => postMove(gameId, action)}
            />
        );
    }
}

MoveContainer = connect((state, ownProps) => {
    const { gameId, xId } = state;
    const { action } = ownProps;
    const move = state.moves.find(move => parseInt(move.action) === action);
    let movePlayerId, symbol = '';
    if (move) {
        movePlayerId = parseInt(move.player_id);
        symbol = movePlayerId === xId
            ? 'X'
            : 'O';
    }

    return {
        gameId,
        action,
        symbol,
    };
}, {
    postMove,
})(MoveContainer);

export default MoveContainer;