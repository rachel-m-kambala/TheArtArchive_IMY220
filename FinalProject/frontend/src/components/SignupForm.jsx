//Rachel Kambala u23559129
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");

    const [errors, setErrors] =
        useState({});

    const [
        serverError,
        setServerError
    ] = useState("");

    const [
        isLoading,
        setIsLoading
    ] = useState(false);


    function validateForm() {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username =
                "Username is required.";

        } else if (
            username.trim().length < 3
        ) {
            newErrors.username =
                "Username must be at least 3 characters.";

        } else if (
            username.trim().length > 20
        ) {
            newErrors.username =
                "Username cannot be longer than 20 characters.";

        } else if (
            !/^[a-zA-Z0-9_]+$/.test(
                username.trim()
            )
        ) {
            newErrors.username =
                "Username may only contain letters, numbers and underscores.";
        }

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

        } else if (
            password.length < 8
        ) {
            newErrors.password =
                "Password must be at least 8 characters.";

        } else if (
            !/[A-Z]/.test(password)
        ) {
            newErrors.password =
                "Password must contain at least one uppercase letter.";

        } else if (
            !/[0-9]/.test(password)
        ) {
            newErrors.password =
                "Password must contain at least one number.";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";

        } else if (
            password !== confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";
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
                    "/api/users/signup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            username:
                                username.trim(),

                            email:
                                email
                                    .trim()
                                    .toLowerCase(),

                            password
                        })
                    }
                );
            const data =
                await response.json();
            if (!response.ok) {
                throw new Error(
                    "Registration failed."
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
                "New user:",
                data.user
            );


            navigate("/home");

        } catch (error) {
            console.error(
                "Signup error:",
                error
            );

            setServerError(
                error.message ||
                "Unable to create account."
            );

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            className="signup-form w-full rounded-xl bg-white p-6 text-[#253247] sm:p-10"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2 className="mb-6 text-2xl font-semibold text-[#253247]">
                Join the Archive
            </h2>

            <div className="mb-5">
                <label
                    htmlFor="username"
                    className="mb-2 block font-medium text-[#253247]"
                >
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            username: ""
                        }));
                        setServerError("");
                    }}
                    placeholder="Choose a username"
                    required
                    minLength={3}
                    maxLength={20}
                    aria-invalid={!!errors.username}
                    className={`w-full rounded-lg border bg-[#3D485C] px-5 py-4 text-white placeholder:text-[#D1D5DB] outline-none transition focus:ring-2 focus:ring-[#9D2E36] ${
                        errors.username ? "border-red-600" : "border-[#647084]"
                    }`}
                />

                {errors.username && (
                    <p className="mt-2 text-sm text-red-700">
                        {errors.username}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="signup-email"
                    className="mb-2 block font-medium text-[#253247]"
                >
                    Email Address
                </label>

                <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            email: ""
                        }));
                        setServerError("");
                    }}
                    placeholder="Enter your email"
                    required
                    aria-invalid={!!errors.email}
                    className={`w-full rounded-lg border bg-[#3D485C] px-5 py-4 text-white placeholder:text-[#D1D5DB] outline-none transition focus:ring-2 focus:ring-[#9D2E36] ${
                        errors.email ? "border-red-600" : "border-[#647084]"
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
                    htmlFor="signup-password"
                    className="mb-2 block font-medium text-[#253247]"
                >
                    Password
                </label>

                <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            password: ""
                        }));
                        setServerError("");
                    }}
                    placeholder="Create a password"
                    required
                    minLength={8}
                    aria-invalid={!!errors.password}
                    className={`w-full rounded-lg border bg-[#3D485C] px-5 py-4 text-white placeholder:text-[#D1D5DB] outline-none transition focus:ring-2 focus:ring-[#9D2E36] ${
                        errors.password ? "border-red-600" : "border-[#647084]"
                    }`}
                />

                {errors.password && (
                    <p className="mt-2 text-sm text-red-700">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="confirm-password"
                    className="mb-2 block font-medium text-[#253247]"
                >
                    Confirm Password
                </label>

                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            confirmPassword: ""
                        }));
                        setServerError("");
                    }}
                    placeholder="Repeat your password"
                    required
                    aria-invalid={!!errors.confirmPassword}
                    className={`w-full rounded-lg border bg-[#3D485C] px-5 py-4 text-white placeholder:text-[#D1D5DB] outline-none transition focus:ring-2 focus:ring-[#9D2E36] ${
                        errors.confirmPassword ? "border-red-600" : "border-[#647084]"
                    }`}
                />

                {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-700">
                        {errors.confirmPassword}
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
                {isLoading ? "Joining..." : "Join the Archive"}
            </button>

            <p className="mt-5 text-sm text-[#4B5563]">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-medium text-[#9D2E36] underline-offset-4 hover:underline"
                >
                    Log In
                </Link>
            </p>
        </form>
    );
}
export default SignupForm;