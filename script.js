const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWY1ODc2NDAxZmYzYTkwYTA2YTIzYTk0NjY0OTViOSIsIm5iZiI6MTc5MDU3OTkzNS4zOTkwMDAyLCJzdWIiOiI2YWJhMTRkZjVhZGE5ODFiZGEwNDAzYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3kqQ7pq8z_OvF3fhd3Ym2dj8ogsVN--DaHfsNVQiLSk";

const baseUrl = "https://image.tmdb.org/t/p/w500"

const rootDom = document.querySelector("#root")

console.log(baseUrl);

let imageList = []

import { Header } from "./komponenter/Header.js";

fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`
    }
})
.then(response => response.json())
    .then(data => {
        console.log(data);
        render(data)
    })
    .catch(error => {
        console.error(error);
    });

    function render(data) {
        rootDom.innerHTML = ""

        const mainDom = document.createElement("main")

        mainDom.innerHTML = /*HTML*/ `
            <div>
                <h1>Now Showing</h1>
            </div>

            <section id="trending">
                <div id="horizontal-movie-row">
                    ${data.results.map(movie =>/*HTML*/ `
                    <a href="details.html?id=${movie.id}" class="movies">
                        <div>
                            <img src="${baseUrl}${movie.poster_path}">
                            <h3>${movie.title}</h3>
                        </div>
                    </a>
                `).join("")}
                </div>
            </section>
        `
        rootDom.append(Header(),mainDom)
    }