const main = document.querySelector(".main")

fetch(genres_list_http + new URLSearchParams({
    api_key: api_key,
}))
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(item => {
            fetchMoviesListByGenres(item.id, item.name);
        })
    });

const fetchMoviesListByGenres = (id, genres) => {
    fetch(genres_movie_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
        .then(res => res.json())
        .then(data => makeCategoryElement(`${genres}_movies`, data.results))
}


const makeCategoryElement = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt="previous" /></button> </button>
        <h1 class="movie-category">${category.split("_").join(" ")}</h1>
        <div class="movie-container" id="${category}">
            
        </div>
        <button class="nxt-btn"> <img src="img/nxt.png" alt="next" /></button> </button>
    </div>
    `
    makeCards(category, data);
}

/** In our movie data we have "backdrop_path" which contains the
 * movie image. But in some cases we have to use  "poster_path" because
 * there is no image in TMDB
 */
const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }
        movieContainer.innerHTML += `
        <div class="movie">
            <img src="${image_url}${item.backdrop_path}" alt="poster" />
            <p class="movie-title">${item.title}</p>
        </div>
        `
        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling()
            }, 100)
        }
    })
}