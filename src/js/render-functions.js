import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
gallery.classList.add('container');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
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
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}
