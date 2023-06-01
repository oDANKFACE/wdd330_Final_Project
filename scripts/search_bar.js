document.addEventListener('DOMContentLoaded', (event) => {
    const API = '890fbe49c4e2045e1f43ceac9012d13a';

    let searchInput = document.querySelector('#search-bar input');
    let searchResults = document.querySelector('#search-results');

    searchInput.addEventListener('input', () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${searchInput.value}`)
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = data.results.map(movie => `<p data-id="${movie.id}">${movie.title}</p>`).join('');
                searchResults.classList.add('show');

                document.querySelectorAll('#search-results p').forEach(item => {
                    item.addEventListener('click', event => {
                        let movieId = event.target.getAttribute('data-id');

                        window.location.href = `movie_details.html?id=${movieId}`;
                    });
                });
            });
    });

    document.addEventListener('click', event => {
        if (!searchInput.contains(event.target)) {
            searchResults.classList.remove('show');
        }
    });

    let urlParams = new URLSearchParams(window.location.search);
    let movieId = urlParams.get('id');

    if(movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('movie-title').innerText = data.title;
                document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                document.getElementById('movie-overview').innerText = `Overview: ${data.overview}`;
                document.getElementById('movie-genres').innerText = `Genres: ${data.genres.map(genre => genre.name).join(', ')}`;
                document.getElementById('movie-release').innerText = `Release date: ${data.release_date}`;
                document.getElementById('movie-rating').innerText = `Rating: ${data.vote_average}`;

                let recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
                let movie = {
                    id: movieId,
                    title: data.title
                };

                recentMovies = recentMovies.filter(m => m.id !== movie.id);

                recentMovies.unshift(movie);

                if (recentMovies.length > 10) {
                    recentMovies = recentMovies.slice(0, 10);
                }

                localStorage.setItem('recentMovies', JSON.stringify(recentMovies));

            });
    }
});
