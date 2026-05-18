import "../styles/nav.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (response.ok === false) {
                setError("Wrong username or password.");
                return;
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/home");

        } catch (err) {
            setError("Could not reach the server. Is the backend running on port 5000?");
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <div className="status-row">
                    <span>9:41</span>
                    <span>⌁ ◒ ▬</span>
                </div>

                <h1 className="melody-title">Melody Room</h1>

                <div className="logo-circle">🎶</div>

                <div className="auth-fields login-fields">
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
                </div>

                {error && (
                    <p style={{ color: "#ff9aa2", textAlign: "center", margin: "8px 0" }}>
                        {error}
                    </p>
                )}

                <button type="submit" className="purple-btn">Log in</button>

                <p className="auth-bottom-text">
                    Don’t have an account? <Link to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    );
}