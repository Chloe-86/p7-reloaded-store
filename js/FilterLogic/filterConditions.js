
import { getFormattedState } from "../utils/states.js";

export function filterConditions(type) {
  const { arrayFilter, arrayFilter_fs, recipes, selectRecipes, filteredRecipes } = getFormattedState();
  let result;

  // Utilisation d'un switch pour gérer les différents cas de filtrage
  switch (true) {
   
    case arrayFilter_fs.length > 0:
      // console.log("input vide");
      result = filteredRecipes;
      break;
    case arrayFilter_fs.length === 0 && arrayFilter.length === 0:
      // console.log("Case 1: Aucun filtre actif stocké");
      result = recipes;
      break;

    case arrayFilter_fs.length === 0 && arrayFilter.length > 0:
      // console.log("Case 2: Filtrage basé uniquement sur les sélections");
      result = selectRecipes;
      break;

    case arrayFilter.length === 0 && arrayFilter_fs.length > 0:
      // console.log("Case 3: Filtrage basé uniquement sur l'input");
      result = filteredRecipes;
      break;

    case arrayFilter.length > 0 && arrayFilter_fs.length > 0:
      // console.log("Case 4: Filtrage basé sur les 2");
      if (type === "input") {
        result = selectRecipes;
      } else if (type === "select") {
        result = filteredRecipes;
      }
      break;

    case arrayFilter_fs.length > 0 && arrayFilter === 0:
      // console.log("select vide");
      result = filteredRecipes;
      break;

    default:
      // console.log("Case Default: Toutes les recettes par défaut");
      result = recipes;
      break;
  }

  return result;
}
