const main = document.querySelector(".main")
let array = [268, 8536, 9651, 10869, 672, 634649,]
fetch(`${movie_detail_http}/${array[Math.floor(Math.random() * array?.length)]}?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => setupMovieRandom(data))

const setupMovieRandom = (data) => {
    const movieName = document.querySelector('.movie-names')
    const genres = document.querySelector('.genress')
    const des = document.querySelector('.dess')
    const title = document.querySelector('title')
    const backdrop = document.querySelector('.movie-infos')

    title.innerHTML = movieName.innerHTML = data.title;
    genres.innerHTML = `${data.release_date?.split("-")[0]} | `
    for (let i = 0; i < data.genres.length; i++) {
        genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length)
    }
    if (data.adult == true) {
        genres.innerHTML += ' | +18'
    }

    if (data.backdrop_path == null) {
        data.backdrop_path = data.poster_path
    }

    if (data.overview.length < 200) {
        des.innerHTML = data.overview
    } else {
        des.innerHTML = data.overview.substring(0, 200) + "..."
    }
    backdrop.style.backgroundImage = `url(${original_image_url}${data.backdrop_path})`

}

const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' : ', '
}



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
        if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
                return;
            }
        }
        movieContainer.innerHTML += `
        <div class="movie" onCLick="location.href = '/${item.id}'">
            <img src="${image_url}${item.backdrop_path}" alt="poster" />
            <p class="movie-title">${item.title}</p>
        </div>
        `
        if (i == data.length - 1) {
            setTimeout(() => {
                setupScrolling()
            }, 100)
        }
    })
}