class SearchView {
  #parentEl = document.querySelector('.search');

  // to get the search in the input form
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  // clears the form after hitting search
  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  // listening for search button click
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
