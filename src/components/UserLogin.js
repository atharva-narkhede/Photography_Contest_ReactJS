import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../url';
import { Spinner } from 'react-bootstrap';

const UserLogin = ({ setIsAuth, setSessionData }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start the spinner
        try {
            // Fetch user data from the server
            const response = await axios.get(url + '/users/fetch');
    
            // Assuming the server responds with an array of user objects
            const users = response.data;
    
            // Check if there's a user with the provided email and password
            const user = users.find(u => u.email === email && u.password === password);
    
            if (user) {
                // Login successful
                console.log('Login successful for:', user.email);
    
                // Set session data if needed
                sessionStorage.setItem("u_email", user.email)
                sessionStorage.setItem("username", user.username)
                setIsAuth(true);
                navigate('/'); // Redirect to home page after successful login
            } else {
                // No user found with the provided credentials
                console.log('Invalid email or password');
                alert("Invalid Credentials")
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("Error connecting server")
        } finally {
            setLoading(false); // Stop the spinner
        }
    };
    

    return (
        <div className="container">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

                body, .form-group, label, input, .btn {
                    font-family: 'Raleway', sans-serif;
                }
                `}
            </style>

            <h2>User Login</h2>
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
                <button type="submit" className="btn btn-primary">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default UserLogin;
