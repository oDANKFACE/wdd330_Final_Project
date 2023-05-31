document.addEventListener('DOMContentLoaded', (event) => {
    let recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
    let recentMoviesList = document.querySelector('#recent-movies ul');

    recentMovies.forEach(movie => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = `movie_details.html?id=${movie.id}`;
        a.innerText = movie.title;
        li.appendChild(a);
        recentMoviesList.appendChild(li);
    });
});
