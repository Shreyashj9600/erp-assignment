import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout, getUser } from '../services/authService';

export default function Layout() {
    const navigate = useNavigate();
    const user = getUser();
    const onLogout = () => { logout(); navigate('/login'); };

    return (
        <div className="app">
            <nav className="topbar">
                <div className="brand">Mini ERP</div>
                <div className="navlinks">
                    <Link to="/customers">Customers</Link>
                    <Link to="/inquiries">Inquiries</Link>
                </div>
                <div className="user">
                    <span>{user?.name || user?.username}</span>
                    <button onClick={onLogout}>Logout</button>
                </div>
            </nav>
            <main className="container">
                <Outlet />
            </main>
        </div>
    );
}
