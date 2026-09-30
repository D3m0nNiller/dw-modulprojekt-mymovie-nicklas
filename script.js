const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWY1ODc2NDAxZmYzYTkwYTA2YTIzYTk0NjY0OTViOSIsIm5iZiI6MTc5MDU3OTkzNS4zOTkwMDAyLCJzdWIiOiI2YWJhMTRkZjVhZGE5ODFiZGEwNDAzYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3kqQ7pq8z_OvF3fhd3Ym2dj8ogsVN--DaHfsNVQiLSk";

const baseUrl = "https://image.tmdb.org/t/p/w500"

const rootDom = document.querySelector("#root")

console.log(baseUrl);

import { Header } from "./komponenter/Header.js";
import { FooterMobile } from "./komponenter/FooterMobile.js";

async function hentFilmData() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`
    }
  };

  try {
    const [resTrending, resPopular, resGenres] = await Promise.all([
      fetch("https://api.themoviedb.org/3/trending/movie/week", options),
      fetch("https://api.themoviedb.org/3/movie/popular", options),
      fetch("https://api.themoviedb.org/3/genre/movie/list", options)
    ]);

    const trendingData = await resTrending.json();
    const popularData = await resPopular.json();
    const genreData = await resGenres.json();

    console.log("Trending:", trendingData);
    console.log("Popular:", popularData);
    console.log("Genre:", genreData);
    

    render(trendingData, popularData, genreData.genres);

  } catch (error) {
    console.error(" Der skete en fejl under hentning af film:", error);
  }
}

hentFilmData();

    function render(trendingData, popularData, resGenres) {
        function hentGenreTags(genreIds) {
        return genreIds.map(id => {
                const genre = resGenres.find(g => g.id === id);
                
                if (genre) {
                    return `<p class="genre-badge">${genre.name}</p>`;
                }
                return "";
            }).join("");
        }


        rootDom.innerHTML = ""

        const mainDom = document.createElement("main")

        mainDom.innerHTML = /*HTML*/ `
            <div>
                <h1>Now Showing</h1>
            </div>

            <section id="trending">
                <div id="horizontal-movie-row">
                    ${trendingData.results.map(trending =>/*HTML*/ `
                    <a href="details.html?id=${trending.id}" class="movies">
                        <div>
                            <img src="${baseUrl + trending.poster_path}" alt="${trending.original_title}">
                            <h3>${trending.title}</h3>
                        </div>
                    </a>
                `).join("")}
                </div>
            </section>

            <section id="popular">
            <h1>Popular</h1>
                ${popularData.results.map(popular => /*html*/ `
                    <a href="details.html?id=${popular.id}">
                        <div class="setup-container">
                            <img src="${baseUrl + popular.poster_path}" alt="${popular.original_title}">
                            <h2 class="movie-title">${popular.title}</h2>
                            <p id="rating">${popular.vote_average.toFixed(1)}/10 IMDb</p>
                            <div class="genre-container">
                                ${hentGenreTags(popular.genre_ids)}
                            </div>
                        </div>
                    </a>
                `).join("")}
            </section>
        `
        rootDom.append(Header(), mainDom, FooterMobile())
    }