const Store = (() => {
  let state = {
    //les filtres selectionnes
    //recherche avancée
    arrayFilter: [],
    //recherche input
    arrayFilter_fs: [],
    //tableaux
    //tableau de recette initial
    recipes: [],
    //tableau de recette resultant du filtrage depuis le select
    selectRecipes: [],
    //tableau de recette resultant du filtrage depuis l'input
    filteredRecipes: [],
    //tableau de recette resultant du filtrage pour les differents selects
    ingredients: [],
    ustensils: [],
    appliances: [],
    error: "",
    index: 0,
  };

  // La fonction dispatch centralise toutes les mises à jour d'état
  const dispatch = (action) => {
    switch (action.type) {
   
      case "INCREMENT_INDEX":
        state = { ...state, index: state.index + 1 };
        break;
      case "SET_RECIPES":
        state = { ...state, recipes: Object.freeze([...action.payload]) };
        
        break;
      case "SET_RECIPES_SELECT":
        state = { ...state, selectRecipes: action.payload };
        break;
      case "SET_FILTERED_RECIPES_MAIN_SEARCH":
        state = { ...state, filteredRecipes: action.payload };
        break;
      case "SET_ARRAYFILTER":
        state = {
          ...state,
          arrayFilter: [...state.arrayFilter, action.payload],
        };
        break;
      case "SET_ARRAYFILTER_FS":
        state = { ...state, arrayFilter_fs: action.payload };
        break;
      case "REMOVE_ARRAYFILTER":
        state = {
          ...state,
          arrayFilter: state.arrayFilter.filter((filter) => filter !== action.payload),
        };
        break;
      case "SET_INGREDIENTS":
        state = { ...state, ingredients: action.payload };
        break;
      case "SET_USTENSILS":
        state = { ...state, ustensils: action.payload };
        break;
      case "SET_APPLIANCES":
        state = { ...state, appliances: action.payload };
        break;
      case "SET_ERROR":
        state = { ...state, error: action.payload };
        break;
      default:
        console.warn(`Action inconnue : ${action.type}`);
    }
    console.log(state)
  };

  // Permet de récupérer l'état actuel (ou un sous-ensemble spécifique si une clé est donnée)
  const getState = (key = null) => {
    if (key) {
      return state[key] !== undefined ? state[key] : null;
    }
    return { ...state };
  };

  return {
    getState,
    dispatch,
  };
})();

export default Store;
