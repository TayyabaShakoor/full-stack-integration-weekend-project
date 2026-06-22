// src/pages/Profile.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await authApi.getUserProfile(user.id);
      setProfile(data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [user.id]); // Add user.id as dependency

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); // Add fetchProfile to dependencies

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
            <span className="logo">👤 My Profile</span>
          </div>
        </div>
      </nav>

      <div className="profile-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-card"
        >
          <div className="profile-header">
            <div className="avatar">
              {profile?.firstName?.[0] || 'U'}
            </div>
            <div>
              <h2>{profile?.firstName} {profile?.lastName}</h2>
              <p className="email">{profile?.email}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="label">Username</span>
              <span className="value">{profile?.username}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email</span>
              <span className="value">{profile?.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Phone</span>
              <span className="value">{profile?.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Age</span>
              <span className="value">{profile?.age}</span>
            </div>
          </div>

          <div className="profile-section">
            <h3>📍 Address</h3>
            <div className="address-box">
              <p>{profile?.address?.address}</p>
              <p>{profile?.address?.city}, {profile?.address?.state}</p>
              <p>{profile?.address?.postalCode}</p>
            </div>
          </div>

          <div className="profile-section">
            <h3>🏢 Company</h3>
            <div className="company-box">
              <p className="company-name">{profile?.company?.name}</p>
              <p className="company-title">{profile?.company?.title}</p>
              <p className="company-dept">{profile?.company?.department}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;