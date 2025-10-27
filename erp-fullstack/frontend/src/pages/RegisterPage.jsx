import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await register({ username, password, name });
            setMessage("Registered! Please login.");
            setTimeout(() => navigate("/login"), 1200);
        } catch (err) {
            setMessage(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="auth-page">
            <h2>Register</h2>
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
                <input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}
