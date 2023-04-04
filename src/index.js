import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import { createCards } from './js/createCard';
import { fetchImg } from './js/fetchURL';

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '34936105-707dad1b86922b8a55c51c1b9';
const baseParam ='image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let page = 0;
let qValue = null;
let simplelightbox = null;

formEl.addEventListener('submit', handleSubmit);
galleryEl.addEventListener('click', onElementOfGalleryClick);
btnLoadMoreEl.addEventListener('click', onBtnLoadMoreClick);

btnLoadMoreEl.classList.add('visually-hidden');

function handleSubmit(event) {
  event.preventDefault();
  qValue = inputEl.value.trim();
  page = 1;
  console.log(qValue);
  if (qValue === '') {
    return Notiflix.Notify.failure(
          'Please, fill in the search field'
        );
  }
  fetchImg(`${baseUrl}?key=${apiKey}&q=${qValue}&${baseParam}&page=${page}`)
    .then(data => {
      if (data.total === 0) {
        inputEl.value = '';
        galleryEl.innerHTML = '';
        btnLoadMoreEl.classList.add('visually-hidden');
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      galleryEl.innerHTML = createCards(data.hits);
      simplelightbox = new SimpleLightbox('.gallery a');
      page += 1;

      if (data.total > 40) {
        btnLoadMoreEl.classList.remove('visually-hidden');
      }
    })
    .catch(console.warn);
}

function onBtnLoadMoreClick() {
  fetchImg(`${baseUrl}?key=${apiKey}&q=${qValue}&${baseParam}&page=${page}`)
    .then(data => {
      galleryEl.insertAdjacentHTML('beforeend', createCards(data.hits));
      simplelightbox.refresh();
      page += 1;
      if (data.hits.length < 40 || Number.parseInt(data.totalHits / 40) === page) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        btnLoadMoreEl.classList.add('visually-hidden');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function onElementOfGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}


