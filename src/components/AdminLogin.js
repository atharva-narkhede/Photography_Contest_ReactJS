import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import url from '../url';

const AdminLogin = ({ setIsAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); 
       
        try {
            // Fetch admin data from the server
            const response = await axios.get(`${url}/admin/fetch`);

            // Assuming the server responds with an array of admin objects
            const admins = response.data;

            // Check if there's an admin with the provided email and password
            const admin = admins.find(a => a.email === email && a.password === password);

            if (admin) {
                // Login successful
                console.log('Admin login successful for:', admin.email);

                // Set session data if needed
                sessionStorage.clear();
                sessionStorage.setItem('u_email', 'admin');
                setIsAdmin(true);
                navigate('/admin-dashboard'); // Redirect to admin dashboard after successful login
            } else {
                // No admin found with the provided credentials
                console.log('Invalid email or password');
                // Handle invalid credentials scenario (show alert, etc.)
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Admin login error:', error);
            // Handle errors here
            alert('Admin login failed. Please try again.');
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div className="container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                ) : (
                    <button type="submit" className="btn btn-primary">Login</button>
                )}
            </form>
        </div>
    );
};

export default AdminLogin;
