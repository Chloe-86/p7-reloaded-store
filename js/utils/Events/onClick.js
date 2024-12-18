import { handleFilterClick } from "./handleFilterClick.js";
import Store from "../../StateManager/Store.js";
import { selectedFilters, selectedFiltersUl, select } from "../domElements.js";
import { filterGeneral } from "../../FilterLogic/filterLogic.js";
import { handleErrorOrDisplay } from "../../FilterLogic/filterLogic.js";
import { getFormattedState } from "../states.js";

export function onClick() {
  document.addEventListener("click", (e) => {
    Store.dispatch({ type: "SET_SEARCH_INPUT_STATUS", payload: false });
    const {recipes} = getFormattedState();
    // console.log({
    //   arrayFilter_fs,
    //   arrayFilter,
    //   filteredRecipes,
    //   selectRecipes,
    //   recipes,
    //  });
    //  const {recipes} = getFormattedState();
    //gestion des ajouts du select
    if (select) {
      const target = e.target.closest("LI");
      if (!target) return;

      // Vérification du type de wrapper et appel conditionnel
      const parentWrapper = target.closest("ul");
      if (!parentWrapper) return;

      switch (parentWrapper.id) {
        case "ingredients":
          handleFilterClick(target, "SET_ARRAYFILTER");
          break;
        case "appliance":
          handleFilterClick(target, "SET_ARRAYFILTER");
          break;
        case "ustensils":
          handleFilterClick(target, "SET_ARRAYFILTER");
          break;
        default:
          break;
      }
    }

    //effacement sur les inputs dans les selects
    const deleteButton = e.target.id && e.target.id.startsWith("search-");
    if (deleteButton) {
      // Récupère le type à partir de l'ID du bouton (par exemple 'ingredients', 'appareils', 'ustensiles')
      const type = e.target.id.split("-")[1];

      switch (type) {
        case "ingredients":
          // Si le bouton "search-ingredients" est cliqué
          filterRenderDisplay(this.filterWrapperulIng, this.ingredients);
          break;
        case "appliance":
          // Si le bouton "search-appareils" est cliqué
          filterRenderDisplay(this.filterWrapperulApp, this.appliances);
          break;
        case "ustensils":
          // Si le bouton "search-ustensiles" est cliqué
          filterRenderDisplay(this.filterWrapperulUst, this.ustensils);
          break;
        default:
          break;
      }
    }

    //effacement dans selectedFilters de chaque filtre dans les 2 ul
    if (e.target.classList.contains("delete")) {
      const dataIdEvent = e.target.parentNode.parentNode.getAttribute("data-id");
      // const dataIdE = e.target.parentNode.parentNode;
      const selectEltLi = document.querySelectorAll(".li-item");

      selectEltLi.forEach((li) => {
        if (li.getAttribute("data-id") === dataIdEvent) {
          li.remove();
          const updateArrayFilter = li.textContent;
          selectedFilters.classList.remove("active");
          const filteredRecipes = filterGeneral("click");
          handleErrorOrDisplay(filteredRecipes, "SET_RECIPES_SELECT", null, "selectError");
          Store.dispatch({ type: "REMOVE_ARRAYFILTER", payload: updateArrayFilter });
          Store.dispatch({ type: "SET_RECIPES_SELECT", payload: recipes });
        }
      });

      if (selectedFiltersUl.textContent === "" && selectedFiltersUl.classList.contains("active")) {
        selectedFiltersUl.classList.remove("active");
      }
    }
  });
}
