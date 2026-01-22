import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
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

const form = document.querySelector('.form');
form.classList.add('container');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.error({
      message: `${errorTxt}`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      iconUrl: rejectIcon,
      maxWidth: 432,
      messageColor: '#fafafb',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      hideLoader();
      if (data.hits.length === 0) {
        iziToast.error({
          message: `${errorTxt}`,
          position: 'topRight',
          backgroundColor: '#ef4040',
          iconUrl: rejectIcon,
          maxWidth: 432,
          messageColor: '#fafafb',
        });
        return;
      }
      console.log(data.hits);
      createGallery(data.hits);
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        message: `${errorTxt}`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        iconUrl: rejectIcon,
        maxWidth: 432,
        messageColor: '#fafafb',
      });
      console.log(error);
    });
  form.reset();
});
