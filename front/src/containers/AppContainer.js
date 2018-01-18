import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayerNames, postCreatePlayers, postGame } from '../actions';
import App from '../components/App';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        const { player1Name, player2Name } = this.props;

        this.state = {
            player1Name,
            player2Name,
        };

        this.onCreateGameClick = this.onCreateGameClick.bind(this);
        this.onPlayer1NameChange = this.onPlayer1NameChange.bind(this);
        this.onPlayer2NameChange = this.onPlayer2NameChange.bind(this);
    }

    onPlayer1NameChange(e) {
        this.setState({
            player1Name: e.target.value,
        });
    }

    onPlayer2NameChange(e) {
        this.setState({
            player2Name: e.target.value,
        });
    }

    onCreateGameClick() {
        const { setPlayerNames, postCreatePlayers } = this.props;
        const { player1Name, player2Name } = this.state;

        setPlayerNames(player1Name, player2Name);
        postCreatePlayers(player1Name, player2Name)
    }

    render(){
        return (
            <App
                {...this.props}
                onCreateGameClick={this.onCreateGameClick}
                onPlayer1NameChange={this.onPlayer1NameChange}
                onPlayer2NameChange={this.onPlayer2NameChange}
                player1Name={this.state.player1Name}
                player2Name={this.state.player2Name}
            />
        );
    }
}

AppContainer = connect(state => {
    const { player1Id, player2Id, game, recents, player1Name, player2Name } = state;
    const gameId = game ? game.game_id : null;

    return {
        player1Id,
        player2Id,
        player1Name,
        player2Name,
        gameId,
        recents,
    }
}, {
    setPlayerNames,
    postCreatePlayers,
    postGame,
})(AppContainer);

export default AppContainer;