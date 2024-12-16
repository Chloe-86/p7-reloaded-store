
  /**
   * Cette méthode met à jour l'affichage du nombre total de recettes dans l'interface utilisateur.
   *
   * @param {array} --le tableau de recette filtré ou pas
   * @memberof FilterForm
   */
  export function filterRenderTotal(array, container) {
    let total = array.length;

    if (total === 1) {
      container.innerHTML = `<span>${total}</span> recette`;
    } else if (total > 1) {
      container.innerHTML = `<span>${total}</span> recettes`;
    } else {
      container.innerHTML = `<span>${total}</span> recette`;
    }

    return total; // Renvoyer le total mis à jour si nécessaire
  }