import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './AdminPage.css';

function AdminPage({ favoritesByUser }) {

  return (
    <main className="main-content admin-page">
      <div className="content-header">
        <h2>Admin Dashboard</h2>
        <p>View all users and their saved recipes</p>
      </div>
    </main>
  );
}

export default AdminPage;
