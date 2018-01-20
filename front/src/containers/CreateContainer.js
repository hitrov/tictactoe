import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setPlayer1Name,
    setPlayer2Name,
    postCreatePlayers,
    postGame,
    logout,
    togglePlayWithBot
} from '../actions';
import Create from '../components/Create';

class CreateContainer extends Component {
    constructor(props) {
        super(props);

        this.onPlayer1NameChange = this.onPlayer1NameChange.bind(this);
        this.onPlayer2NameChange = this.onPlayer2NameChange.bind(this);
        this.onCreatePlayersClick = this.onCreatePlayersClick.bind(this);
        this.onPlayWithBotChange = this.onPlayWithBotChange.bind(this);
    }

    onPlayer1NameChange(e) {
        const { setPlayer1Name } = this.props;
        setPlayer1Name(e.target.value);
    }

    onPlayer2NameChange(e) {
        const { setPlayer2Name } = this.props;
        setPlayer2Name(e.target.value);
    }

    onCreatePlayersClick() {
        const { postCreatePlayers, history, player1Name, player2Name } = this.props;

        postCreatePlayers(player1Name, player2Name);

        history.push('/play');
    }

    onPlayWithBotChange() {
        const { togglePlayWithBot, setPlayer2Name, playWithBot } = this.props;
        if (playWithBot) {
            setPlayer2Name('');
        } else {
            setPlayer2Name('Bot');
        }
        togglePlayWithBot();
    }

    render(){
        const { player1Id, player2Id, player1Name, player2Name, playWithBot } = this.props;
        const { onCreatePlayersClick, onPlayer1NameChange, onPlayer2NameChange, onPlayWithBotChange } = this;

        return (
            <Create
                player1Name={player1Name}
                player2Name={player2Name}
                isCreatePlayersButtonDisabled={!player1Name || (!player2Name && !playWithBot)}
                onPlayer1NameChange={onPlayer1NameChange}
                onPlayer2NameChange={onPlayer2NameChange}
                onCreatePlayersClick={onCreatePlayersClick}
                player1Id={player1Id}
                player2Id={player2Id}
                onLogoutClick={logout}
                onPlayWithBotChange={onPlayWithBotChange}
                playWithBot={playWithBot}
            />
        );
    }
}

CreateContainer = connect(state => {
    const { player1Id, player2Id, player1Name, player2Name, playWithBot } = state;

    return {
        player1Id,
        player2Id,
        player1Name,
        player2Name,
        playWithBot,
    }
}, {
    postCreatePlayers,
    postGame,
    setPlayer1Name,
    setPlayer2Name,
    togglePlayWithBot,
})(CreateContainer);

export default CreateContainer;