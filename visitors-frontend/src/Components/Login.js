import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserId, setRole } from '../Redux/userSlice'; 
import { loginUser } from '../API/UserApi';
import "../Styles/Login.css";

const Login = () => {
  const [userId, setUserIdState] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get role from Redux store
  const role = useSelector((state) => state.user.role);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!userId || !password) {
      setMessage("User ID and Password are required.");
      return;
    }

    setLoading(true); // Start loading state
    try {
      // Make the login API call
      const data = await loginUser({ UserID: userId, Password: password });

      if (data.success) {
        dispatch(setUserId(userId)); // Dispatching the action to store userId
        dispatch(setRole(data.role)); // Set user role in Redux store
        setMessage(data.message);
        navigate('/home'); // Navigate to home on success
      } else {
        setMessage(data.message); // Display error message
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Reset loading state after request is completed
    }
  };

  // Navigate to signup page
  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  // Conditional rendering based on user role
  const renderAdminActions = () => {
    if (role === 'admin') {
      return (
        <div className="admin-actions">
          <button onClick={() => navigate('/update')} className="admin-button">
            Update Record
          </button>
          <button onClick={() => navigate('/delete')} className="admin-button">
            Delete Record
          </button>
        </div>
      );
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className="login-modal-form">
          <div className="login-modal-row">
            <div className="login-modal-column">
              <label>UserId:</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserIdState(e.target.value)}
                required
              />
            </div>
            <div className="login-modal-column">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button onClick={handleSignupRedirect} className="login-signup-button">
          Don't have an account? Sign Up
        </button>

        {/* Conditionally render admin actions */}
        {renderAdminActions()}
      </div>
    </div>
  );
};

export default Login;
