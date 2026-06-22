// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Login submitted for:', credentials.username);
    
    const result = await login(credentials.username, credentials.password);
    setLoading(false);
    
    console.log('Login result:', result);
    
    if (result.success) {
      console.log('Login successful, navigating to /dashboard');
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-card"
      >
        <div className="login-header">
          <div className="logo-icon">🛍️</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Test Credentials: <strong>emilys</strong> / <strong>emilyspass</strong></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;