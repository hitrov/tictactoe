import React from 'react';
import Move from './Move';

const Line = props =>
    <div>
        {props.line.map(action => <Move action={action} />)}
    </div>;

export default Line;