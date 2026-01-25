import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import rejectIcon from './img/reject.svg';

import { getImagesByQuery } from './js/pixabay-api';
import {
  loadMoreBtn,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showLoaderForMoreImages,
  hideLoaderForMoreImages,
} from './js/render-functions';

const showError = message => {
  iziToast.error({
    message,
    position: 'topRight',
    backgroundColor: '#ef4040',
    iconUrl: rejectIcon,
    maxWidth: 432,
    messageColor: '#fafafb',
  });
};
const MESSAGES = {
  noResults:
    'Sorry, there are no images matching your search query. Please, try again!',
  emptyQuery: 'Sorry, no results for empty query. Please, try again!',
  requestError: 'Something went wrong. Please try again later.',
};

const form = document.querySelector('.form');
form.classList.add('container');

let currentQuery = '';
let page = 1;

const handleSearch = async event => {
  event.preventDefault();
  const input = event.target.elements['search-text'];
  const query = input.value.trim();
  input.value = query;
  if (query === '') {
    showError(MESSAGES.emptyQuery);
    return;
  }

  currentQuery = query;
  page = 1;

  clearGallery();
  showLoader();
  hideLoadMoreBtn();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const totalPages = Math.ceil(data.totalHits / 15);
    console.log(data.hits);
    console.log(data.totalHits);

    if (data.hits.length === 0) {
      showError(MESSAGES.noResults);
      return;
    }

    createGallery(data.hits);

    if (page < totalPages) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
    page += 1;
  } catch (error) {
    showError(MESSAGES.requestError);
    console.log(error);
  } finally {
    hideLoader();
    form.reset();
  }
};

const handleLoadMore = async () => {
  showLoaderForMoreImages();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const totalPages = Math.ceil(data.totalHits / 15);

    createGallery(data.hits);
    page += 1;

    if (page < totalPages) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    showError(MESSAGES.requestError);
  } finally {
    hideLoaderForMoreImages();
  }
};

loadMoreBtn.addEventListener('click', handleLoadMore);
form.addEventListener('submit', handleSearch);
