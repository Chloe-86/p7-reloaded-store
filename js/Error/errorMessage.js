export function errorMessage(error, container, query) {
      let message = ""; // Message d'erreur par défaut
      let message2 = "";
  
      if (error === "inputError") {
        // Cas où aucun résultat n'est trouvé pour la recherche utilisateur
        message = `<h2 class="m-4">Aucune recette ne contient "${query}".</h2>`;
        message2 = `Vous pouvez chercher « tarte aux pommes », « poisson »...`;
      } else if (error === "selectError") {
        // Cas où aucun résultat n'est trouvé pour les filtres sélectionnés
        message = `<h2 class="m-4">Aucune recette ne correspond aux filtres sélectionnés.</h2>`;
        message2 = `Vous pouvez sélectionner un autre filtre.`;
      }
  
      // Affichage du message d'erreur dans le conteneur approprié
      container.innerHTML = `
          <div class="container">
              <div class="row">
                  <div class="col">
                      <div class="mx-auto text-center" style="font-family: 'Roboto', sans-serif;">
                          ${message}
                          <h3 class="m-4">${message2}<br>Merci.</h3>
                      </div>
                  </div>
              </div>
          </div>`;
    }
