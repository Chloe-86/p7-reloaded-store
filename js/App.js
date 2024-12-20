import Store from "./StateManager/Store.js";
import { filterRenderDisplay } from "./FilterRender/filterRenderDisplay.js";
import { filterWrapperulApp, filterWrapperulUst, filterWrapperulIng, totalRecipes, inputs, searchInput } from "./utils/domElements.js";
import { initializeData, getRecipes } from "./PrepareData/prepareData.js";
import { displayRecipes } from "./Display/displayRecipes.js";
import { filterRenderTotal } from "./FilterRender/filterRenderTotal.js";
import { onClick } from "./utils/Events/onClick.js";
import { onSearch } from "./utils/Events/onSearch.js";

export async function App() {
   //appel de getRecipes ou affichage d un message d'erreur
  await getRecipes();

  // Initialiser les tableaux de filtres à partir des recettes
  const { ingredients, appliances, ustensils } = initializeData(Store.getState().recipes);

  // Affichage du total des recettes 
  filterRenderTotal(Store.getState().recipes, totalRecipes);

  // Rendre les filtres au démarrage
  filterRenderDisplay(filterWrapperulIng, ingredients);
  filterRenderDisplay(filterWrapperulApp, appliances);
  filterRenderDisplay(filterWrapperulUst, ustensils);

  // Rendre la liste des recettes 
  displayRecipes(Store.getState().recipes);

  //ecoute des differents events au click
  onClick();

  //ecoute des events keyup
  onSearch(inputs[0], Store.getState().ingredients, filterWrapperulIng);
  onSearch(inputs[1], Store.getState().appliances, filterWrapperulApp);
  onSearch(inputs[2], Store.getState().ustensils, filterWrapperulUst);
  onSearch(searchInput);
}
