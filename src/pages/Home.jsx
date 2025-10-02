import { useState, useEffect } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularRecipes } from '../services/recipeService';

function Home({searchResults}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const recipeData = await getPopularRecipes();
        setRecipes(recipeData);
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
        console.log(err)
        setRecipes([]); // Set to empty array to prevent map errors
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array

  const displayRecipes = searchResults || recipes;
  
  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }



  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Popular Recipes</h2>
        <p>Discover delicious recipes for every meal</p>
      </div>
      <RecipeGrid recipes={displayRecipes} />
    </main>
  );
};

export default Home;