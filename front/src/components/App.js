import React, { Component } from 'react';
import PlayingField from './PlayingField';
import History from './History';
import { FormGroup, FormControl, ButtonToolbar, Button } from 'react-bootstrap';

class App extends Component {
    render() {
        const { postGame, player1Id, player2Id, gameId, recents,
        onCreateGameClick, onPlayer1NameChange, onPlayer2NameChange,
            player1Name, player2Name } = this.props;

        return (
            <div>
                <FormGroup>
                    <FormControl onChange={ onPlayer1NameChange } value={player1Name} />
                    <FormControl onChange={ onPlayer2NameChange } value={player2Name} />

                    <ButtonToolbar>

                    </ButtonToolbar>

                    <Button
                        onClick={onCreateGameClick}
                    >
                        Create Players
                    </Button>

                    {player1Id !== undefined && player2Id !== undefined &&
                    <Button
                        bsStyle="primary"
                        onClick={() => postGame()}
                    >
                        Create Game
                    </Button>}
                </FormGroup>

                {gameId !== null &&
                <PlayingField />}

                <History isRecents={true} history={recents} />
            </div>
        );
    }
}

export default App;
