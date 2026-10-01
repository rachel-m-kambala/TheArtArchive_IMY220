//u23559129 Rachel Kambala
import React from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from
    "../assets/images/artarticle.png";

export default function Header() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const username = localStorage.getItem("username");

    function handleLogout() {
        localStorage.removeItem(
            "userId"
        );

        localStorage.removeItem(
            "username"
        );

        localStorage.removeItem(
            "email"
        );

        navigate("/");
    }


    return (
        <header className="header">

            <Link
                to="/home"
                className="headerLogo"
            >
                <img
                    src={logo}
                    alt="The Art Archive"
                />
            </Link>


            <nav className="mainNav">

                <NavLink
                    to="/discover"
                    className="mainNavLink"
                >
                    Discover
                </NavLink>

                <NavLink
                    to="/exhibits"
                    className="mainNavLink"
                >
                    Exhibits
                </NavLink>

                <NavLink
                    to="/collections"
                    className="mainNavLink"
                >
                    Collections
                </NavLink>

                <NavLink
                    to="/studio"
                    className="mainNavLink"
                >
                    Studio
                </NavLink>

            </nav>


            <div className="headerActions">

                {userId ? (
                    <>
                        <Link
                            to={`/profile/${userId}`}
                        >
                            {username ||
                                "Profile"}
                        </Link>

                        <button
                            type="button"
                            onClick={
                                handleLogout
                            }
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Log In
                        </Link>

                        <Link to="/signup">
                            Become An Artist
                        </Link>
                    </>
                )}

            </div>

        </header>
    );
}