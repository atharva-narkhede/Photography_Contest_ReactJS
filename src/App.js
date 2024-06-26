import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import UserRegister from './components/UserRegister';
import HomePage from './components/HomePage'; 
import ViewContests from './components/ViewContest'; 
import AdminDashboard from './components/AdminDashboard'; 
import Navbar from './components/Navbar';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userData = sessionStorage.getItem("username");
        const adminData = sessionStorage.getItem("u_email");
        if (userData) {
            setIsAuth(true);
        }
        if (adminData === "admin") {
            setIsAdmin(true);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setIsAuth(false);
        setIsAdmin(false);
    };

    return (
        <Router>
            <Navbar isAuth={isAuth} isAdmin={isAdmin} onLogout={handleLogout} />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<UserLogin setIsAuth={setIsAuth} />} />
                    <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/contests" element={<ViewContests />} />
                    <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <HomePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
