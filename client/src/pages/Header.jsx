import React from 'react';
import './header.css';
import NavListItem from '../Components/NavListItem';
import navListData from '../data/navListData';
import Search from '../Components/Search';
import Button from '../Components/Button';

function Header() {
    return (
        <header>
            <a href="/" className="logo">
                Movie site
            </a>
            <ul className="nav">
                {
                    navListData.map(nav=>(
                        <NavListItem key={nav._id} nav={nav} />
                    ))
                }
            </ul>
            <Search />
            <Button
                icon={<ion-icon name="log-in-outline"></ion-icon>}
                name="Sign in"
            />
            <Button
                icon={<ion-icon name="person-add-outline"></ion-icon>}
                name="Register"
            />
        </header>
    );
}

export default Header;