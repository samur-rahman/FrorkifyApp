import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { isAsyncFunction } from 'util/types';

// activating hot module from parcel
if (module.hot) {
  module.hot.accept();
}

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
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    // console.log(query);
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render results
    resultsView.render(model.getSearchResultsPage()); // 10 results per page pagination

    // render initial pagination buttons (page to move)
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

// Pagination event handler on button click
const controlPagination = function (goToPage) {
   // render NEW results (updates on clicking buttons)
   resultsView.render(model.getSearchResultsPage(goToPage)); // 10 results per page pagination

   // render NEW pagination buttons (page to move)
   paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  // handler for search button click
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
