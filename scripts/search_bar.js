document.addEventListener('DOMContentLoaded', (event) => {
    const API = '890fbe49c4e2045e1f43ceac9012d13a';

    let searchInput = document.querySelector('#search-bar input');
    let searchResults = document.querySelector('#search-results');

    // Add an event listener to the search input to handle the user's input
    searchInput.addEventListener('input', () => {
        // Make an API request to TMDB to search for movies that match the user's input
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${searchInput.value}`)
            .then(response => response.json())
            .then(data => {
                // data.results is an array of movies that match the search
                // Use this data to populate the search suggestions dropdown
                searchResults.innerHTML = data.results.map(movie => `<p data-id="${movie.id}">${movie.title}</p>`).join('');
                searchResults.classList.add('show');

                // Add event listeners to each suggestion, so they can load the movie details page
                document.querySelectorAll('#search-results p').forEach(item => {
                    item.addEventListener('click', event => {
                        // Get the ID of the clicked movie
                        let movieId = event.target.getAttribute('data-id');

                        // Redirect to the movie details page
                        window.location.href = `movie_details.html?id=${movieId}`;
                    });
                });
            });
    });

    // Hide the search suggestions dropdown when the user clicks outside of it
    document.addEventListener('click', event => {
        if (!searchInput.contains(event.target)) {
            searchResults.classList.remove('show');
        }
    });

    // Get the ID of the movie from the URL
    let urlParams = new URLSearchParams(window.location.search);
    let movieId = urlParams.get('id');

    // Check if movieId exists
    if(movieId) {
        // Make an API request to TMDB to get the details for this movie
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}`)
            .then(response => response.json())
            .then(data => {
                // data is an object containing all the details for the movie
                // populate the movie details page
                document.getElementById('movie-title').innerText = data.title;
                document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                document.getElementById('movie-overview').innerText = `Overview: ${data.overview}`;
                document.getElementById('movie-genres').innerText = `Genres: ${data.genres.map(genre => genre.name).join(', ')}`;
                document.getElementById('movie-release').innerText = `Release date: ${data.release_date}`;
                document.getElementById('movie-rating').innerText = `Rating: ${data.vote_average}`;

                // save recently viewed movie in localStorage
                let recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
                let movie = {
                    id: movieId,
                    title: data.title
                };

                // remove the movie if it already exists in the list
                recentMovies = recentMovies.filter(m => m.id !== movie.id);

                // add the movie to the start of the list
                recentMovies.unshift(movie);

                // keep only the first 10 items
                if (recentMovies.length > 10) {
                    recentMovies = recentMovies.slice(0, 10);
                }

                localStorage.setItem('recentMovies', JSON.stringify(recentMovies));

            });
    }
});
