import React from 'react';
import MoveContainer from '../containers/MoveContainer';

const Line = props =>
    props.line.map(action => <MoveContainer key={action} action={action} />);

export default Line;