import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    mobno: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [editSection, setEditSection] = useState(null); // 'profile' or 'password'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.get('https://instaclone-8585.onrender.com/profile', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setUserData({
          username: response.data.user.username,
          email: response.data.user.email,
          mobno: response.data.user.mobno  
        });
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    fetchUserData();
  }, []);

  const handleProfileChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'https://instaclone-8585.onrender.com/profile/update',
        { ...userData, currentPassword: passwordData.currentPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Profile updated successfully');
      setEditSection(null);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://instaclone-8585.onrender.com/profile/password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Password updated successfully');
      setEditSection(null);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="ig-profile">
      <div className="ig-profile__header">
        <button 
          className="ig-profile__home-btn" 
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <h1 className="ig-profile__title">Edit Profile</h1>
      </div>

      {error && <div className="ig-profile__message ig-profile__message--error">{error}</div>}
      {success && <div className="ig-profile__message ig-profile__message--success">{success}</div>}

      <div className="ig-profile__section">
        <div className="ig-profile__section-header">
          <h2>Profile Information</h2>
          {editSection !== 'profile' && (
            <button 
              className="ig-profile__edit-btn"
              onClick={() => setEditSection('profile')}
            >
              Edit
            </button>
          )}
        </div>

        {editSection === 'profile' ? (
          <form className="ig-profile__form" onSubmit={handleProfileSubmit}>
            <div className="ig-profile__form-group">
              <label className="ig-profile__label">Username</label>
              <input
                type="text"
                name="username"
                className="ig-profile__input"
                value={userData.username}
                onChange={handleProfileChange}
              />
            </div>

            <div className="ig-profile__form-group">
              <label className="ig-profile__label">Email</label>
              <input
                type="email"
                name="email"
                className="ig-profile__input"
                value={userData.email}
                onChange={handleProfileChange}
              />
            </div>

            <div className="ig-profile__form-group">
              <label className="ig-profile__label">Mobile Number</label>
              <input
                type="text"
                name="mobno"
                className="ig-profile__input"
                value={userData.mobno}
                onChange={handleProfileChange}
              />
            </div>

            <div className="ig-profile__form-group">
              <label className="ig-profile__label">Confirm Password</label>
              <input
                type="password"
                name="currentPassword"
                className="ig-profile__input"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your password to confirm changes"
                required
              />
            </div>

            <div className="ig-profile__form-actions">
              <button 
                type="button" 
                className="ig-profile__cancel-btn"
                onClick={() => {
                  setEditSection(null);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="ig-profile__submit-btn">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="ig-profile__info">
            <div className="ig-profile__info-row">
              <span className="ig-profile__info-label">Username</span>
              <span className="ig-profile__info-value">{userData.username}</span>
            </div>
            <div className="ig-profile__info-row">
              <span className="ig-profile__info-label">Email</span>
              <span className="ig-profile__info-value">{userData.email}</span>
            </div>
            <div className="ig-profile__info-row">
              <span className="ig-profile__info-label">Mobile</span>
              <span className="ig-profile__info-value">{userData.mobno}</span>
            </div>
          </div>
        )}
      </div>

      <div className="ig-profile__section">
        <div className="ig-profile__section-header">
          <h2>Password</h2>
          {editSection !== 'password' && (
            <button 
              className="ig-profile__edit-btn"
              onClick={() => setEditSection('password')}
            >
              Change
            </button>
          )}
        </div>

        {editSection === 'password' ? (
          <form className="ig-profile__form" onSubmit={handlePasswordSubmit}>
            <div className="ig-profile__form-group">
              <label className="ig-profile__label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="ig-profile__input"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                required
              />
            </div>

            <div className="ig-profile__form-group">
              <label className="ig-profile__label">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="ig-profile__input"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="ig-profile__form-group">
              <label className="ig-profile__label">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="ig-profile__input"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="ig-profile__form-actions">
              <button 
                type="button" 
                className="ig-profile__cancel-btn"
                onClick={() => {
                  setEditSection(null);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="ig-profile__submit-btn">
                Change Password
              </button>
            </div>
          </form>
        ) : (
          <div className="ig-profile__info">
            <div className="ig-profile__info-row">
              <span className="ig-profile__info-label">Password</span>
              <span className="ig-profile__info-value">••••••••</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;