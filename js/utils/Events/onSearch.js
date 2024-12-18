
import { filterRenderDisplay } from "../../FilterRender/filterRenderDisplay.js";
import { inputSanitize } from "../Filter/utils.js";
import { selectFilterSearchLogic, handleErrorOrDisplay } from "../../FilterLogic/filterLogic.js";
import Store from "../../StateManager/Store.js";
import { getFormattedState } from "../states.js";
import { filterGeneral } from "../../FilterLogic/filterLogic.js";



/**
 * Vérifie l'entrée utilisateur des filtres et déclenche la fonction appropriée
 *
 * @param {*} input - l'élément input sur lequel l'utilisateur interagit
 * @param {} dataSet - les données sur lesquelles effectuer la recherche
 * @param {*} filterWrapper - l'élément wrapper où afficher les résultats filtrés
 */
export function onSearch(input, dataSet = null, filterWrapper = null) {
  input.addEventListener("input", (e) => {
    Store.dispatch({ type: "SET_SEARCH_INPUT_STATUS", payload: true});
    // const { arrayFilter, arrayFilter_fs, recipes, selectRecipes, filteredRecipes} = getFormattedState();
    // console.log({
    //   arrayFilter_fs,
    //   arrayFilter,
    //   filteredRecipes,
    //   selectRecipes,
    //   recipes,
    // });
    
    const inputValue = e.target.value;
    const query = inputSanitize(inputValue);
    const inputType = input.getAttribute("data-type");

    switch (inputType) {
      case "search-select":
        onSearchClickSelect(dataSet, filterWrapper, query);
        break;
      case "main-research":
        onSearchMainResearch(query);
        break;
      default:
        console.warn("Type d'entrée non supporté : ", inputType);
    }
  });
}

/**
 * Recherche sur les filtres de type 'select'
 *
 * @param {*} dataSet - le jeu de données à filtrer
 * @param {*} filterWrapper - où afficher les résultats
 * @param {string} query - la requête de l'utilisateur
 */
export function onSearchClickSelect(dataSet, filterWrapper, query) {
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
 * @param {string} query - la requête de l'utilisateur
 */
export async function onSearchMainResearch(query) {
  const {recipes} = getFormattedState();
  //reinitialisation des filtres
  if(query.length === 0){
    Store.dispatch({ type: "SET_FILTERED_RECIPES_MAIN_SEARCH", payload: recipes});
  }
  if (query.length  < 1){
    const filteredRecipes = filterGeneral("input");
    handleErrorOrDisplay(filteredRecipes);
     //ca c est pour vider arrayFilter_fs
     Store.dispatch({ type: "SET_ARRAYFILTER_FS", payload: "" });
  }
  
  // on verifie que la query comporte 3 caracteres ou plus avant de déclencher la recherche de comparaison
  if (query.length >= 3) {
    
    const filteredRecipes = filterGeneral("input", query);
    handleErrorOrDisplay(filteredRecipes, null, query, 'inputError');
    Store.dispatch({ type: "SET_ARRAYFILTER_FS", payload: query });
    Store.dispatch({ type: "SET_FILTERED_RECIPES_MAIN_SEARCH", payload: filteredRecipes });
  }
 
}


