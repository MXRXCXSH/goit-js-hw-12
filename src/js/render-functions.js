import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
gallery.classList.add('container');

const loader = document.querySelector('.loader');

export const loadMoreBtn = document.querySelector('.load-more-btn');

const loaderForMoreImages = document.querySelector('.loader-for-more-images');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}"/>
        <div class='descriptions'>
        <p>Likes <span>${likes}</span></p>
        <p>Vievs <span>${views}</span></p>
        <p>Comments <span>${comments}</span></p>
        <p>Downloads <span>${downloads}</span></p>
        </div>
        </a>
        </li>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const showLoader = () => {
  loader.classList.remove('hidden');
};

export const hideLoader = () => {
  loader.classList.add('hidden');
};

export const showLoadMoreBtn = () => {
  loadMoreBtn.classList.remove('hidden');
};
export const hideLoadMoreBtn = () => {
  loadMoreBtn.classList.add('hidden');
};

export const showLoaderForMoreImages = () => {
  loaderForMoreImages.classList.remove('hidden');
};

export const hideLoaderForMoreImages = () => {
  loaderForMoreImages.classList.add('hidden');
};
