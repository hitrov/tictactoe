import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove, setPlayerNames, postCreatePlayers, postGame } from '../actions';
import { withRouter } from 'react-router-dom';
import App from '../components/App';

class AppContainer extends Component {
    render(){
        return (
            <App
                {...this.props}
            />
        );
    }
}

AppContainer = withRouter(connect(state => {
    const { player1Id, player2Id, game, recents } = state;
    const gameId = game ? game.game_id : null;

    return {
        player1Id,
        player2Id,
        gameId,
        recents,
    }
}, {
    postMove,
    setPlayerNames,
    postCreatePlayers,
    postGame,
})(AppContainer));

export default AppContainer;