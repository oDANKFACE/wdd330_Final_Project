document.querySelector('.header').innerHTML =
    `<nav>
        <a href="index.html">
            <div id="nav-logo">
                Not IMDB
            </div>
        </a>
        <div id="search-bar">
            <input type="text" placeholder="Search movies...">
            <div id="search-results"></div>
        </div>
    </nav>`;
document.querySelector('.footer').innerHTML =
    '<p>Copyright &copy; 2023 Not IMDB</p>';