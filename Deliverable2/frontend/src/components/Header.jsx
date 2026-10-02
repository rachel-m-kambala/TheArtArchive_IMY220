//u23559129 Rachel Kambala
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/artarticle.png";

export default function Header() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    function handleLogout() {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("currentUser");

        navigate("/");
    }

    const navClass = ({ isActive }) =>
        `text-sm uppercase tracking-widest transition ${
            isActive
                ? "text-[#9D2E36]"
                : "text-[#253247] hover:text-[#9D2E36]"
        }`;

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#D8D3CA] bg-[#F2F0EB] px-8 py-4">
            <Link to="/home" className="shrink-0">
                <img
                    src={logo}
                    alt="The Art Archive"
                    className="h-12 w-auto"
                />
            </Link>

            <nav className="flex items-center gap-8">
                <NavLink
                    to="/discover"
                    className={navClass}
                >
                    Discover
                </NavLink>

                <NavLink
                    to="/exhibits"
                    className={navClass}
                >
                    Exhibits
                </NavLink>

                <NavLink
                    to="/collections"
                    className={navClass}
                >
                    Collections
                </NavLink>

                <NavLink
                    to="/studio"
                    className={navClass}
                >
                    Studio
                </NavLink>
            </nav>

            <div className="flex items-center gap-4">
                {userId ? (
                    <>
                        <Link
                            to={`/profile/${userId}`}
                            className="text-sm text-[#253247] hover:text-[#9D2E36]"
                        >
                            {username}
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-md bg-[#9D2E36] px-5 py-2 text-sm text-white hover:opacity-90"
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-sm text-[#253247] hover:text-[#9D2E36]"
                        >
                            Log In
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-md bg-[#9D2E36] px-5 py-2 text-sm text-white hover:opacity-90"
                        >
                            Become An Artist
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}