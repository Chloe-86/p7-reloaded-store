export function displayError (error, container) {
    if (!container) {
        console.error("Conteneur introuvable !");
        return;
      }
     
      container.innerHTML = `<div class="container">
              <div class="row">
                  <div class="col">
                      <div class="mx-auto text-center" style="font-family: 'Roboto', sans-serif;">
                          <h2 class="mb-4" style="text-transform: uppercase">Une erreur est survenue : <br><br> ${error}</h2>
                      </div>
                  </div>
              </div>
          </div>`;
}

