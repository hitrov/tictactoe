import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove } from '../actions';
import Move from '../components/Move';

class MoveContainer extends Component {
    render(){
        const { gameId, postMove, action, symbol, gameFinished, isWonMove } = this.props;

        return (
            <Move
                action={action}
                symbol={symbol}
                gameFinished={gameFinished}
                onMoveClick={() => !gameFinished && postMove(gameId, action)}
                isWonMove={isWonMove}
            />
        );
    }
}

MoveContainer = connect((state, ownProps) => {
    const { game, xId } = state;
    const { action } = ownProps;

    let isWonMove = false, symbol, movePlayerId;
    if (game) {
        const move = game.moves.find(move => parseInt(move.action, 10) === action);
        if (move) {
            const winnerMoves = game.moves
                .filter(move => move.player_id === game.player_id_won)
                .map(move => parseInt(move.action, 10));

            isWonMove = winnerMoves.indexOf(action) !== -1;

            movePlayerId = parseInt(move.player_id, 10);
            symbol = movePlayerId === xId
                ? 'X'
                : 'O';
        }
    }

    return {
        action,
        symbol,
        gameId: game ? game.game_id: null,
        gameFinished: game && game.player_id_won,
        isWonMove,
    };
}, {
    postMove,
})(MoveContainer);

export default MoveContainer;