import {displayRecipes} from './displayRecipes.js';
import { filterRenderTotal } from '../FilterRender/filterRenderTotal.js';

export function reinitializeFilter(data, container) {
    displayRecipes(data);
    filterRenderTotal(data, container);
  }

