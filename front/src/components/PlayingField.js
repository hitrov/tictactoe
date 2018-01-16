import React from 'react';
import Line from './Line';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const PlayingField = () =>
    <Grid>
        <Row className="show-grid">
            <Line line={[1, 2, 3]} />
        </Row>
        <Row className="show-grid">
            <Line line={[4, 5, 6]} />
        </Row>
        <Row className="show-grid">
            <Line line={[7, 8, 9]} />
        </Row>
    </Grid>;

export default PlayingField;