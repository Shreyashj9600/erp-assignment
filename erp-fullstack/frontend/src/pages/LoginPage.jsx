import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
// import '../styles/app.css';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="auth-page">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={submit}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Or <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
