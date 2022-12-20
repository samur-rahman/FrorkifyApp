import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { isAsyncFunction } from 'util/types';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // displaying error on the page instead of console
    recipeView.renderError();
  }
};

// search functionality
const controlSearchResults = async function () {
  try {
    // get search query
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render results
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  // handler for search button click
  searchView.addHandlerSearch(controlSearchResults);
};
init();
