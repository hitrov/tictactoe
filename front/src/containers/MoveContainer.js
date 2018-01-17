import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove, getSymbol } from '../actions';
import Move from '../components/Move';

class MoveContainer extends Component {
    render(){
        const { postMove, action, symbol, gameFinished, isWonMove } = this.props;

        return (
            <Move
                action={action}
                symbol={symbol}
                gameFinished={gameFinished}
                onMoveClick={() => !gameFinished && postMove(action)}
                isWonMove={isWonMove}
            />
        );
    }
}

MoveContainer = connect((state, ownProps) => {
    const { game, xId } = state;
    const { action } = ownProps;

    const symbol = getSymbol(game, action, xId);

    return {
        action,
        symbol,
        gameFinished: game && (game.draw || (game.player_id_won && game.won_combination)),
        isWonMove: game.won_combination && game.won_combination.indexOf(action) !== -1,
    };
}, {
    postMove,
})(MoveContainer);

export default MoveContainer;