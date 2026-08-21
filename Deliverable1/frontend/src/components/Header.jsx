//u23559129 Rachel Kambala
import { NavLink, Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <Link to="/home" className="headerLogo">
                <img src="/images/logo.png" alt="Logo" />
            </Link>
            <nav className="mainNav">
                <NavLink to="/discover" className="mainNavLink">Discover</NavLink>
                <NavLink to="/exhibits" className="mainNavLink">Exhibits</NavLink>
                <NavLink to="/collections" className="mainNavLink">Collections</NavLink>
                <NavLink to="/studio" className="mainNavLink">Studio</NavLink>
            </nav>

            <div className="headerActions">
                <Link to="/login" className="headerActionLink">
                    Login
                </Link>
                <Link to="/signup" className="headerActionLink">
                    Become An Artist
                </Link>
            </div>
        </header>
    );
}