//Rachel Kambala u23559129
import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm.jsx";

function SignupPage() {
    return (
        <main className="page">
            <section className="page-heading">
                <p className="heading">
                    THE ART ARCHIVE
                </p>

                <h1>Become an Artist</h1>

                <p>
                    Create your account and join
                    the creative community.
                </p>
            </section>

            <section className="authentication">
                <SignupForm />
            </section>

            <p>
                <Link to="/">
                    Back to The Art Archive
                </Link>
            </p>
        </main>
    );
}

export default SignupPage;