
import { filterRenderDisplay } from "../../FilterRender/filterRenderDisplay.js";
import { inputSanitize } from "../Filter/utils.js";
import { selectFilterSearchLogic, compareInput, compareJSON, handleErrorOrDisplay } from "../../FilterLogic/filterLogic.js";
import Store from "../../StateManager/Store.js";
import { searchInput, totalRecipes } from "../domElements.js";
import { searchBtn, selectedFiltersUl, recipeContainer } from "../domElements.js";
import { addActiveFilterModel } from "../../utils/Filter/utils.js";
import { createListItem } from "../../templates/FactoryBtn.js";
import { filterConditions } from "../../FilterLogic/filterConditions.js";
import { getFormattedState } from "../states.js";
import { filterGeneral } from "../../FilterLogic/filterLogic.js";


const error = Store.getState().error;
/**
 * Vérifie l'entrée utilisateur des filtres et déclenche la fonction appropriée
 *
 * @param {*} input - l'élément input sur lequel l'utilisateur interagit
 * @param {} dataSet - les données sur lesquelles effectuer la recherche
 * @param {*} filterWrapper - l'élément wrapper où afficher les résultats filtrés
 */
export function onSearch(input, dataSet = null, filterWrapper = null) {
  input.addEventListener("input", (e) => {
    const { arrayFilter, arrayFilter_fs, recipes, selectRecipes, filteredRecipes} = getFormattedState();
    const query = e.target.value.trim().toLowerCase();
    inputSanitize(query);
    const inputType = input.getAttribute("data-type");

    switch (inputType) {
      case "search-select":
        onSearchClickSelect(input, dataSet, filterWrapper, query);
        break;
      case "main-research":
        onSearchMainResearch(input, query);
        break;
      default:
        console.warn("Type d'entrée non supporté : ", inputType);
    }
  });
}

/**
 * recupere l'entrée utilisateur après un délai et la passe au store ensuite la recupere et la passe a arrayFilter
 *
 */
function storeQuery(query) {
  return new Promise((resolve) => {
    // Utiliser un délai de 100ms avant de mettre à jour le store
    setTimeout(() => {
      const error = Store.getState().error;
      if (!error) {
        Store.dispatch({ type: "SET_ARRAYFILTER_FS", payload: query });
      }
      resolve(query); // Résoudre la promesse une fois que le store est mis à jour
    }, 100);
  });
}

/**
 * Recherche sur les filtres de type 'select'
 *
 * @param {*} input - l'élément select
 * @param {*} dataSet - le jeu de données à filtrer
 * @param {*} filterWrapper - où afficher les résultats
 * @param {string} query - la requête de l'utilisateur
 */
export function onSearchClickSelect(input, dataSet, filterWrapper, query) {
  if (query.length >= 1) {
    const filteredData = selectFilterSearchLogic(dataSet, query);
    filterRenderDisplay(filterWrapper, filteredData);
  } else {
    filterRenderDisplay(filterWrapper, dataSet);
  }
}

/**
 * Recherche principale déclenchée par l'input principal
 *
 * @param {*} input - l'élément d'entrée principal
 * @param {string} query - la requête de l'utilisateur
 */
export async function onSearchMainResearch(input, query) {
  const {recipes} = getFormattedState();
  //reinitialisation des filtres
  if(query.length === 0){
    Store.dispatch({ type: "SET_FILTERED_RECIPES_MAIN_SEARCH", payload: recipes});
  }
  if (query.length  <=1){
    const filteredRecipes = filterGeneral("input");
    handleErrorOrDisplay(filteredRecipes);
     //ca c est pour vider arrayFilter_fs
     Store.dispatch({ type: "SET_ARRAYFILTER_FS", payload: "" });
  }

  // on verifie que la query comporte 3 caracteres ou plus avant de déclencher la recherche de comparaison
  if (query.length >= 3) {
    const filteredRecipes = filterGeneral("input", query);
    handleErrorOrDisplay(filteredRecipes, null, query, 'inputError');
    await storeQuery(query);
    Store.dispatch({ type: "SET_FILTERED_RECIPES_MAIN_SEARCH", payload: filteredRecipes });
 
  }
}


