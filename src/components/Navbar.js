import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuth, isAdmin, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

                .navbar {
                    font-family: 'Raleway', sans-serif;
                }

                .navbar-brand,
                .nav-link,
                .btn {
                    font-family: 'Raleway', sans-serif !important; /* Important to override default Bootstrap styles */
                }
                `}
            </style>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Photography Contest</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {isAuth || isAdmin ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contests">Contests</Link>
                                    </li>
                                    {isAdmin && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin-dashboard">Dashboard</Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button className="btn btn-outline-secondary" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin-login">Admin Login</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
