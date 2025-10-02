import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes }) => {
  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;