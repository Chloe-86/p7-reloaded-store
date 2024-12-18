import { errorApi } from '../Error/errorApi.js';

const apiUrl = "http://127.0.0.1:5501/data/recipe.json";

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
