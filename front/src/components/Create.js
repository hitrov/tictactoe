import React from 'react';
import { FormGroup, FormControl, Button, ButtonToolbar, Row, Col } from 'react-bootstrap';

const Create = ({
    player1Name, player2Name, onPlayer1NameChange, onPlayer2NameChange,
                    onCreatePlayersClick, player1Id, player2Id, onCreateGameClick }) =>

    <Row className="show-grid">
        <Col xs={3}>
            <FormGroup>
                <FormControl onChange={onPlayer1NameChange} />
                <FormControl onChange={onPlayer2NameChange} />

                <ButtonToolbar>
                    <Button
                        onClick={onCreatePlayersClick}
                    >
                        Create Players
                    </Button>

                    {player1Id !== undefined && player2Id !== undefined &&
                    <Button
                        bsStyle="primary"
                        onClick={onCreateGameClick}
                    >
                        Create Game
                    </Button>}
                </ButtonToolbar>

            </FormGroup>
        </Col>
    </Row>;

export default Create;