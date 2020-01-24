const baseUrl = 'https://www.omdbapi.com';
const apiKey = '&apikey=b9c643ad';

$(document).ready(() => {
    getMovies('Mars');
    const searchedMovie = localStorage.getItem('searchedMovie');
    if (searchedMovie) getMovies(searchedMovie);
    $('#searchForm').on('submit', (e) => {
        e.preventDefault();
        let searchText = ($('#searchText').val());
        getMovies(searchText);

    })
})


function getMovies(searchText) {
    axios.get(`https://www.omdbapi.com?s=${searchText}${apiKey}`)
        .then((response) => {

            let movies = response.data.Search;
            let output = '';

            if (movies) {
                $.each(movies, (index, movie) => {
                    output += `
                        <div class="col-md-6 col-lg-4 p-3 animated fadeIn">
                            <div class="text-center cards">
                                <img src="${movie.Poster}">
                                <h5 class="mt-2">${movie.Title}</h5>
                                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-sm btn-outline-primary" href="#">Movie details</a>
                            </div>
                        </div>
                    `;
                });
            } else {
                output += '<div class="container animated fadeIn text-center">No movie found</div>'
            }

            $('#movies').html(output);
            localStorage.setItem('searchedMovie', searchText)
        })
        .catch((err) => {
            console.log(err)
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = `movie.html`;
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    axios.get(`https://www.omdbapi.com?i=${movieId}${apiKey}`)
        .then((response) => {
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2 class="ml-3">${movie.Title}</h2>
                        <ul class="list-group list-group-flush text-primary">
                            <li class="list-group-item border-0"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item border-0"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item border-0"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item border-0"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item border-0"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item border-0"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item border-0"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div class="cards">
                            <h3>Plot</h3>
                            ${movie.Plot}
                            <div class="mt-1">
                                <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="text-white">
                                    <button class="btn btn-sm btn-primary">View IMDB</button>
                                </a>
                                <a href="index.html">
                                    <button class="btn btn-sm btn-light">Go Back To Search</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err)
        });

}
