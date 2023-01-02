import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


const refs = {
     moviesGalleryRef: document.querySelector('.box-movies'),
    // paginationRef: document.querySelector('.pagination'),
     BASE_URL : ' https://api.themoviedb.org/3/movie/popular',

}

const options = {
  totalItems: 500,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination('pagination', options);

const page = pagination.getCurrentPage();

function morePopularPhotos(event) {
   
    const currentPage = event.page;
           resetCurrentPage();
   return fetchedMovies(currentPage);
}
fetchedMovies(page);
pagination.on('afterMove', morePopularPhotos);
//////////////////////////////////////////////приклад
// function onHandleSubmit(evt) {
//   evt.preventDefault();
//   const {
//     elements: { query },
//   } = evt.target;
//   const searchValue = query.value.trim().toLowerCase();
//   if (!searchValue) {
//     Notify.failure('Заповніть рядок для пошуку');
//     return;
//   }
//   unsplashApi.query = searchValue;
//   pagination.off('afterMove', morePopularPhotos);
//   pagination.off('afterMove', moreFotosByQuery);
//   pagination.on('afterMove', moreFotosByQuery);
//   unsplashApi.getFotosByQuery(page).then(data => {
//     pagination.reset(data.total);
//     const markup = createGalleryCards(data.results);
//     refs.galleryListEl.innerHTML = markup;
//   });
// }

// function moreFotosByQuery(event) {
//   const currentPage = event.page;
//   unsplashApi.getFotosByQuery(currentPage).then(data => {
//     const markup = createGalleryCards(data.results);
//     refs.galleryListEl.innerHTML = markup;
//   });
// }

// refs.formEl.addEventListener('submit', onHandleSubmit);
//////////////////////////////////////////////приклад
/////////////////////////////////////////////////////
// const refs = {
//     moviesGalleryRef: document.querySelector('.box-movies'),
//     // paginationRef: document.querySelector('.pagination'),
//      BASE_URL : ' https://api.themoviedb.org/3/movie/popular',

// }
function fetchMovies(val) {
    
        return axios.get(`${refs.BASE_URL}?page=${val}`,
            {
             params: {
                    api_key: 'dbe66e1851c0a98cf79fd3fa903ac46b',
                //  q:'popular',
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: 'true',
                    
            }
            })
};

async function fetchedMovies(valPage) {
    try {
        
                
        await fetchMovies(valPage).then(({ data }) => {
          const page = data.page;
         const totalItems = data.total_pages / 20;
         pagination.reset(totalItems);
         return createMovieItems(data);
        //  return render(data,totalItems,page);
            

        })
    }
        catch (error) {
            console.log(error);
                     };
};
// fetchedMovies();
function createMovieItems(val) {
       const elementMovie = val.results.map(
           ({ original_title, poster_path, genre_ids, release_date, id }) => {
              
               return `<div class="movie-item">
            <img src="https://www.themoviedb.org/t/p/original${poster_path}"  alt="" class="movie-item__img">
                <h2 class="movie-item__title">${original_title}</h2>
                 <p class="movie-item__text">|${release_date}</p>
            
        </div>`
          
}).join("");
       refs.moviesGalleryRef.insertAdjacentHTML('afterbegin', elementMovie);
//    return new SimpleLightbox('.photo-card a', {
//       scrollZoom: false,
//     captionsData: "alt",
//     captionDelay: 250,

// }).refresh();
};
function resetCurrentPage() {
    return refs.moviesGalleryRef.innerHTML = '';
 };


///////////////////////examplefromRoma/////
// export function render(data,countPages,currentPage){
//   console.log(data);
//     const markup = data.map(item => {
//     return getFilmItemElement(item);
        
//     }).join('');
//     ref.element.innerHTML = markup;
//     // пагінація 
// }
// const callbacks = new Set();
// export function addListenerOnPageChange(callback){
//     callbacks.add(callback);
// }

// function onPageChange(currentPage){
    
//     for (const callback of callbacks){
//         callback(currentPage);

//     }
// }