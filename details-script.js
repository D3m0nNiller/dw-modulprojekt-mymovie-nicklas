const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWY1ODc2NDAxZmYzYTkwYTA2YTIzYTk0NjY0OTViOSIsIm5iZiI6MTc5MDU3OTkzNS4zOTkwMDAyLCJzdWIiOiI2YWJhMTRkZjVhZGE5ODFiZGEwNDAzYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3kqQ7pq8z_OvF3fhd3Ym2dj8ogsVN--DaHfsNVQiLSk";

const baseUrl = "https://image.tmdb.org/t/p/w500"

const rootDomDetails = document.querySelector("#details-root")

const titleDom = document.querySelector("title")

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log(id);

async function getDetails() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`
    }
  };

  try {
    const [chosenDetails, resGenres, resActors] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}`, options),
      fetch("https://api.themoviedb.org/3/genre/movie/list", options),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
    ]);

    const detailsResponse = await chosenDetails.json()
    const genreData = await resGenres.json()
    const actorsData = await resActors.json()

    console.log("Chosen Details:", detailsResponse);
    console.log("Genre Details :", genreData.genres);
    console.log("Actors Details", actorsData.cast);



    detailsRender(detailsResponse, genreData.genres, actorsData.cast);

  } catch (error) {
    console.error(" Der skete en fejl under hentning af film:", error);
  }
}

getDetails();



function detailsRender(details, genres, cast) {
  const actorsHTML = cast.map(actor => {
    return /*html*/ `
      <div>
          <img src="${baseUrl + actor.profile_path}" alt="${actor.original_name}" loading="lazy">
          <h2>${actor.original_name}</h2>
        </div>`
  }).join("")
  

  const genreHTML = details.genres.map(genre => {
    return `<p class="genre-badge">${genre.name}</p>`;
  }).join("");

  rootDomDetails.innerHTML = ""

  rootDomDetails.innerHTML = /*html*/ `
      <img src="${baseUrl + details.poster_path}" alt="">
        
      <h1 class="movie-title">${details.original_title}</h1>

      <p class="details-rating">${details.vote_average.toFixed(1)}/10 IMDb</p>

      <div>
        ${genreHTML}
      </div>

      <div class="extra-information">
        <div id="length">
          <p>Length</p>
          <p>"time"</p>
        </div>

        <div id="language">
          <p>Language</p>
          <p>"English"</p>
        </div>

        <div id="rating-number">
          <p>Rating</p>
          <p>"PG-Number"</p>
        </div>
      </div>

      <section>
        <h2>Description</h2>

        <p>${details.overview}</p>
      </section>

      <section>
        <h2>Cast</h2>

        <div>
            ${actorsHTML}
        </div>
      </section>
    `
}
detailsRender()