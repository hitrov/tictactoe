import React from 'react';
import Line from './Line';

const PlayingField = () =>
    <div>
        <Line line={[1, 2, 3]} />
        <Line line={[4, 5, 6]} />
        <Line line={[7, 8, 9]} />
    </div>;

export default PlayingField;