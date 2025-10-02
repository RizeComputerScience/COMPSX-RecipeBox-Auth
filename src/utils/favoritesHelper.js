export function getAllUserFavorites() {
  const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipesByUser')) || {};
  return allFavorites;
}

export function getUserFavorites(username) {
  const allFavorites = getAllUserFavorites();
  return allFavorites[username] || [];
}

export function getUserStats() {
  const allFavorites = getAllUserFavorites();
  
  return Object.keys(allFavorites).map(username => ({
    username,
    favoriteCount: allFavorites[username].length,
    favorites: allFavorites[username]
  }));
}