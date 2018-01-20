import React from 'react';
import { Link } from 'react-router-dom';
import { PATH_HOME, PATH_GAME, PATH_HISTORY } from '../constants';

const Header = ({ displayGameHistoryLinks, pathName }) => (
    <header className="header box-shadow">
        <Link to={PATH_HOME} className={`header__link ${pathName === PATH_HOME ? 'active' : ''}`}>Home</Link>
        {displayGameHistoryLinks && <Link to={PATH_GAME} className={`header__link ${pathName === PATH_GAME ? 'active' : ''}`}>Game</Link>}
        {displayGameHistoryLinks && <Link to={PATH_HISTORY} className={`header__link ${pathName === PATH_HISTORY ? 'active' : ''}`}>History</Link>}
    </header>
);



export default Header;