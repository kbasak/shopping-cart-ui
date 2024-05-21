/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    function onLogout() {
        navigate('/');
    }
    function onCart() {
        navigate('/cartpage');
    }
    function onProduct() {
        navigate('/home');
    }
    return (
        <header className="Header">
            <img src={require('../../image/logo.jpg')} className="Logo" alt="logo" />
            {console.log(location.pathname)}
            <nav className="Nav">
                <h2 style={{ textAlign: 'right', color: 'white', padding: '5px', paddingRight: '20px' }}>Welcome, {localStorage.getItem("name")}</h2>
                {location.pathname === '/cartpage' && 
                <button className="logout" onClick={onProduct}>
                    Products
                </button>}
                {(location.pathname === '/home' || location.pathname === '/checkout') && 
                <button className="cart" onClick={onCart}>
                    <MdOutlineShoppingCart size='36px' />
                </button>}
                <button className="logout" onClick={onLogout}>Logout</button>
            </nav>

        </header>
    );
}
