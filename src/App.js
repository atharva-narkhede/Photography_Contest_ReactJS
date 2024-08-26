import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import UserRegister from './components/UserRegister';
import HomePage from './components/HomePage';
import ViewContests from './components/ViewContest';
import AdminDashboard from './components/AdminDashboard';
import NavbarComponent from './components/Navbar';
import { AdminAuthContext } from './context/AdminAuthContext';
import { UserAuthContext } from './context/UserAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'; // Import custom CSS

const App = () => {
    const { isAdminAuth } = useContext(AdminAuthContext);
    const { isUserAuth } = useContext(UserAuthContext);

    return (
        <Router>
            <NavbarComponent />
            <div className="main-content container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/contests" element={<ViewContests />} />
                    <Route path="/admin-dashboard" element={isAdminAuth ? <AdminDashboard /> : <AdminLogin />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
