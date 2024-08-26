import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Make the registration API call
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        { username, email, password },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,  // Include API key in the request
          },
          withCredentials: true,  // Ensure cookies are sent/received with the request
        }
      );

      // Redirect to login after successful registration
      navigate('/login');
    } catch (error) {
      // Handle errors and set error messages
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Registration failed. Please try again.'
      );
    } finally {
      // Stop loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-light" style={{ color: '#007bff' }}>Register</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form onSubmit={submitHandler} className="mx-auto shadow p-4 rounded bg-light" style={{ maxWidth: '400px', border: '2px solid #007bff' }}>
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#007bff' }}>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ borderColor: '#007bff', borderWidth: '2px' }}
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#007bff' }}>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderColor: '#007bff', borderWidth: '2px' }}
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#007bff' }}>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: '#007bff', borderWidth: '2px' }}
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#007bff' }}>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ borderColor: '#007bff', borderWidth: '2px' }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary d-block mx-auto mt-4" style={{ backgroundColor: '#007bff', borderColor: '#007bff', fontWeight: 'bold' }}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
