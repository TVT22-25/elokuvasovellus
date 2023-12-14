import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import NavListItem from '../Components/NavListItem';
import navListData from '../data/navListData';
import Search from '../Components/Search';
import Button from '../Components/Button';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          setIsLoggedIn(true);
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    };

    const handleLogin = () => {
      navigate('/login');
    };

    const handleRegister = () => {
      navigate('/register');
    };

    const handleReviews = () => {
      const userId = localStorage.getItem('user_id');
      navigate(`/${userId}/reviews`);
    };

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
            {isLoggedIn ? (
                <>
                <Button
                    onClick={handleReviews}
                    icon={<ion-icon name="log-out-outline"></ion-icon>}
                    name="My Reviews"
                />
                <Button
                    onClick={handleLogout}
                    icon={<ion-icon name="log-out-outline"></ion-icon>}
                    name="Log out"
                />
                </>
            ) : (
                <>
                    <Button
                        onClick={handleLogin}
                        icon={<ion-icon name="log-in-outline"></ion-icon>}
                        name="Sign in"
                    />
                    <Button
                        onClick={handleRegister}
                        icon={<ion-icon name="person-add-outline"></ion-icon>}
                        name="Register"
                    />
                </>
            )}
        </header>
    );
}

export default Header;