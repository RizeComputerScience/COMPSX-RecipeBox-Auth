import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { getUserStats } from '../utils/favoritesHelper';
import './AdminPage.css';

function AdminPage() {
  const { hasRole } = useAuth();

  // Check if user is admin
  if (!hasRole('admin')) {
    return <Navigate to="/" replace />;
  }

  const userStats = getUserStats();

  return (
    <main className="main-content admin-page">
      <div className="content-header">
        <h2>Admin Dashboard</h2>
        <p>View all users and their saved recipes</p>
      </div>

      {userStats.length === 0 ? (
        <div className="empty-state">
          <p>No users have saved any recipes yet.</p>
        </div>
      ) : (
        <div className="user-stats">
          {userStats.map(stat => (
            <div key={stat.username} className="user-card">
              <div className="user-card-header">
                <h3>{stat.username}</h3>
                <span className="favorite-count">
                  {stat.favoriteCount} favorites
                </span>
              </div>
              
              {stat.favorites.length > 0 && (
                <div className="favorites-preview">
                  <h4>Saved Recipes:</h4>
                  <ul>
                    {stat.favorites.map(recipe => (
                      <li key={recipe.id}>{recipe.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminPage;