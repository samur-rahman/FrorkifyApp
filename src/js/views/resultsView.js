import View from './view.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  // to view in the page
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  // markup loaded after search on left menu
  _generateMarkupPreview(result) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="${result.title}" crossOrigin="anonymous"/>
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                </div>
            </a>
        </li>
        `;
  }
}

export default new ResultsView();
