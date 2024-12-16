/**
 *Modele creation et afficher les elements de filtres dans chaque filtre
 * @param {HTMLElement} ulElement- L'élément UL (ing, app, ust).
 * @param {Array<string} dataSet - Les données du tableau en question.
 * @memberof FilterForm
 */
export function filterRenderDisplay(ulElement, dataSet) {
  const currentDisplayedItems = [];
  ulElement.innerHTML = "";
  //index utile?
  let index = 0;
  dataSet.forEach((item) => {
    const liElt = document.createElement("li");
    liElt.textContent = item.toLowerCase();
    liElt.setAttribute("data-id", index);
    ulElement.appendChild(liElt);
    currentDisplayedItems.push(item.toLowerCase());
    index++;
  });
}
