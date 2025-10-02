import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">🍳 RecipeBox</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {isAuthenticated && (
            <Link to="/favorites" className="nav-link">Favorites</Link>
          )}
          {hasRole('admin') && (
            <Link to="/admin" className="nav-link admin-link">Admin</Link>
          )}
        </nav>
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="username">👤 {user.username}</span>
              {hasRole('admin') && (
                <span className="admin-badge">Admin</span>
              )}
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search recipes..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;