// import Store from "./StateManager/Store.js";
// import { filterRenderDisplay } from "./FilterRender/filterRenderDisplay.js";
// import { filterWrapperulApp, filterWrapperulUst, filterWrapperulIng, totalRecipes, inputs, searchInput } from "./utils/domElements.js";
// import { initializeData, getRecipes } from "./PrepareData/prepareData.js";
// import { displayRecipes } from "./Display/displayRecipes.js";
// import { filterRenderTotal } from "./FilterRender/filterRenderTotal.js";
// import { onClick } from "./utils/Events/onClick.js";
// import { onSearch } from "./utils/Events/onSearch.js";
// // import { onSearchAddEvent } from "./utils/Events/onSearch.js";

// export async function App() {
//   await getRecipes();

//   try {
//     //appel de getdata et stockage des recettes si valide

//     // Initialiser les tableaux de filtres à partir des recettes
//     const { ingredients, appliances, ustensils } = initializeData(Store.getState().recipes);

//     // Affichage du total des recettes
//     filterRenderTotal(Store.getState().recipes, totalRecipes);

//     // Rendre les filtres (uniquement une fois)
//     filterRenderDisplay(filterWrapperulIng, ingredients);
//     filterRenderDisplay(filterWrapperulApp, appliances);
//     filterRenderDisplay(filterWrapperulUst, ustensils);

//     // Rendre la liste des recettes
//     displayRecipes(Store.getState().recipes);

//     //ecoute des differents events au click
//     onClick();

//     //ecoute des events keyup
//     onSearch(inputs[0], Store.getState().ingredients, filterWrapperulIng);
//     onSearch(inputs[1], Store.getState().appliances, filterWrapperulApp);
//     onSearch(inputs[2], Store.getState().ustensils, filterWrapperulUst);
//     onSearch(searchInput);

//     // onSearchAddEvent();

//     // const arrayFilter_fs = Store.getState().arrayFilter_fs;
//     // const arrayFilter = Store.getState().arrayFilter;
//     // const filteredRecipes = Store.getState().filteredRecipes;
//     // const selectRecipes = Store.getState().selectRecipes;
//     // const recipes = Store.getState().recipes;

//     // console.log({
//     //   arrayFilter_fs,
//     //   arrayFilter,
//     //   filteredRecipes,
//     //   selectRecipes,
//     //   recipes,
//     // });
//   } catch (error) {
//     // Si invalide affiche le message d'erreur fourni du service d'appel
//     console.log(error);
//   }
// }
import Store from "./StateManager/Store.js";
import { filterRenderDisplay } from "./FilterRender/filterRenderDisplay.js";
import { filterWrapperulApp, filterWrapperulUst, filterWrapperulIng, totalRecipes, inputs, searchInput } from "./utils/domElements.js";
import { initializeData, getRecipes } from "./PrepareData/prepareData.js";
import { displayRecipes } from "./Display/displayRecipes.js";
import { filterRenderTotal } from "./FilterRender/filterRenderTotal.js";
import { onClick } from "./utils/Events/onClick.js";
import { onSearch } from "./utils/Events/onSearch.js";
// import { onSearchAddEvent } from "./utils/Events/onSearch.js";
import { getFormattedState } from "./utils/states.js";

export async function App() {
  await getRecipes();

  try {
    //appel de getdata et stockage des recettes si valide

    // Initialiser les tableaux de filtres à partir des recettes
    const { ingredients, appliances, ustensils } = initializeData(Store.getState().recipes);

    // Affichage du total des recettes
    filterRenderTotal(Store.getState().recipes, totalRecipes);

    // Rendre les filtres (uniquement une fois)
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

    // onSearchAddEvent();

    // const arrayFilter_fs = Store.getState().arrayFilter_fs;
    // const arrayFilter = Store.getState().arrayFilter;
    // const filteredRecipes = Store.getState().filteredRecipes;
    // const selectRecipes = Store.getState().selectRecipes;
    // const recipes = Store.getState().recipes;
    const { arrayFilter, arrayFilter_fs, recipes, selectRecipes, filteredRecipes} = getFormattedState();
    console.log({
      arrayFilter_fs,
      arrayFilter,
      filteredRecipes,
      selectRecipes,
      recipes,
    });
  } catch (error) {
    // Si invalide affiche le message d'erreur fourni du service d'appel
    console.log(error);
  }
}
