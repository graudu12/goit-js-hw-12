import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let galleryItem;
const loadMoreBtn = document.querySelector('.load-btn');
const loaderCont = document.querySelector('.loader-container');
const loader = document.querySelector('.loader');
let searchedQuery = '';
let page = 1;
loadMoreBtn.style.display = 'none';
loaderCont.style.display = 'none';
const onScroll = () => {
  const { height } = galleryItem.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
};

const formSubbmit = async event => {
  loader.classList.remove('bottom-loader');
  loaderCont.style.display = 'block';
  loadMoreBtn.style.display = 'none';
  gallery.innerHTML = '';
  event.preventDefault();
  searchedQuery = event.currentTarget.elements.query.value.trim();
  if (searchedQuery === '') {
    loaderCont.style.display = 'none';
    iziToast.error({
      title: '',
      message: 'Please complete the form',
      messageColor: '#fafafb',
      icon: 'fas fa-keyboard',
      iconColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });

    return;
  }
  try {
    page = 1;
    const { data } = await fetchPhotos(searchedQuery, page);
    console.log(data);
    if (data.total === 0) {
      gallery.innerHTML = '';
      iziToast.error({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fafafb',
        icon: 'far fa-file-image',
        iconColor: '#fafafb',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
      loaderCont.style.display = 'none';
      event.target.reset();
      return;
    }
    const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');
    gallery.innerHTML = galleryTemplate;

    if ((data.totalHits > 0) & (page * 15 < data.totalHits)) {
      loadMoreBtn.style.display = 'block';
      loadMoreBtn.addEventListener('click', loadMore);
    }
    const modal = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captions: true,
      captionDelay: 250,
    });
    modal.refresh();
  } catch (err) {
    iziToast.error({
      message: 'Something wrong',
      messageColor: '#fafafb',
      icon: 'fas fa-exclamation-triangle',
      iconColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
  } finally {
    loaderCont.style.display = 'none';
  }
  event.target.reset();
};
const loadMore = async event => {
  loaderCont.style.display = 'flex';
  loader.classList.add('bottom-loader');
  loadMoreBtn.style.display = 'none';
  loadMoreBtn.removeEventListener('click', loadMore);
  try {
    page++;
    const { data } = await fetchPhotos(searchedQuery, page);
    const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');
    gallery.insertAdjacentHTML('beforeend', galleryTemplate);
    galleryItem = gallery.firstChild;
    onScroll();
    const modal = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captions: true,
      captionDelay: 250,
    });
    modal.refresh();
    if (page * 15 >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      loadMoreBtn.removeEventListener('click', loadMore);
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fafafb',
        icon: 'fas fa-flag-checkered',
        iconColor: '#fafafb',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
    } else loadMoreBtn.style.display = 'block';
    loadMoreBtn.addEventListener('click', loadMore);
  } catch (err) {
    iziToast.error({
      message: 'Something wrong',
      messageColor: '#fafafb',
      icon: 'fas fa-exclamation-triangle',
      iconColor: '#fafafb',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
  } finally {
    loaderCont.style.display = 'none';
  }
};
form.addEventListener('submit', formSubbmit);
