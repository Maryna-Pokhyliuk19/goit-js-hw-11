import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiService from './components/api-service'
import { renderImages } from './components/renderImages';
import LoadMoreBtn from './components/load-more-btn';
import { renderTotalImages } from './components/renderTotalImages';
import './css/styles.css';

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
    container: document.querySelector('.container')
}

const apiService = new ApiService();
console.log(apiService)
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    
    apiService.valueForm = e.currentTarget.elements.searchQuery.value;
    
    if (apiService.valueForm === '') {
        Notiflix.Notify.failure('Search query is empty!');
        return;
    }

    loadMoreBtn.show()
    loadMoreBtn.disable()
    apiService.resetPage()
    const images = await apiService.fetchArticles()
    
    if (images.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    clearGallery()
    uploadImages(images)
    loadMoreBtn.enable()

    totalImages(images.totalHits)
}

function onLoadMore() {
    loadMoreBtn.disable()
    apiService.fetchArticles().then(images => {
        uploadImages(images)
        loadMoreBtn.enable()
        smoothyScroll()
    })
    
}

function uploadImages(images) {
refs.gallery.insertAdjacentHTML('beforeend', renderImages(images.hits))
}

function clearGallery() {
    refs.gallery.innerHTML = ''
}

function totalImages(totalImages) {
    refs.container.insertAdjacentHTML('afterbegin', renderTotalImages(totalImages))
    Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
}

function smoothyScroll() {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}


//     Если пользователь дошел до конца коллекции, пряч кнопку и выводи уведомление с текстом
// "We're sorry, but you've reached the end of search results.".