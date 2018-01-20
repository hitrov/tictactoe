import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove, getSymbol } from '../actions';
import Move from '../components/Move';

class MoveContainer extends Component {
    render(){
        const { postMove, action, symbol, gameFinished, isWonMove, isMoveDone, isDraw, isFetching } = this.props;

        return (
            <Move
                action={action}
                symbol={symbol}
                gameFinished={gameFinished}
                onMoveClick={() => !gameFinished && postMove(action)}
                isWonMove={isWonMove}
                isMoveDone={isMoveDone}
                isDraw={isDraw}
                isFetching={isFetching}
            />
        );
    }
}

MoveContainer = connect((state, ownProps) => {
    const { game, xId, isFetching } = state;
    const { action } = ownProps;

    const symbol = getSymbol(game, action, xId);
    const isMoveDone = game && game.moves.length && game.moves.find(m => parseInt(m.action, 10) === action);

    return {
        action,
        symbol,
        gameFinished: game && (game.draw || (game.player_id_won && game.won_combination)),
        isWonMove: game.won_combination && game.won_combination.indexOf(action) !== -1,
        isMoveDone,
        isDraw: game && game.draw,
        isFetching,
    };
}, {
    postMove,
})(MoveContainer);

export default MoveContainer;