import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayerNames, postCreatePlayers, postGame } from '../actions';
import Create from '../components/Create';

class CreateContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player1Name: '',
            player2Name: '',
        };

        this.onPlayer1NameChange = this.onPlayer1NameChange.bind(this);
        this.onPlayer2NameChange = this.onPlayer2NameChange.bind(this);
        this.onCreatePlayersClick = this.onCreatePlayersClick.bind(this);
        this.onCreateGameClick = this.onCreateGameClick.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     const { player1Name, player2Name } = nextProps;
    //     if (!player1Name || !player2Name) {
    //         return;
    //     }
    //
    //     this.setState({
    //         player1Name,
    //         player2Name,
    //     });
    // }

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

    onCreatePlayersClick() {
        const { setPlayerNames, postCreatePlayers } = this.props;
        const { player1Name, player2Name } = this.state;

        setPlayerNames(player1Name, player2Name);
        postCreatePlayers(player1Name, player2Name);
    }

    onCreateGameClick() {
        const { history, postGame } = this.props;
        postGame();
        history.push('/play');
    }

    render(){
        const { player1Id, player2Id, player1Name, player2Name } = this.props;
        const { onCreatePlayersClick, onPlayer1NameChange, onPlayer2NameChange, onCreateGameClick } = this;

        return (
            <Create
                player1Name={player1Name}
                player2Name={player2Name}
                onPlayer1NameChange={onPlayer1NameChange}
                onPlayer2NameChange={onPlayer2NameChange}
                onCreatePlayersClick={onCreatePlayersClick}
                player1Id={player1Id}
                player2Id={player2Id}
                onCreateGameClick={onCreateGameClick}
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
    setPlayerNames,
    postCreatePlayers,
    postGame,
})(CreateContainer);

export default CreateContainer;