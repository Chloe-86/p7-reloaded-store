
import Store from '../StateManager/Store.js'

function createElement(type, options = {}) {
    // Crée un élément HTML de type `type` (par exemple, 'li', 'div', etc.)
    const elt = document.createElement(type);
  
    // Si des classes sont fournies, on les ajoute à l'élément
    if (options.classes) {
      options.classes.forEach(className => {
        elt.classList.add(className);
      });
    }
  
    // Si un attribut `data-id` est fourni, on l'ajoute à l'élément
    if (options.dataId) {
      elt.setAttribute("data-id", options.dataId);
    }
  
    // Si un contenu textuel est fourni, on l'ajoute à l'élément
    if (options.textContent) {
      elt.textContent = options.textContent;
    }
  
    // Si un enfant ou des enfants sont fournis, on les ajoute à l'élément
    if (options.children) {
      options.children.forEach(child => {
        elt.appendChild(child);
      });
    }
  
    // Retourne l'élément créé
    return elt;
  }


/**
 * Crée un élément `<li>` avec des classes, un identifiant de données, un texte et une icône de suppression.
 * 
 * @param {Object|null} parentSelected - L'élément parent sélectionné, utilisé pour générer des classes ou un identifiant unique. Peut être `null`.
 * @param {string} selectedItem - Le texte à afficher dans l'élément `<li>`.
 * @param {string|null} [dataId=null] - Identifiant de données personnalisé à ajouter à l'attribut `dataId`. Par défaut, `null`.
 * @param {string[]} [classes=[]] - Liste supplémentaire de classes CSS à ajouter à l'élément `<li>`. Par défaut, tableau vide.
 * 
 * @returns {HTMLElement} - L'élément `<li>` configuré avec les classes, attributs et enfants (icône de suppression).
 */
export function createListItem(parentSelected = null, selectedItem, dataId = null, classes = []) {

  Store.dispatch({ type: "INCREMENT_INDEX" });
  const currentIndex = Store.getState().index;
    // Si parentSelected est null, on ne tente pas d'utiliser parentSelected.id
  const liClasses = parentSelected ? ["li-item", parentSelected.id, ...classes] : ["li-item", "arrayFilter-fs",...classes]; 

   const dataid = parentSelected ? [`${parentSelected.id}-${dataId}`] : [`${currentIndex}`]; 
    // Créer un <li> avec des options spécifiques
    const li = createElement("li", {
      classes: liClasses, // Ajouter les classes spécifiques
      dataId: dataid, // Attribut data-id
      textContent: selectedItem
    });
  
    // Créer un <span> pour l'icône de suppression
    const span = createElement("span");
  
    // Créer l'image pour la croix de suppression
    const deleteImg = createElement("img", {
      classes: ["delete"], // Classe pour l'icône de suppression
    });
    deleteImg.setAttribute("src", "./assets/svg/mini-croix.svg");
    deleteImg.setAttribute("alt", "croix");
  
    // Ajouter l'image de suppression au span
    span.appendChild(deleteImg);
  
    // Ajouter les éléments au <li>
    li.appendChild(span);

    // Retourner le <li> créé
    return li;
  }
  