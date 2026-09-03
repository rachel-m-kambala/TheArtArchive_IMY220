import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import SignupForm from "../components/SignupForm.jsx";

function Splash() {
    return (
        <main className="splash-page">
            <section className="hero">
                <div className="hero-content">
                    <p className="eyebrow">
                        THE ART ARCHIVE
                    </p>

                    <h1>ART LIVES HERE.</h1>

                    <p className="hero-description">
                        Discover a community where photographers,
                        artists, and digital creators share,
                        explore, and celebrate visual creativity.
                    </p>
                </div>

                <section className="authentication">
                    <LoginForm />
                    <SignupForm />
                </section>
            </section>
        </main>
    );
}

export default Splash;