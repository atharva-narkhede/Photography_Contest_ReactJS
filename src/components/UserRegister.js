import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from "../url";
import { Spinner } from 'react-bootstrap';

const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [userExists, setUserExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const checkUserExists = async () => {
        try {
            const response = await axios.get(`${url}/users/fetch`);
            const user = response.data.find(user => user.email === email);
            setUserExists(!!user);
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true); // Start the spinner

        await checkUserExists();

        if (userExists) {
            setErrors({ email: 'Email already registered' });
            setLoading(false); // Stop the spinner
            return;
        }

        try {
            await axios.post(`${url}/users/insert`, { username, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setLoading(false); // Stop the spinner
        }
    };

    return (
        <div className="register-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;400;700&display=swap');

                body {
                    font-family: 'Raleway', sans-serif;
                }

                .register-container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    background-color: #f9f9f9;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                .form-control {
                    width: 100%;
                    padding: 10px;
                    margin: 5px 0 10px 0;
                    display: inline-block;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                }

                .form-label {
                    font-weight: 700;
                }

                .error-text {
                    color: red;
                    font-size: 0.8rem;
                }

                .btn {
                    padding: 10px 15px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .btn:hover {
                    background-color: #0056b3;
                }
            `}</style>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <p className="error-text">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="btn">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default UserRegister;
