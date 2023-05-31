const API_KEY = '890fbe49c4e2045e1f43ceac9012d13a'; // Replace with your actual API key
let releasedMovies = [];
let carouselIndex = 0;

function fetchReleasedMovies() {
    let today = new Date().toISOString().split('T')[0];
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&primary_release_date.lte=${today}&page=1`)
        .then(response => response.json())
        .then(data => {
            releasedMovies = [...data.results].filter(movie => movie.poster_path !== null).slice(0, 15);
            displayCarouselMovies();
        });
}

function displayCarouselMovies() {
    const carouselPosters = document.getElementById('carousel-posters');
    carouselPosters.innerHTML = '';

    let numMovies = window.innerWidth >= 768 ? 6 : 3;

    for (let i = 0; i < numMovies; i++) {
        let index = (carouselIndex + i) % releasedMovies.length;
        let div = document.createElement('div');
        div.innerHTML = `
            <a href="movie_details.html?id=${releasedMovies[index].id}">
                <img src="https://image.tmdb.org/t/p/w500${releasedMovies[index].poster_path}" alt="${releasedMovies[index].title}">
            </a>
        `;
        carouselPosters.appendChild(div);
    }
}

function moveCarousel(direction) {
    carouselIndex = (carouselIndex + direction + releasedMovies.length) % releasedMovies.length;
    displayCarouselMovies();
}

fetchReleasedMovies();
window.addEventListener('resize', displayCarouselMovies);