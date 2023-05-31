let currentTrailerIndex = 0;


const API_KEY = '890fbe49c4e2045e1f43ceac9012d13a';

let trailers = [];
let previewIndex = 0;

async function fetchTrailers() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=<<your_api_key>>&language=en-US&page=1');
    const data = await response.json();
    return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
        youtubeId: movie.videos.results[0].key
    }));
}

async function populateTrailerCarousel() {
    trailers = await fetchTrailers();
    updateTrailerCarousel();
}

function updateTrailerCarousel() {
    const carousel = document.querySelector('.trailer-carousel');
    const preview = document.querySelector('.trailer-preview');

    carousel.innerHTML = '';
    preview.innerHTML = '';

    trailers.forEach((trailer, index) => {
        const poster = document.createElement('img');
        poster.src = trailer.posterPath;
        poster.alt = `Poster for ${trailer.title}`;
        poster.classList.add('carousel-poster');
        poster.onclick = () => {
            previewIndex = index;
            updateTrailerCarousel();
        };
        carousel.appendChild(poster);
    });

    preview.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailers[previewIndex].youtubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <img class="preview-poster" src="${trailers[previewIndex].posterPath}" alt="Poster for ${trailers[previewIndex].title}">
    `;
}

populateTrailerCarousel();


// Event handlers for the carousel arrows
document.querySelector('.arrow-left').addEventListener('click', () => {
    currentTrailerIndex = (currentTrailerIndex - 1 + trailers.length) % trailers.length;
    updateTrailerCarousel();
});

document.querySelector('.arrow-right').addEventListener('click', () => {
    currentTrailerIndex = (currentTrailerIndex + 1) % trailers.length;
    updateTrailerCarousel();
});

populateTrailerCarousel();
