const container = document.querySelector("main.movie_conatiner")
const img = document.querySelector("img.movie_img")
const title = document.querySelector("h2.movie_title")
const year = document.querySelector("h3.movie_year")
const movieLength = document.querySelector("h3.movie_length")
const description = document.querySelector("p.movie_description")
const cast = document.querySelector("h3.movie_cast")
const direction = document.querySelector("h3.movie_direction")

const path = window.location.search;
const id = path.split("=").pop();
console.log(id);

const state = {
    config: {
        base_url: "https://api.themoviedb.org/3/movie/",
        api_key: "4c92ecb713570027d15842178d4b610b",
        base_url_poster: "https://image.tmdb.org/t/p/w500"
    }
}


async function getDetails() {
    const {api_key} = state.config;
    const {base_url} = state.config; 

    try {
        const response = await fetch(`${base_url}${id}?api_key=${api_key}&language=${state.config.language}`);
        const result = await response.json();
    
        if (!response.ok) {
          throw result;
        }
        return result;
      } catch (errMessage) {
        console.log(errMessage);
      }
}
async function getCredits() {
    const {api_key} = state.config;
    const {base_url} = state.config; 

    try {
        const response = await fetch(`${base_url}${id}/credits?api_key=${api_key}&language=${state.config.language}`);
        const result = await response.json();
    
        if (!response.ok) {
          throw result;
        }
        return result;
    } catch (errMessage) {
        console.log(errMessage);
    }

}

async function renderDetails() {

    await getDetails().then ((result) => {

        const {base_url_poster} = state.config; 
        
        img.src = `${base_url_poster}${result.backdrop_path}`
        title.textContent = `${result.title}`

        const date = new Date(result.release_date)
        year.textContent = `Anno: ${date.getFullYear()}`;

        movieLength.textContent = `durata: ${result.runtime} minuti`
        description.textContent = `${result.overview}`
        
    })

    await getCredits().then((result) => {

        const actors = result.cast.slice(0, 5).map((actor) => actor.name);
        cast.textContent = `cast: ${actors}`;

        const crew = result.crew
        .filter((person) => person.job === "Director")
        .map((person) => person.name);

        direction.textContent = `director: ${crew}`;

    })

}


renderDetails()