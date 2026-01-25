import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import rejectIcon from './img/reject.svg';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const errorTxt =
  'Sorry, there are no images matching your search query. Please, try again!';
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
  emptyQuery: 'Sorry, no results for empty search',
  requestError: 'Something went wrong. Please try again later.',
};

const form = document.querySelector('.form');
form.classList.add('container');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) {
    showError(MESSAGES.emptyQuery);
    return;
  }

  clearGallery();
  showLoader();
  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      showError(MESSAGES.noResults);
      return;
    }
    console.log(data.hits);
    createGallery(data.hits);
  } catch (error) {
    showError(MESSAGES.requestError);
    console.log(error);
  } finally {
    hideLoader();
    form.reset();
  }
});
