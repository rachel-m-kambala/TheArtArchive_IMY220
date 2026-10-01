//Rachel Kambala u23559129
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

function LoginPage() {
    return (
        <main className="page">
            <section className="page-heading">
                <p className="heading">
                    THE ART ARCHIVE
                </p>

                <h1>Welcome Back</h1>

                <p>
                    Log in to continue exploring
                    the archive.
                </p>
            </section>

            <section className="authentication">
                <LoginForm />
            </section>

            <p>
                <Link to="/">
                    Back to The Art Archive
                </Link>
            </p>
        </main>
    );
}

export default LoginPage;