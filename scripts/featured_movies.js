const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovies(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

let currentIndex = 0;

async function populateFeaturedMovies() {
    const upcomingMovies = await fetchMovies('/movie/upcoming?');
    const recentMovies = await fetchMovies('/movie/now_playing?');

    const featuredMovies = upcomingMovies.concat(recentMovies).slice(0, 15);

    updateCarousel(featuredMovies, currentIndex);
}

function updateCarousel(movies, startIndex) {
    const featuredMoviesSection = document.getElementById('featured-movies');

    // Clear the section
    featuredMoviesSection.innerHTML = '';

    for (let i = startIndex; i < startIndex + 5; i++) { // Display 5 posters
        const movie = movies[i];
        if (movie && movie.poster_path !== null) {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie';

            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            moviePoster.alt = movie.title;

            movieDiv.appendChild(moviePoster);
            featuredMoviesSection.appendChild(movieDiv);
        }
    }
}

function scrollCarousel(direction, movies) {
    if (direction === 'right') {
        currentIndex = Math.min(currentIndex + 1, movies.length - 5); // Ensure we don't go out of bounds
    } else {
        currentIndex = Math.max(currentIndex - 1, 0); // Ensure we don't go negative
    }

    updateCarousel(movies, currentIndex);
}

window.addEventListener('load', populateFeaturedMovies);

const rightArrow = document.querySelector('.right-arrow');
rightArrow.addEventListener('click', () => {
    scrollCarousel('right', featuredMovies);
});

const leftArrow = document.querySelector('.left-arrow');
if (leftArrow) {
    leftArrow.addEventListener('click', () => {
        scrollCarousel('left', featuredMovies);
    });
}
