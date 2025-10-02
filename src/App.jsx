import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Login from './components/Login';
import './App.css';
import { searchRecipes } from './services/recipeService';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    const results = await searchRecipes(query);
    setSearchResults(results);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />

            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;