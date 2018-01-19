import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Row, Col } from 'react-bootstrap';

const Create = ({player1Name, player2Name, onPlayer1NameChange, onPlayer2NameChange,
                    onCreatePlayersClick, player1Id, player2Id }) =>

    <Row className="show-grid">
        <Col md={12}>
            <FormGroup className="create-players-form">
                <ControlLabel className="create-player-form__label">Player 1:</ControlLabel>
                <FormControl
                    className="create-player-form__input box-shadow"
                    onChange={onPlayer1NameChange}
                    value={player1Name}
                />
                <ControlLabel className="create-player-form__label">Player 2:</ControlLabel>
                <FormControl
                    className="create-player-form__input box-shadow"
                    onChange={onPlayer2NameChange}
                    value={player2Name}
                />
                <Button
                    className="create-players-btn box-shadow"
                    onClick={onCreatePlayersClick}
                >
                    Create Players
                </Button>
            </FormGroup>
        </Col>
    </Row>;

export default Create;