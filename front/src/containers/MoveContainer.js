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
    const { game, xId } = state;
    const gameId = game ? game.game_id : null;
    const { action } = ownProps;

    let symbol;
    if (gameId) {
        const move = game.moves.find(move => parseInt(move.action, 10) === action);
        let movePlayerId = '';
        if (move) {
            movePlayerId = parseInt(move.player_id, 10);
            symbol = movePlayerId === xId
                ? 'X'
                : 'O';
        }
    }

    return {
        action,
        symbol,
        gameId,
    };
}, {
    postMove,
})(MoveContainer);

export default MoveContainer;