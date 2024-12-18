import { errorApi } from '../Error/errorApi.js';

const apiUrl = "http://127.0.0.1:5501/data/recipe.json";

/**
 * Récupère des données à partir d'une API.
 * 
 * Cette fonction effectue une requête `fetch` vers l'URL de l'API (`apiUrl`), puis renvoie les données au format JSON si la requête est réussie.
 * Si la requête échoue (par exemple, si le statut HTTP est une erreur), une erreur est lancée avec un message d'erreur personnalisé.
 * En cas de problème avec la requête, une erreur est lancée.
 * 
 * @async
 * @function
 * @returns {Promise<Object>} - Une promesse qui résout les données au format JSON provenant de l'API.
 * Si une erreur se produit lors de la récupération des données, la promesse est rejetée avec l'erreur correspondante.
 * 
 * @throws {Error} - Lance une erreur si la réponse de l'API n'est pas correcte ou si une erreur se produit pendant la récupération des données.
 */
export const getData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorMessage = errorApi(response.status.toString());
      throw new Error(errorMessage); 
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
