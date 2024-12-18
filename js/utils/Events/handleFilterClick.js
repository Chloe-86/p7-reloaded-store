
import { addActiveFilterModel, removeActiveFilterModel, findGrandPa } from "../Filter/utils.js";
import { selectedFiltersUl } from "../domElements.js";
import Store from "../../StateManager/Store.js";
import { createListItem } from "../../templates/FactoryBtn.js";
import { filterGeneral } from "../../FilterLogic/filterLogic.js";
import { handleErrorOrDisplay } from "../../FilterLogic/filterLogic.js";


export function handleFilterClick(target, type) {
  if (target.tagName !== "LI") {
    return;
  }
  //récupere les differents éléments du dom
  const selectedItem = target.textContent;
  const grandPaElt = findGrandPa(target);
  const paEltSelectItembro = grandPaElt.previousElementSibling.classList[grandPaElt.previousElementSibling.classList.length - 2];
  const parentSelected = target.parentNode;
  const parentSelectedbro = parentSelected.previousElementSibling;
  const dataId = target.getAttribute("data-id");

  addActiveFilterModel(parentSelectedbro, createListItem(parentSelected, selectedItem, dataId, ["li-item"]));
  addActiveFilterModel(selectedFiltersUl, createListItem(parentSelected, selectedItem, dataId, ["btn-filter"]));
  selectedFiltersUl.classList.add("active");
  removeActiveFilterModel(target, paEltSelectItembro);

  // // Mettre à jour les filtres via dispatch
  Store.dispatch({ type: type, payload: selectedItem });
  
  //declenche la recherche au clic et charge le tableau de recettes 
  const filteredRecipes = filterGeneral("click");
  handleErrorOrDisplay(filteredRecipes, "SET_RECIPES_SELECT", null, "selectError");
  Store.dispatch({type: 'SET_RECIPES_SELECT', payload: filteredRecipes})

}
