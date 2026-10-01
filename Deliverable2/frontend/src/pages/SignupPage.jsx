import React from "react";
import SignupForm from "../components/SignupForm.jsx";

function SignupPage() {
    return (
        <main className="page">
            <div className="page-heading">
                <h1>Sign Up</h1>
            </div>
            <SignupForm />
        </main>
    );
}

export default SignupPage;
