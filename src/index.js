import ApiService from './components/api-service'

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more')

    
}
console.log(refs.searchForm)
console.log(refs.loadMoreBtn)
const apiService = new ApiService();
console.log(apiService)

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

apiService.valueForm = e.currentTarget.elements.searchQuery.value;
apiService.fetchArticles()
}

function onLoadMore() {
    apiService.fetchArticles()
    
}

    