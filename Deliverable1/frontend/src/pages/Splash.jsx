import React from "react";
import { Link } from "react-router-dom";

function Splash() {
    return (
        <main className="splash-page">
            <section className="hero">
                <div className="heroContent">
                    <p className="heading">
                        THE ART ARCHIVE
                    </p>

                    <h1>ART LIVES HERE.</h1>

                    <p className="hero-description">
                        Discover a community where photographers,
                        artists, and digital creators share,
                        explore, and celebrate visual creativity.
                        Showcase your work and find inspiration—all in one digital gallery.
                    </p>
                </div>

                <div className="hero-actions">
                    <Link to="/signup" className="signupBtn">
                        Become An Artist
                    </Link>
                    <Link to="/login" className="loginBtn">
                        Log In
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Splash;