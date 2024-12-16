/**
 * Crée un élément div pour envelopper la carte de recette.
 * @returns {HTMLDivElement} - Élément div pour envelopper la carte de recette.
 */
function createWrapper() {
  const div = document.createElement("div");
  div.classList.add("card-wrapper");
  return div;
}

/**
 * Crée un élément div pour la colonne de la carte de recette.
 * @returns {HTMLDivElement} - Élément div pour la colonne de la carte de recette.
 */
function createDivCol() {
  const div = document.createElement("div");
  div.classList.add("col-lg-4", "mb-5");
  return div;
}

/**
 * Crée un élément article pour la carte de recette.
 * @returns {HTMLDivElement} - Élément article pour la carte de recette.
 */
function createArticle() {
  const article = document.createElement("article");
  article.classList.add("card");
  return article;
}

/**
 * Crée une balise img pour afficher l'image de la recette.
 * @param {string} imagePath - Chemin de l'image de la recette.
 * @returns {HTMLImageElement} - Balise img pour afficher l'image de la recette.
 */
function createImage(imagePath) {
  const img = document.createElement("img");
  img.src = imagePath;
  img.classList.add("card-img-top");
  img.alt = "Recipe Image";
  return img;
}

/**
 * Crée l'en-tête de la carte avec le nom de la recette.
 * @param {string} name - Nom de la recette.
 * @returns {HTMLDivElement} - Élément div contenant le titre de la recette.
 */
function createHeader(name) {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("card-header", "bg-white", "border-0");
  const headerTitle = document.createElement("h2");
  headerTitle.classList.add("card-header-title");
  headerTitle.textContent = name;
  headerDiv.appendChild(headerTitle);
  return headerDiv;
}

/**
 * Crée le corps de la carte avec la description de la recette.
 * @param {string} description - Description de la recette.
 * @returns {HTMLDivElement} - Élément div contenant la description.
 */
function createBody(description) {
  const bodyDiv = document.createElement("div");
  bodyDiv.classList.add("card-body");
  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = "Recette";
  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = description;
  bodyDiv.appendChild(cardTitle);
  bodyDiv.appendChild(cardText);
  return bodyDiv;
}

/**
 * Crée le pied de la carte avec la liste des ingrédients.
 * @param {Array<Object>} ingredients - Liste des ingrédients de la recette.
 * @returns {HTMLDivElement} - Élément div contenant les ingrédients.
 */
function createFooter(ingredients) {
  const footerDiv = document.createElement("div");
  footerDiv.classList.add("card-footer", "bg-white", "border-0");
  footerDiv.style.borderRadius = "21px";
  const footerTitle = document.createElement("h3");
  footerTitle.classList.add("card-title");
  footerTitle.textContent = "Ingrédients";
  footerDiv.appendChild(footerTitle);
  const cardIngredients = createCardIngredients(ingredients);
  footerDiv.appendChild(cardIngredients);
  return footerDiv;
}

/**
 * Crée la liste des ingrédients dans le pied de la carte.
 * @param {Array<Object>} ingredients - Liste des ingrédients.
 * @returns {HTMLDivElement} - Élément div contenant les ingrédients sous forme de lignes.
 */
function createCardIngredients(ingredients) {
  const cardIngredients = document.createElement("div");
  cardIngredients.classList.add("ingredients", "d-flex", "flex-wrap");
  ingredients.forEach((ingredient) => {
    const row = document.createElement("div");
    row.classList.add("row");
    const h4 = document.createElement("h4");
    h4.textContent = ingredient.ingredient;
    const p = document.createElement("p");
    p.textContent = `${ingredient.quantity || ""} ${ingredient.unit || ""}`;
    row.appendChild(h4);
    row.appendChild(p);
    cardIngredients.appendChild(row);
  });
  return cardIngredients;
}

/**
 * Crée une carte de recette complète en utilisant un objet contenant toutes les données.
 * @param {Object} recipeData - Données de la recette comprenant name, description, ingredients, imagePath, time.
 * @param {HTMLElement} recipeContainer - Conteneur où la carte sera ajoutée.
 */
export function FactoryCard(recipeData, recipeContainer) {
  const { name, description, ingredients, imagePath, time } = recipeData;
  
  const div = createDivCol();
  const wrapper = createWrapper();
  const article = createArticle();
  const p = document.createElement("p");
  const img = createImage(imagePath);
  p.textContent = `${time} mins`;
  p.classList.add("time");
  article.appendChild(img);
  article.appendChild(p);
  
  const headerDiv = createHeader(name);
  wrapper.appendChild(headerDiv);

  const bodyDiv = createBody(description);
  wrapper.appendChild(bodyDiv);

  const footerDiv = createFooter(ingredients);
  wrapper.appendChild(footerDiv);

  article.appendChild(wrapper);
  div.appendChild(article);
  
  recipeContainer.appendChild(div);
}
