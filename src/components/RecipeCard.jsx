import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();


  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      return;
    }

    // Load all favorites organized by user
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipesByUser')) || {};
    const userFavorites = allFavorites[user.username] || [];
    
    // Check if this recipe is in the current user's favorites
    const isRecipeFavorite = userFavorites.some(fav => fav.id === recipe.id);
    setIsFavorite(isRecipeFavorite);
  }, [recipe.id, user]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipe')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
      localStorage.setItem('favoriteRecipe', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      localStorage.setItem('favoriteRecipe', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img 
          src={recipe.image} 
          alt={recipe.title}
        />
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="recipe-details">
          <span className="recipe-time">⏱️ {recipe.readyInMinutes} min</span>
          <span className="recipe-servings">🍽️ {recipe.servings} servings</span>
        </div>
        <button 
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;