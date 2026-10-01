//u23559129 Rachel Kambala
import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/images/artarticle.png";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="headerLogo">
                <img src={logo} alt="Logo" />
            </Link>
            <nav className="mainNav">
                <NavLink to="/home" className="mainNavLink">Gallery</NavLink>
                <NavLink to="/discover" className="mainNavLink">Discover</NavLink>
                <NavLink to="/exhibits" className="mainNavLink">Exhibits</NavLink>
                <NavLink to="/collections" className="mainNavLink">Collections</NavLink>
                <NavLink to="/studio" className="mainNavLink">Studio</NavLink>
            </nav>

            <div className="headerActions">
                <Link to="/login">Log In</Link>
                <Link to="/signup">Become An Artist</Link>
            </div>
        </header>
    );
}