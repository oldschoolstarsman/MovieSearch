$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = ($('#searchText').val());
        getMovies(searchText);
        e.preventDefault();
        
    })
})

const baseUrl = 'http://www.omdbapi.com';
const apiKey = '&apikey=b9c643ad';

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText + apiKey)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                console.log(movie.Title)
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

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err)
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId =  sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com?i=' + movieId + apiKey)
        .then((response) => {
            let movie = response.data;
            console.log(movie);
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
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
                            <div class=>
                                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-sm btn-primary">View IMDB</a>
                                <a href="index.html" class="btn btn-link">Go Back To Search</a>
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
