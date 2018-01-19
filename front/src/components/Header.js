import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({}) => (
    <header className="header box-shadow">
        <Link to={'/'} className="header__link">Home</Link>
        <Link to={'/play'} className="header__link">Game</Link>
        <Link to={'/history'} className="header__link">History</Link>
    </header>
);



export default Header;