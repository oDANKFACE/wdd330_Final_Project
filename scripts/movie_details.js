const movieId = window.location.search.split('=')[1]; // Assuming the movie ID is passed in the URL as a parameter
const apiKey = 'your_api_key'; // Replace with your actual API key
const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
const movieElement = document.getElementById('movie-details');

fetch(movieDetailsUrl)
    .then(response => response.json())
    .then(data => {
        // Populate the page with data
        movieElement.querySelector('.title').textContent = data.title;
        movieElement.querySelector('.release-date').textContent = data.release_date;
        movieElement.querySelector('.plot-summary').textContent = data.overview;
        movieElement.querySelector('.rating-genre').textContent = `Rating: ${data.vote_average} | Genre: ${data.genres[0].name}`;
        // And so on for other fields
    })
    .catch(error => console.error(error));
