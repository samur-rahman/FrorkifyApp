import View from './view.js';

class SearchView extends View {
  _parentEl = document.querySelector('.search');

  // to get the search in the input form
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  // clears the form after hitting search
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // listening for search button click
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
