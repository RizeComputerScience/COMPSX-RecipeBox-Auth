import { useState, useEffect } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { user } = useAuth();



  useEffect(() => {
    if (!user) {
      setFavoriteRecipes([]);
      return;
    }

    // Load all favorites from localStorage
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipesByUser')) || {};
    
    // Get only the current user's favorites
    const userFavorites = allFavorites[user.username] || [];
    setFavoriteRecipes(userFavorites);
  }, [user]);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorite Recipes</h2>
        <p>Your saved recipe collection</p>
      </div>
      {favoriteRecipes.length > 0 ? (
        <RecipeGrid recipes={favoriteRecipes} />
      ) : (
        <div className="empty-state">
          <p>No favorite recipes yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;