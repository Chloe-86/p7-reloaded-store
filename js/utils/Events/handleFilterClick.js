
import { addActiveFilterModel, removeActiveFilterModel, findArPa, findGrandPa } from "../Filter/utils.js";

import Store from "../../StateManager/Store.js";
import { filterSelected } from "../../FilterLogic/filterLogic.js";
import { createListItem } from "../../templates/FactoryBtn.js";

const selectedFilters = document.querySelector(".selectedFilters ul");

export function handleFilterClick(target, ulElementWrapper, type) {
  if (target.tagName !== "LI") {
    return;
  }

  const selectedItem = target.textContent;

  // Récupérer le grand-parent de l'élément
  const grandPaElt = findGrandPa(target);

  const paEltSelectItembro = grandPaElt.previousElementSibling.classList[grandPaElt.previousElementSibling.classList.length - 2];
  const parentSelected = target.parentNode;
  const parentSelectedbro = parentSelected.previousElementSibling;

  const dataId = target.getAttribute("data-id");
  addActiveFilterModel(parentSelectedbro, createListItem(parentSelected, selectedItem, dataId, ["li-item"]));
  addActiveFilterModel(selectedFilters, createListItem(parentSelected, selectedItem, dataId, ["btn-filter"]));
  selectedFilters.classList.add("active");
  removeActiveFilterModel(target, paEltSelectItembro);

  // // Mettre à jour les filtres via dispatch
  Store.dispatch({ type: type, payload: selectedItem });
  
  // const filteredRecipes= filterGeneral('click');
  // handleErrorOrDisplay(filteredRecipes, 'SET_RECIPES_SELECT', null, 'selectError');
}
