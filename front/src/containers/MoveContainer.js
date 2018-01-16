import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove, getIsWonMove, getSymbol } from '../actions';
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

    const isWonMove = getIsWonMove(game, action);
    const symbol = getSymbol(game, action, xId);

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