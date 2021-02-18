
const stripeMoviesPopular = document.querySelector("section.popular-movies");
const stripeMoviesTopRated = document.querySelector("section.topRated-movies");
const stripeUncoming = document.querySelector("section.uncoming-movies");
const stripeSarch = document.querySelector("section.search-movies");

const toastSearch = document.querySelector("div.search-toast");
const btnSearch = document.querySelector("h2.search-toggle");
const inputSearchMovie = document.querySelector("input#input-movie");
const btnInputMovie = document.querySelector("button.btn-movie");
const formMovie = document.querySelector("form.form-movie");

let arrMovie = [];

const state = {
    config: {
        api_key: "4c92ecb713570027d15842178d4b610b",
        base_url: "https://api.themoviedb.org/3",
        base_url_poster: "https://image.tmdb.org/t/p/w500"
    },
};


// get data to API
function getUrl(path) {
    
    const {api_key} = state.config;
    const {base_url} = state.config;
    
    return `${base_url}${path}?api_key=${api_key}`;
}

const moviesPopular = getUrl("/movie/popular");
const moviesTopRated = getUrl("/movie/top_rated");
const moviesUncoming = getUrl("/movie/upcoming");



async function getData(url) {

    try {
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok) {
            throw result;
        } 
        console.log(result);
        return result;
    } catch (errMess) {
        console.error(errMess);
    }
    
}

// this for delay callback 
function debounce( callback, delay ) {
    let timeout;
    return function() {
        clearTimeout( timeout );
        timeout = setTimeout( callback, delay );
    }
}


// render card with movie info: img, title, stars

function renderCard(movieSection) {

    arrMovie.forEach(movie => {
        const {base_url_poster} = state.config;

        const link = document.createElement("a");
        const card = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h4");
        const stars = document.createElement("div");

        link.classList.add("card-link");
        card.classList.add("card-movie");
        img.classList.add("card-movie-img");
        title.classList.add("card-movie-title");
        stars.classList.add("stars");

        movieSection.appendChild(link);
        link.appendChild(card);
        card.appendChild(img);
        card.appendChild(stars);
        card.appendChild(title);


        
        link.href = `movie.html?id=${movie.id}`;
        title.textContent = movie.title?movie.title:movie.name;
        img.src = `${base_url_poster}${movie.poster_path}`;
        stars.style = `--rating: ${movie.vote_average/2}`;
    });

};

// render card on stripe
async function renderStripe(moviesFamily, moviesSection) {

    const result = await getData(moviesFamily).then ((result) => {
        return result;
    })

    arrMovie =  [...result.results];
    renderCard(moviesSection);

}

function renderSearchMovie() {

    
    const {base_url, api_key} = state.config;
    const pippo = `${base_url}/search/movie?api_key=${api_key}&language=en-US&query=${inputSearchMovie.value}&page=1&include_adult=false`;
    renderStripe(pippo,stripeSarch) ;
    
    while (stripeSarch.hasChildNodes()) {
        stripeSarch.removeChild(stripeSarch.lastChild);
    }
}




btnSearch.addEventListener("click", (evt) => {
    toastSearch.classList.toggle("is-show");
    evt.preventDefault;
})

inputSearchMovie.addEventListener("input", debounce(renderSearchMovie, 500))


renderStripe(moviesPopular, stripeMoviesPopular);
renderStripe(moviesTopRated, stripeMoviesTopRated);
renderStripe(moviesUncoming, stripeUncoming);


