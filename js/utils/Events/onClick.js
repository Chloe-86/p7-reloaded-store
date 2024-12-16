import { handleFilterClick } from "./handleFilterClick.js";
import Store from "../../StateManager/Store.js";
import { displayRecipes } from "../../Display/displayRecipes.js";
import { filterRenderTotal } from "../../FilterRender/filterRenderTotal.js";
import {
  filterWrapperulApp,
  filterWrapperulUst,
  filterWrapperulIng,
  totalRecipes,
  selectedFilters,
  selectedFiltersUl,
  recipeContainer,
  select,
  searchInput,
  searchBtn,
} from "../domElements.js";
import { filterGeneral, filterSelected } from "../../FilterLogic/filterLogic.js";
import { errorMessage } from "../../Error/errorMessage.js";
import { addActiveFilterModel } from "../Filter/utils.js";
import { createListItem } from "../../templates/FactoryBtn.js";
import { filterConditions } from "../../FilterLogic/filterConditions.js";
import { handleErrorOrDisplay } from "../../FilterLogic/filterLogic.js";
import { getFormattedState } from "../states.js";


export function onClick() {
  document.addEventListener("click", (e) => {
    const {recipes} = getFormattedState();
    //gestion des ajouts du select
    if (select) {
      const target = e.target.closest("LI");
      if (!target) return;

      // Vérification du type de wrapper et appel conditionnel
      const parentWrapper = target.closest("ul");
      if (!parentWrapper) return;

      switch (parentWrapper.id) {
        case "ingredients":
          handleFilterClick(target, filterWrapperulIng, "SET_ARRAYFILTER");
          break;
        case "appliance":
          handleFilterClick(target, filterWrapperulApp, "SET_ARRAYFILTER");
          break;
        case "ustensils":
          handleFilterClick(target, filterWrapperulUst, "SET_ARRAYFILTER");
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
      const dataIdE = e.target.parentNode.parentNode;
      const selectEltLi = document.querySelectorAll(".li-item");

      selectEltLi.forEach((li) => {
        if (li.getAttribute("data-id") === dataIdEvent) {
          li.remove();
          const updateArrayFilter = li.textContent;
          Store.dispatch({ type: "REMOVE_ARRAYFILTER", payload: updateArrayFilter });
          Store.dispatch({type: 'SET_RECIPES_SELECT', payload: recipes})
          selectedFilters.classList.remove("active");
        }
      });

      if (selectedFiltersUl.textContent === "" && selectedFiltersUl.classList.contains("active")) {
        selectedFiltersUl.classList.remove("active");
      }
    }
   //cliques sur l ul des filtres selctionnés
    if (selectedFilters) {
      const filteredRecipes = filterGeneral("click");
      handleErrorOrDisplay(filteredRecipes, "SET_RECIPES_SELECT", null, "selectError");
      Store.dispatch({type: 'SET_RECIPES_SELECT', payload: filteredRecipes})
    }
  });
}
