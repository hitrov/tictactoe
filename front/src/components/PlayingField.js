import React from 'react';
import Line from './Line';

const PlayingField = () =>
    <div className="flex center">
        <div>
            <Line line={[1, 2, 3]} />
        </div>
        <div>
            <Line line={[4, 5, 6]} />
        </div>
        <div>
            <Line line={[7, 8, 9]} />
        </div>
    </div>;

export default PlayingField;
