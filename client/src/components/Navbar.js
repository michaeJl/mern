import React, { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/Auth.context';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logOutHandler = (e)=>{
        e.preventDefault();
        auth.logOut();
        history.push('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
            <span className="brand-logo">Logo</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Создать</NavLink></li>
                <li><NavLink to="/links">Ссылки</NavLink></li>
                <li><a href="/" onClick={logOutHandler}>Выйти</a></li>
            </ul>
            </div>
        </nav>
    )
}