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
    const [chosenDetails] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    ]);

    const detailsResponse = await chosenDetails.json()

    console.log("Chosen Details:", detailsResponse);    

    detailsRender(detailsResponse);

  } catch (error) {
    console.error(" Der skete en fejl under hentning af film:", error);
  }
}

getDetails();

function detailsRender(details) {
    
    rootDomDetails.innerHTML = ""

    rootDomDetails.innerHTML = /*html*/ `
        <div>
            <img src="${baseUrl + details.poster_path}" alt="">
        </div>
    `
}
detailsRender()