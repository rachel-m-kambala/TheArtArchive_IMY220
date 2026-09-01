import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function SignupForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] =
        useState("");
    const [serverError, setServerError] =
        useState("");
    const [isLoading, setIsLoading] =
        useState(false);

    function validateForm() {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username =
                "Username is required.";
        } else if (username.length < 3) {
            newErrors.username =
                "Username must be at least 3 characters.";
        } else if (username.length > 20) {
            newErrors.username =
                "Username cannot be longer than 20 characters.";
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            newErrors.username =
                "Username may only contain letters, numbers and underscores.";
        }

        if (!email.trim()) {
            newErrors.email =
                "Email address is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email =
                "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password =
                "Password is required.";
        } else if (password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters.";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password =
                "Password must contain at least one uppercase letter.";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password =
                "Password must contain at least one number.";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword =
                "Passwords do not match.";
        }

        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setSuccessMessage("");
        setServerError("");

        const validationErrors = validateForm();

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Registration failed."
                );
            }

            console.log("Signup response:", data);

            setSuccessMessage(
                `${data.message} Welcome to The Art Archive, ${data.user.username}!`
            );

            setTimeout(() => {
                navigate("/home");
            }, 1500);

        } catch (error) {
            console.error("Signup error:", error);

            setServerError(
                error.message ||
                "Unable to connect to the server."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            className="signup-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2>Join the Archive</h2>

            <div className="form-group">
                <label htmlFor="username">
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => {
                        setUsername(
                            event.target.value
                        );

                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            username: ""
                        }));

                        setServerError("");
                        setSuccessMessage("");
                    }}
                    placeholder="Choose a username"
                    required
                    minLength="3"
                    maxLength="20"
                    aria-invalid={!!errors.username}
                />

                {errors.username && (
                    <p className="form-error">
                        {errors.username}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="signup-email">
                    Email Address
                </label>

                <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(
                            event.target.value
                        );

                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            email: ""
                        }));

                        setServerError("");
                        setSuccessMessage("");
                    }}
                    placeholder="Enter your email"
                    required
                    aria-invalid={!!errors.email}
                />

                {errors.email && (
                    <p className="form-error">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="signup-password">
                    Password
                </label>

                <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(
                            event.target.value
                        );

                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            password: ""
                        }));

                        setServerError("");
                        setSuccessMessage("");
                    }}
                    placeholder="Create a password"
                    required
                    minLength="8"
                    aria-invalid={!!errors.password}
                />

                {errors.password && (
                    <p className="form-error">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="confirm-password">
                    Confirm Password
                </label>

                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(
                            event.target.value
                        );

                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            confirmPassword: ""
                        }));

                        setServerError("");
                        setSuccessMessage("");
                    }}
                    placeholder="Repeat your password"
                    required
                    aria-invalid={
                        !!errors.confirmPassword
                    }
                />

                {errors.confirmPassword && (
                    <p className="form-error">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            {serverError && (
                <p className="form-error">
                    {serverError}
                </p>
            )}

            {successMessage && (
                <p className="form-success">
                    {successMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
            >
                {isLoading
                    ? "Joining..."
                    : "Join the Archive"}
            </button>
        </form>
    );
}

export default SignupForm;