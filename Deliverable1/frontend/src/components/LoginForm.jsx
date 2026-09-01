import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email =
                "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters.";
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
                `${API_URL}/api/auth/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed."
                );
            }

            console.log("Login response:", data);

            setSuccessMessage(
                `${data.message} Welcome back, ${data.user.username}!`
            );

            setTimeout(() => {
                navigate("/home");
            }, 1000);

        } catch (error) {
            console.error("Login error:", error);

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
                    onChange={(event) => {
                        setEmail(event.target.value);

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
                <label htmlFor="login-password">
                    Password
                </label>

                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);

                        setErrors((previousErrors) => ({
                            ...previousErrors,
                            password: ""
                        }));

                        setServerError("");
                        setSuccessMessage("");
                    }}
                    placeholder="Enter your password"
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
                    ? "Entering..."
                    : "Enter the Archive"}
            </button>
        </form>
    );
}

export default LoginForm;