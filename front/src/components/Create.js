import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Row, Col, Checkbox } from 'react-bootstrap';

const Create = ({
    player1Name,
    player2Name,
    onPlayer1NameChange,
    onPlayer2NameChange,
    onCreatePlayersClick,
    player1Id,
    player2Id,
    onLogoutClick,
    isCreatePlayersButtonDisabled,
    onPlayWithBotChange,
    playWithBot,
}) =>

    <Row className="show-grid">
        <Col md={12}>
            <FormGroup className="create-players-form">
                <ControlLabel className="create-player-form__label">Player 1:</ControlLabel>
                <FormControl
                    className="create-player-form__input"
                    onChange={onPlayer1NameChange}
                    value={player1Name}
                />
                <ControlLabel className="create-player-form__label">Player 2:</ControlLabel>

                <FormControl
                    disabled={playWithBot}
                    className="create-player-form__input"
                    onChange={onPlayer2NameChange}
                    value={player2Name}
                />

                <Checkbox
                    className="create-player-form__checkbox"
                    checked={playWithBot}
                    onChange={onPlayWithBotChange}
                >
                    Play With Bot
                </Checkbox>

                <a href="https://t.me/hitrov_ttt_bot" target="_blank" className="create-player-form__telegram">
                    <img src="/telegram-logo.png" alt="Telegram Bot" width={25} height={25} className="create-player-form__telegram-icon"/>
                    Also you can play in Telegram Messenger!
                </a>

                <div className="create-player-form__actions">

                    <Button
                        className="create-players-btn"
                        onClick={onCreatePlayersClick}
                        disabled={isCreatePlayersButtonDisabled}
                    >
                        Create
                    </Button>

                    {player1Id && player2Id &&
                    <Button
                        className="create-players-btn__logout"
                        onClick={onLogoutClick}
                    >
                        Logout
                    </Button>}

                </div>
            </FormGroup>
        </Col>
    </Row>;

export default Create;