const apiKey = '890fbe49c4e2045e1f43ceac9012d13a';
let movieIndex = 0;
let upcomingMovies = [];

document.addEventListener('DOMContentLoaded', (event) => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => {
            upcomingMovies = data.results;
            displayMovies();
        });

    document.querySelector('#carousel-next').addEventListener('click', () => {
        movieIndex = (movieIndex + 1) % upcomingMovies.length;
        displayMovies();
    });

    document.querySelector('#carousel-prev').addEventListener('click', () => {
        movieIndex = (movieIndex - 1 + upcomingMovies.length) % upcomingMovies.length;
        displayMovies();
    });
});

function displayMovies() {
    let mainPoster = document.querySelector('#main-poster');
    mainPoster.innerHTML = `
        <a href="movie_details.html?id=${upcomingMovies[movieIndex].id}">
            <img src="https://image.tmdb.org/t/p/w500${upcomingMovies[movieIndex].poster_path}" alt="${upcomingMovies[movieIndex].title}">
            <div class="release-date">Release Date: ${upcomingMovies[movieIndex].release_date}</div>
        </a>
    `;

    let sidePosters = document.querySelector('#side-posters');
    sidePosters.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
        let index = (movieIndex + i) % upcomingMovies.length;
        let div = document.createElement('div');
        div.innerHTML = `
            <a href="javascript:void(0);" onclick="jumpToIndex(${index})">
                <img src="https://image.tmdb.org/t/p/w500${upcomingMovies[index].poster_path}" alt="${upcomingMovies[index].title}">
            </a>
        `;
        sidePosters.appendChild(div);
    }
}

window.jumpToIndex = function(index) {
    movieIndex = index;
    displayMovies();
}
