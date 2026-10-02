//u23559129 Rachel Kambala 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [errors, setErrors] =
        useState({});

    const [serverError, setServerError] =
        useState("");

    const [isLoading, setIsLoading] =
        useState(false);

    function validateForm() {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email =
                "Email address is required.";

        } else if (
            !/\S+@\S+\.\S+/.test(email)
        ) {
            newErrors.email =
                "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password =
                "Password is required.";
        }

        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setServerError("");

        const validationErrors =
            validateForm();

        setErrors(validationErrors);

        if (
            Object.keys(validationErrors)
                .length > 0
        ) {
            return;
        }

        try {
            setIsLoading(true);

            const response =
                await fetch(
                    "/api/users/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email:
                                email.trim(),
                            password
                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Login failed."
                );
            }

            localStorage.setItem(
                "userId",
                data.user._id
            );

            localStorage.setItem(
                "username",
                data.user.username
            );

            localStorage.setItem(
                "email",
                data.user.email
            );
            console.log(
                "Logged in user:",
                data.user
            );
            navigate("/home");

        } catch (error) {
            console.error(
                "Login error:",
                error
            );

            setServerError(
                error.message ||
                "Unable to log in."
            );

        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2>Enter the Archive</h2>
            <div className="form-group">
                <label htmlFor="login-email">
                    Email Address
                </label>
                <input
                    id="login-email"
                    type="email"
                    value={email}
                    placeholder="Enter your email"

                    onChange={(event) => {
                        setEmail(
                            event.target.value
                        );

                        setErrors(
                            (previousErrors) => ({
                                ...previousErrors,
                                email: ""
                            })
                        );

                        setServerError("");
                    }}

                    required

                    aria-invalid={
                        !!errors.email
                    }
                />

                {errors.email && (
                    <p className="form-error">
                        {errors.email}
                    </p>
                )}
            </div>
            <div className="form-group">
                <label
                    htmlFor="login-password"
                >
                    Password
                </label>

                <input
                    id="login-password"
                    type="password"
                    value={password}
                    placeholder="Enter your password"

                    onChange={(event) => {
                        setPassword(
                            event.target.value
                        );

                        setErrors(
                            (previousErrors) => ({
                                ...previousErrors,
                                password: ""
                            })
                        );

                        setServerError("");
                    }}

                    required

                    aria-invalid={
                        !!errors.password
                    }
                />

                {errors.password && (
                    <p className="form-error">
                        {errors.password}
                    </p>
                )}
            </div>
            {serverError && (
                <p className="form-error">
                    {serverError}
                </p>
            )}
            <button
                type="submit"
                disabled={isLoading}
            >
                {isLoading
                    ? "Logging In..."
                    : "Log In"}
            </button>
            <p>
                Don't have an account?{" "}
                <Link to="/signup">
                    Become an Artist
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;