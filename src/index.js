
const stripeMoviesPopular = document.querySelector("section.popular-movies")
const stripeMoviesTopRated = document.querySelector("section.topRated-movies")
const stripeUncoming = document.querySelector("section.uncoming-movies")


const state = {
    config: {
        api_key: "4c92ecb713570027d15842178d4b610b",
        base_url: "https://api.themoviedb.org/3",
        base_url_poster: "https://image.tmdb.org/t/p/w500"
    },
    // movies: {},
    // tv: {}
}

let arrMovie = []


function getUrl(path) {
    
    const {api_key} = state.config;
    const {base_url} = state.config;
    
    return `${base_url}${path}?api_key=${api_key}`;
}
const moviesPopular = getUrl("/movie/popular")
const moviesTopRated = getUrl("/movie/top_rated")
const uncoming = getUrl("/movie/upcoming")

async function getData(url) {

    try {
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok) {
            throw result;
        } 
        console.log("questo è il result di get data ", result)
        return result;
    } catch (errMess) {
        console.error(errMess);
    }
    
}

// getData(`${moviesPopular}`)

function renderCard(movieSection) {

    arrMovie.forEach(movie => {
        const {base_url_poster} = state.config;

        const link = document.createElement("a")
        const card = document.createElement("div")
        const img = document.createElement("img");
        const title = document.createElement("h4")
        const stars = document.createElement("div")

        link.classList.add("card-link")
        card.classList.add("card-movie")
        img.classList.add("card-movie-img")
        title.classList.add("card-movie-title")
        stars.classList.add("stars")

        movieSection.appendChild(link)
        link.appendChild(card)
        card.appendChild(img)
        card.appendChild(stars)
        card.appendChild(title)


        
        link.href = `movie.html?id=${movie.id}`
        title.textContent = movie.title?movie.title:movie.name
        img.src = `${base_url_poster}${movie.poster_path}`
        stars.style = `--rating: ${movie.vote_average/2}`
    });

}

async function renderStripe(moviesFamily, moviesSection) {

    const result = await getData(moviesFamily).then ((result) => {
        return result
    })

    arrMovie =  [...result.results];
    console.log("questo è lo result: ",arrMovie);
    renderCard(moviesSection)

}

console.log("questo è lo state: ",state);
    
renderStripe(moviesPopular, stripeMoviesPopular)
renderStripe(moviesTopRated, stripeMoviesTopRated)
renderStripe(uncoming, stripeUncoming)


