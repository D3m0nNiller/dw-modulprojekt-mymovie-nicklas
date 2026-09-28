const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWY1ODc2NDAxZmYzYTkwYTA2YTIzYTk0NjY0OTViOSIsIm5iZiI6MTc5MDU3OTkzNS4zOTkwMDAyLCJzdWIiOiI2YWJhMTRkZjVhZGE5ODFiZGEwNDAzYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3kqQ7pq8z_OvF3fhd3Ym2dj8ogsVN--DaHfsNVQiLSk";

fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });