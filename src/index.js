import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiService from './components/api-service'
import { renderImages } from './components/renderImages';
// import LoadMoreBtn from './components/load-more-btn';
import './css/styles.css';

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
    container: document.querySelector('.container'),
    sentinel: document.querySelector('#sentinel')
}

let lightbox = new SimpleLightbox(".gallery a", {
 captionsData: "alt",
 captionDelay: 250,
});;


const apiService = new ApiService();

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   hidden: true,
// });

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    
    apiService.valueForm = e.currentTarget.elements.searchQuery.value;
    
    if (apiService.valueForm === '') {
        Notiflix.Notify.failure('Search query is empty!');
        return;
    }

    
    loadMoreBtn.disable()
    apiService.resetPage()

    const images = await apiService.fetchArticles()
    
    if (images.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        // loadMoreBtn.hide();
        return;
        }
    
    clearGallery()
    totalImages(images.totalHits)
    uploadImages(images)
    // loadMoreBtn.enable()
    // onLoadMoreEnd()
}

// function onLoadMore() {
//     loadMoreBtn.disable()
//     apiService.fetchArticles().then(images => {
//         uploadImages(images)
//         loadMoreBtn.enable()
//         smoothyScroll()
//         onLoadMoreEnd() 
//         })
// }

// function onLoadMoreEnd() {
//     if (apiService.totalPictures >= apiService.pageTotal) {
//         Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
//         loadMoreBtn.hide();
//         return;
//     }
//     loadMoreBtn.show()
//     }
    
function uploadImages(images) {
    refs.gallery.insertAdjacentHTML('beforeend', renderImages(images.hits))
    console.log(images)
    lightbox.refresh()
}

function clearGallery() {
    refs.gallery.innerHTML = ''
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

function totalImages(totalImages) {
    Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && apiService.valueForm !== '') {
            apiService.fetchArticles().then(images => {
                uploadImages(images)
            });
        }
    });
};

const options = {
    rootMargin: '150px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel)


