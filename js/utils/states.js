
import Store from "../StateManager/Store.js";

// Utilitaire pour récupérer l'état formaté
export function getFormattedState() {
    const state = Store.getState();
    return {
        arrayFilter_fs: state.arrayFilter_fs,
        arrayFilter: state.arrayFilter,
        filteredRecipes: state.filteredRecipes,
        selectRecipes: state.selectRecipes,
        recipes: state.recipes,
        arrayFilter_fs_temp: state.arrayFilter_fs_temp
    };
}
