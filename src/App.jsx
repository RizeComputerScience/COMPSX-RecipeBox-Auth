import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';
import { searchRecipes } from './services/recipeService';
import { useState } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    const results = await searchRecipes(query);
    setSearchResults(results);
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;