import React from 'react';
import MoveContainer from '../containers/MoveContainer';

const Line = props =>
    <div>
        {props.line.map(action => <MoveContainer key={action} action={action} />)}
    </div>;

export default Line;