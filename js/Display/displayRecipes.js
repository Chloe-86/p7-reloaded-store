import Store from '../StateManager/Store.js';
import { FactoryCard } from '../templates/FactoryCard.js';
import { recipeContainer } from '../utils/domElements.js';

/**
 * Affiche les recettes dans le conteneur spécifié.
 * @param {Array<Object>} recipes - Liste des recettes à afficher.
 */
export function displayRecipes(recipes) {
  recipeContainer.innerHTML = ''; // Vide le conteneur avant de rajouter les recettes
  
  recipes.forEach(recipe => {
    const imagePath = `./assets/images/recipes/${recipe.image || 'placeholder.jpg'}`;
    const recipeData = { ...recipe, imagePath }; // Compacte dans un objet unique
    FactoryCard(recipeData, recipeContainer); // Appelle la fonction pour chaque recette
  });
}


