import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _nextPage(pageNo) {
    return `
    <button data-goto="${pageNo + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${pageNo + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
  `;
  }

  _prevPage(pageNo) {
    return `
    <button data-goto="${pageNo - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${pageNo - 1}</span>
    </button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
        // which button clicked
        const btn = e.target.closest('.btn--inline');
       
        if (!btn) return;

        const goToPage = +btn.dataset.goto;
        handler(goToPage);
    })

  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    
    // page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      // next
      return this._nextPage(curPage);
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      // previous
      return this._prevPage(curPage);
    }
    // other pages
    if (this._data.page < numPages ) {
      return `${this._prevPage(curPage)} ${this._nextPage(curPage)}`;
    }
    // page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
