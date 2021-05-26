const URL_KEY = '21770963-1545f2c5612889ab40ecea89f';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${URL_KEY}`,
    )
      .then(respons => respons.json())
      .then((this.pageNumber += 1))
      .then(response => response.hits);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.pageNumber = 1;
  }
}
