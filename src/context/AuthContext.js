// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../api/authApi';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    console.log('Stored token found:', !!storedToken);
    
    if (storedToken) {
      loadUser();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = async () => {
    try {
      console.log('Loading user with token');
      const userData = await authApi.getCurrentUser();
      console.log('User loaded:', userData);
      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log('Attempting login for:', username);
      const data = await authApi.login(username, password);
      console.log('Login response:', data);
      
      // Store token
      localStorage.setItem('authToken', data.accessToken);
      
      // Get user profile
      const userData = await authApi.getUserProfile(data.id);
      console.log('User profile:', userData);
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};