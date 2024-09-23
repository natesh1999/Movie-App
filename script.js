const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c43ea5b05e010667596d1b90d5bd149f&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=c43ea5b05e010667596d1b90d5bd149f&query=" '

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//get initial movies
// getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    MediaDeviceInfo.innerHTML = ''

    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview } = movie

        const movieEL = document.createElement('div')
        movieEL.classList.add('movie')

        movie.innerHTML = `
        
            <img src="${IMG_PATH + poster_path} " alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span id="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        
        `

        main.appendChild.apply(movieEL)
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
        } else if (vote >= 5) {
            return 'orange'
            } else {
                return 'red'
                }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
    }else{
        window.location.reload()
    }
})