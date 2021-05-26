import './css/styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import debounce from 'lodash.debounce';

import PixabayService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';
import initBigImg from './js/initBigImg';
import { showAlertNotFound } from './js/alert';

import imgCardsTpl from './templates/imgCard.hbs';

const refs = {
  searchInput: document.querySelector('.search-form'),
  galleryList: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pixabayService = new PixabayService();

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

loadMoreBtn.refs.button.addEventListener('click', onBtnLoadMore);

function executeSearch() {
  if (pixabayService.searchQuery !== '') {
    loadMoreBtn.show();
    loadMoreBtn.disable();

    pixabayService
      .fetchImages()
      .then(res => {
        if (res.length === 0) {
          throw res;
        }

        galleryMakup(res);

        loadMoreBtn.enable();

        loadMoreBtn.refs.button.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      })
      .catch(error => {
        showAlertNotFound();
        loadMoreBtn.hide();
      });
  }
  // .then(() => {
  //   loadMoreBtn.enable();

  //   loadMoreBtn.refs.button.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //   });
  // })
}

function onSearch(e) {
  if (e.target.value === '') {
    loadMoreBtn.hide();
  }

  refs.galleryList.innerHTML = '';
  pixabayService.resetPage();

  pixabayService.query = e.target.value;

  executeSearch();
}

function onBtnLoadMore(e) {
  executeSearch();
}

function galleryMakup(arrayOfImages) {
  refs.galleryList.insertAdjacentHTML('beforeend', imgCardsTpl(arrayOfImages));
}
