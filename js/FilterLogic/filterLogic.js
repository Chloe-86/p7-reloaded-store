import { recipeContainer, totalRecipes } from "../utils/domElements.js";
import Store from "../StateManager/Store.js";
import { filterRenderTotal } from "../FilterRender/filterRenderTotal.js";
import { displayRecipes } from "../Display/displayRecipes.js";
import { errorMessage } from "../Error/errorMessage.js";
import { filterConditions } from "./filterConditions.js";
import { getFormattedState } from "../utils/states.js";

//modele fonction gestion

// Fonction pour afficher les recettes ou afficher un message d'erreur
/**
 * Gère l'affichage des recettes ou un message d'erreur en fonction des données fournies.
 *
 * @param {Array} [outputRecipes=[]] - le tableau des recettes affiché.
 * @param {string|null} [query=null] - l'inputValue ayant déclenché l'opération.
 * @param {string|null} [error=null] - Le message d'erreur à afficher si aucune recette n'est trouvée(soit erreur depuis input main research ou input select)
 * @param {number} [total=totalRecipes] - Le container contenant le nombre total de recettes disponibles pour la recherche effectué.
 * @param {HTMLElement} [container=recipeContainer] - Le conteneur HTML où afficher les recettes ou le message d'erreur.
 * @param {string|null} [type=null] - Le type event select ou input .
 * @param {string|null} [typeOf=null] - Le type de sortie attendu, correspondant au type de résultat des filtres.
 * @param {string|null} [typeDispatch] - le type d'execution de dispatch effectué
 *
 */
export function handleErrorOrDisplay(
  outputRecipes = [],
  typeDispatch = null,
  query = null,
  error = null,
  total = totalRecipes,
  container = recipeContainer
) {
  if (outputRecipes.length === 0) {
    // Si aucune recette n'est trouvée
    errorMessage(error, container, query); // Afficher un message d'erreur
    Store.dispatch({ type: "SET_ERROR", payload: error });
    // Passer une liste vide à filterRenderTotal
    filterRenderTotal([], total);
  } else {
    displayRecipes(outputRecipes);
    filterRenderTotal(outputRecipes, total);
    Store.dispatch({ type: "SET_ERROR", payload: "" });
  }
}
// ------------------------------------------------FUNCTION GENERAL -------------------------------------
/**
 * Filtre les recettes en fonction des types d'événements et de la requête donnée.
 *
 * @param {string|null} [type=null] - Le type d'événement, soit "click" pour les sélections, soit "input" pour la saisie.
 * @param {string|null} [query=null] - La requête saisie par l'utilisateur pour filtrer les recettes (optionnel).
 * @returns {Array} - Un tableau des recettes filtrées en fonction du type d'événement et de la requête.
 */
export function filterGeneral(type = null, query = null) {
  let outputRecipes = [];
  let { arrayFilter } = getFormattedState();

  if (type === "click") {
    const enterRecipes = filterConditions("select");
    outputRecipes = filterSelected(enterRecipes, arrayFilter);
  }

  if (type === "input") {
    let enterRecipes = filterConditions("input");
    if (query) {
      //execute la logique de filtrage
      outputRecipes = compareInput(enterRecipes, query);
    } else {
      //ne passe pas dans l'execution de la logique de filtrage et renvoi au display les recettes filtres
      outputRecipes = enterRecipes;
    }
  }

  return outputRecipes;
}

// --------------------------------------------FILTER SELECT LOGIC-------------------------------------------------------//
/**
 * Filtre les recettes en fonction des filtres sélectionnés.
 * Cette fonction vérifie si chaque filtre (ingrédients, ustensiles, ou appareil) est présent dans chaque recette et met à jour l'affichage en conséquence.
 * Si aucune recette ne correspond aux filtres, un message d'erreur est affiché.
 * 
 * @param {Array<Object>} data - Tableau des recettes à filtrer. 
 * @param {Array<string>} dataToFilter - Tableau des filtres sélectionnés. 
 *
 */
export function filterSelected(data, dataToFilter) {
  const recipes = data.filter((recipe) => {
    // Vérifier si chaque filtre est présent dans la recette
    const match = dataToFilter.every(
      (filter) =>
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())) ||
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(filter.toLowerCase())) ||
        recipe.appliance.toLowerCase().includes(filter.toLowerCase())
    );
    // Retourner true si tous les filtres sont présents dans la recette
    return match;
  });
  return recipes;
}

//INPUT A L INTERIEUR DES SELECTS
/**
 * Compare le terme de recherche avec le set de données en question.
 * @param {Array<Object>} dataSet -le tableau a filtrer
 * @param {string} query - Le terme de recherche de l'utilisateur.
 */
//logique de filtrage interne compare la query avec tableau d' ingredients ou ustensils ou appareil(appliances)
export function selectFilterSearchLogic(dataSet, query) {
  const filteredData = dataSet.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return filteredData;
}

// --------------------------------------------FILTER INPUT MAIN RESEARCH LOGIC-------------------------------------------------------//


/**
 * Compare le terme de recherche avec le nom, la description et les ingrédients d'une recette.
 * @param {Array<Object>} data - L'objet array à comparer.
 * @param {string} query - Le terme de recherche de l'utilisateur.
 * @returns {boolean} - True si une correspondance est trouvée dans le nom, la description ou les ingrédients.
 */
export function compareInput(data, query) {
  const filteredRecipes = [];

  // Parcourir les recettes une par une
  for (let i = 0; i < data.length; i++) {
      const recipe = data[i];

      // Vérifier si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
      if (compareJSON(recipe, query)) {
          filteredRecipes.push(recipe); // Ajouter à la liste des recettes filtrées
      }
  }
  return filteredRecipes;
}

/**
* Compare le terme de recherche avec le nom, la description et les ingrédients d'une recette.
* @param {Object} recipe - L'objet recette à comparer.
* @param {string} query - Le terme de recherche de l'utilisateur.
* @returns {boolean} - True si une correspondance est trouvée dans le nom, la description ou les ingrédients.
*/
export function compareJSON(recipe, query) {
// Vérifier si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
const matchName = recipe.name.toLowerCase().includes(query);
const matchDescription = recipe.description.toLowerCase().includes(query);

// Vérifier si le terme de recherche est présent dans les ingrédients
let matchIngredients = false;
for (let i = 0; i < recipe.ingredients.length; i++) {
  if (recipe.ingredients[i].ingredient.toLowerCase().includes(query)) {
    matchIngredients = true;
    break; // Si un match est trouvé, sortir de la boucle
  }
}
return matchName || matchDescription || matchIngredients;
}
