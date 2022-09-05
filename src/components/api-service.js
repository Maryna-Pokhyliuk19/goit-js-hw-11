export default class ApiService {
    constructor() {
        this.valueForm = '';
        this.page = 1;
     }
    
    fetchArticles() {
        console.log(this)
        const options = {
        headers: {
            Authorization: '29689577-6dc67b4d31de18bcd5a01035c'
        },
        };
        const url = `https://pixabay.com/api/?q=${this.valueForm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

fetch(url, options)
    .then(r => r.json())
    .then(data => {
        this.page += 1;
    });
    }
    
    get value() {
        return this.valueForm;
    }

    set value(newValue) {
        this.valueForm = newValue;
    }
}