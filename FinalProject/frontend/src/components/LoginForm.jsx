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
            className="login-form w-full rounded-xl bg-white p-6 text-[#253247] sm:p-10"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2 className="mb-6 text-2xl font-semibold text-[#253247]">
                Enter the Archive
            </h2>

            <div className="mb-5">
                <label
                    htmlFor="login-email"
                    className="mb-2 block font-medium text-[#253247]"
                >
                    Email Address
                </label>

                <input
                    id="login-email"
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            email: ""
                        }));
                        setServerError("");
                    }}
                    required
                    aria-invalid={!!errors.email}
                    className={`w-full rounded-lg border bg-[#3D485C] px-5 py-4 text-white placeholder:text-[#D1D5DB] outline-none transition focus:ring-2 focus:ring-[#9D2E36] ${
                        errors.email
                            ? "border-red-600"
                            : "border-[#647084]"
                    }`}
                />

                {errors.email && (
                    <p className="mt-2 text-sm text-red-700">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="login-password"
                    className="mb-2 block font-medium text-[#253247]"
                >
                    Password
                </label>

                <input
                    id="login-password"
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            password: ""
                        }));
                        setServerError("");
                    }}
                    required
                    aria-invalid={!!errors.password}
                    className={`w-full rounded-lg border bg-[#3D485C] px-5 py-4 text-white placeholder:text-[#D1D5DB] outline-none transition focus:ring-2 focus:ring-[#9D2E36] ${
                        errors.password
                            ? "border-red-600"
                            : "border-[#647084]"
                    }`}
                />

                {errors.password && (
                    <p className="mt-2 text-sm text-red-700">
                        {errors.password}
                    </p>
                )}
            </div>

            {serverError && (
                <p
                    role="alert"
                    className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
                >
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#9D2E36] px-5 py-4 font-semibold text-white transition hover:bg-[#81242C] focus:outline-none focus:ring-2 focus:ring-[#9D2E36] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? "Logging In..." : "Log In"}
            </button>

            <p className="mt-5 text-sm text-[#4B5563]">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="font-medium text-[#9D2E36] underline-offset-4 hover:underline"
                >
                    Become an Artist
                </Link>
            </p>
        </form>
    );
}
export default LoginForm;