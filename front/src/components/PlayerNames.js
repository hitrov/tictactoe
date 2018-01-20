import React from 'react';
import { Col } from 'react-bootstrap';

const PlayerNames = ({ player1Name, player2Name, player1ClassName, player2ClassName }) =>
    <div className="player-names">
        <Col className={player1ClassName} xs={6}>
            {player1Name}
        </Col>
        <Col className={player2ClassName} xs={6}>
            {player2Name}
        </Col>
    </div>;

export default PlayerNames;