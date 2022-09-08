import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29689577-6dc67b4d31de18bcd5a01035c';


export default class ApiService {
    constructor() {
        this.valueForm = '';
        this.page = 1;
        this.totalPictures = '';
        this.pageTotal = '';
    }
    
    async fetchArticles() {
        try {
            const options = {
                params: {
                key: KEY,
                q: this.valueForm,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: this.page,
                per_page: 40,
                }
            }

          this.totalPictures += options.params.per_page;
          const response = await axios.get(BASE_URL, options); 
          this.pageTotal = response.data.pageTotal
          this.incrementPage();
      return await response.data;
    } catch (error) {
      console.log(error)
    }
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
  get value() {
    return this.valueForm;
  }
  set value(newValue) {
    this.valueForm = newValue;
  }
  get pictures() {
    return this.totalPictures;
  }

}

