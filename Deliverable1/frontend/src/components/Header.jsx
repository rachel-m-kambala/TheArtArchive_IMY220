//u23559129 Rachel Kambala
import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <Link to="/home" className="headerLogo">
                <img src="../assets/images/artarticle.png" alt="Logo" />
            </Link>
            <nav className="mainNav">
                <NavLink to="/discover" className="mainNavLink">Discover</NavLink>
                <NavLink to="/exhibits" className="mainNavLink">Exhibits</NavLink>
                <NavLink to="/collections" className="mainNavLink">Collections</NavLink>
                <NavLink to="/studio" className="mainNavLink">Studio</NavLink>
            </nav>

            <div className="headerActions">
                <Link to="/" className="headerActionLink">
                    Log Out
                </Link>
                <Link to="/profile" className="headerActionLink">
                    Profile
                </Link>
            </div>
        </header>
    );
}