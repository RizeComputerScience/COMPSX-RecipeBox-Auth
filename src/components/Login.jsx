import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('regular');


  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement authentication logic here

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Clear any previous errors
    setError('');

    // Call login function from AuthContext
    login(username, password, role);
    
    // Redirect to home page after successful login
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to NewsReader</h2>
        <p className="login-subtitle">Access your personalized news experience</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="regular">Regular User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="demo-info">
          <p><strong>Demo Accounts (for testing):</strong></p>
          <p>Any username/password combination will work</p>
          <p>Select "Regular" or "Admin" to test different access levels</p>
        </div>
      </div>
    </div>
  );
}

export default Login;