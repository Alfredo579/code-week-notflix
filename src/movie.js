
const path = window.location.search;
const id = path.split("=").pop();
console.log(id);

const container = document.querySelector("main.movie_conatiner");
const img = document.querySelector("img.movie_img");
const title = document.querySelector("h2.movie_title");
const year = document.querySelector("h3.movie_year");
const movieLength = document.querySelector("h3.movie_length");
const description = document.querySelector("p.movie_description");
const cast = document.querySelector("h3.movie_cast");
const direction = document.querySelector("h3.movie_direction");
const stripeSimilar = document.querySelector("section.stripe-movies");

const state = {
    config: {
        base_url: "https://api.themoviedb.org/3/movie/",
        api_key: "4c92ecb713570027d15842178d4b610b",
        base_url_poster: "https://image.tmdb.org/t/p/w500",
        language: "it-IT"
    }
}


const {api_key} = state.config;
const {base_url} = state.config; 

const urlSimilar = `${base_url}${id}/similar?api_key=${api_key}&language=${navigator.language}&page=1`;







async function getData(url) {

    const {api_key} = state.config;
    const {base_url} = state.config; 


    try {
        const response = await fetch(url);
        const result = await response.json();
    
        if (!response.ok) {
          throw result;
        }
        return result;
      } catch (errMessage) {
        console.log(errMessage);
      }
}


// get data Details movie 
// async function getDetails() {
//     const {api_key} = state.config;
//     const {base_url} = state.config; 

//     try {
//         const response = await fetch(`${base_url}${id}?api_key=${api_key}&language=${navigator.userLanguage}`);
//         const result = await response.json();
    
//         if (!response.ok) {
//           throw result;
//         }
//         return result;
//       } catch (errMessage) {
//         console.log(errMessage);
//       }
// }
// async function getCredits() {
//     const {api_key} = state.config;
//     const {base_url} = state.config; 

//     try {
//         const response = await fetch(`${base_url}${id}/credits?api_key=${api_key}&language=${navigator.language}`);
//         const result = await response.json();
    
//         if (!response.ok) {
//           throw result;
//         }
//         return result;
//     } catch (errMessage) {
//         console.log(errMessage);
//     }

// }
// render page with details and credit
async function renderDetails() {

    const {api_key} = state.config;
    const {base_url} = state.config; 

    

    await getData(`${base_url}${id}?api_key=${api_key}&language=${navigator.userLanguage}`)
        .then ((result) => {

        const {base_url_poster} = state.config; 
        
        img.src = `${base_url_poster}${result.backdrop_path}`;
        title.textContent = `${result.title}`;

        const date = new Date(result.release_date);
        year.textContent = `Anno: ${date.getFullYear()}`;

        movieLength.textContent = `durata: ${result.runtime} minuti`;
        description.textContent = `${result.overview}`;
        
    })

}

async function renderCredits() { 

    
 
    await getData(`${base_url}${id}/credits?api_key=${api_key}&language=${navigator.language}`)
    .then((result) => {

        const actors = result.cast.slice(0, 5).map((actor) => actor.name);
        cast.textContent = `cast: ${actors}`;

        const crew = result.crew
        .filter((person) => person.job === "Director")
        .map((person) => person.name);

        direction.textContent = `director: ${crew}`;

    })

}

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

}

async function renderStripe(moviesFamily, moviesSection) {

    const result = await getData(moviesFamily).then ((result) => {
        return result;
    })

    arrMovie =  [...result.results];
    renderCard(moviesSection);

}


renderDetails();
renderCredits();

renderStripe(urlSimilar, stripeSimilar);