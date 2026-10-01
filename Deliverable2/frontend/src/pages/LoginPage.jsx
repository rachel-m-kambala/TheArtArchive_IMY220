import React from "react";
import LoginForm from "../components/LoginForm.jsx";

function LoginPage() {
    return (
        <main className="page">
            <div className="page-heading">
                <h1>Log In</h1>
            </div>
            <LoginForm />
        </main>
    );
}

export default LoginPage;
