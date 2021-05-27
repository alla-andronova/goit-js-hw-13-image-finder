import './css/styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

// import debounce from 'lodash.debounce';

import PixabayService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';
import initBigImg from './js/initBigImg';
import { showAlertNotFound } from './js/alert';

import imgCardsTpl from './templates/imgCard.hbs';

const refs = {
  searchInput: document.querySelector('.search-form'),
  galleryList: document.querySelector('.gallery'),
  btnSearch: document.querySelector('.btn'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pixabayService = new PixabayService();

// refs.searchInput.addEventListener('input', debounce(onSearch, 1000));
refs.searchInput.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', onBtnLoadMore);

async function executeSearch() {
  if (pixabayService.searchQuery !== '') {
    loadMoreBtn.show();
    loadMoreBtn.disable();

    try {
      const arrayOfImages = await pixabayService.fetchImages();

      if (arrayOfImages.length === 0) {
        throw arrayOfImages;
      }

      loadMoreBtn.enable();

      galleryMakup(arrayOfImages);

      loadMoreBtn.refs.button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    } catch {
      showAlertNotFound();
      loadMoreBtn.hide();
    }
  }
}

function onSearch(e) {
  e.preventDefault();
  if (e.currentTarget.elements.query.value === '') {
    loadMoreBtn.hide();
  }

  refs.galleryList.innerHTML = '';
  pixabayService.resetPage();

  pixabayService.query = e.currentTarget.elements.query.value;

  executeSearch();
}

function onBtnLoadMore(e) {
  executeSearch();
}

function galleryMakup(arrayOfImages) {
  refs.galleryList.insertAdjacentHTML('beforeend', imgCardsTpl(arrayOfImages));
}
