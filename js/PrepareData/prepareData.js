import { getData } from "../services/getData.js";
import Store from "../StateManager/Store.js";
import { displayError } from "../Error/displayError.js";
import { recipeContainer } from "../utils/domElements.js";

export async function getRecipes() {
  try {
    // Récupérer les recettes depuis l'API
    const recipes = await getData();
    // Si les recettes sont récupérées avec succès, les enregistrer dans le store
    Store.dispatch({ type: "SET_RECIPES", payload: recipes });
    Store.dispatch({ type: "SET_RECIPES_SELECT", payload: recipes });
    Store.dispatch({ type: "SET_FILTERED_RECIPES_MAIN_SEARCH", payload: recipes });
  } catch (error) {
    // Passer l'erreur à l'appelant pour gérer l'affichage
    displayError(error.message, recipeContainer); // Affiche l'erreur dans le conteneur
    throw error;
  }
}


export function initializeData(data) {
  const ingredientsSet = new Set();
  const applianceSet = new Set();
  const ustensilsSet = new Set();

  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredientObj) => {
      ingredientsSet.add(ingredientObj.ingredient.toLowerCase());
    });
    applianceSet.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet.add(ustensil.toLowerCase());
    });
  });
  const infos = 
  {
    ingredients: Array.from(ingredientsSet),
    appliances: Array.from(applianceSet),
    ustensils: Array.from(ustensilsSet),
  }
  Store.dispatch({type: "SET_INGREDIENTS", payload: infos.ingredients});
  Store.dispatch({type: "SET_USTENSILS", payload: infos.ustensils});
  Store.dispatch({type: "SET_APPLIANCES", payload: infos.appliances});
  return infos ;
}

