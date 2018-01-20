import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayer1Name, setPlayer2Name, postCreatePlayers, postGame, logout } from '../actions';
import Create from '../components/Create';

class CreateContainer extends Component {
    constructor(props) {
        super(props);

        this.onPlayer1NameChange = this.onPlayer1NameChange.bind(this);
        this.onPlayer2NameChange = this.onPlayer2NameChange.bind(this);
        this.onCreatePlayersClick = this.onCreatePlayersClick.bind(this);
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

    render(){
        const { player1Id, player2Id, player1Name, player2Name } = this.props;
        const { onCreatePlayersClick, onPlayer1NameChange, onPlayer2NameChange } = this;

        return (
            <Create
                player1Name={player1Name}
                player2Name={player2Name}
                onPlayer1NameChange={onPlayer1NameChange}
                onPlayer2NameChange={onPlayer2NameChange}
                onCreatePlayersClick={onCreatePlayersClick}
                player1Id={player1Id}
                player2Id={player2Id}
                onLogoutClick={logout}
            />
        );
    }
}

CreateContainer = connect(state => {
    const { player1Id, player2Id, player1Name, player2Name } = state;

    return {
        player1Id,
        player2Id,
        player1Name,
        player2Name,
    }
}, {
    postCreatePlayers,
    postGame,
    setPlayer1Name,
    setPlayer2Name,
})(CreateContainer);

export default CreateContainer;