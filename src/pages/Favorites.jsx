import React, { useState, useEffect } from 'react';
import RecipeGrid from '../components/RecipeGrid';

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipe')) || [];
    setFavoriteRecipes(favorites);
  }, []);

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