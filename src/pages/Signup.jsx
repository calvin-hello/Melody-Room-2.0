import "../styles/nav.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            navigate("/login");
        } catch (error) {
            console.error("Sign up failed", error);
            setError(error.message);
        }
    };
    
    return (
        <div className="auth-page">
            <form className="auth-card signup-card" onSubmit={handleSubmit}>
                <div className="status-row">
                    <span>9:41</span>
                    <span>⌁ ◒ ▬</span>
                </div>

                <h1 className="melody-title signup-melody-title">Melody Room</h1>

                <div className="auth-fields signup-fields">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="purple-btn signup-purple-btn">
                    Create Account
                </button>

                <p className="auth-bottom-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}