import "jquery";
import "bootstrap-loader";
import "./style.scss";

$(document).ready(function() {
  $("body").removeClass("hidden");
  let moviesList = [];

  $("#myBtn").click(function() {
    $("#myModal").modal();
  });
  $("#movie-details").on("click", function(event) {
    console.log($(this).attr("id"));
  });
  const getMovies = () => {
    const movieURL = `https://api.themoviedb.org/3/genre/27/movies?api_key=2434d246ec60c162a86db597467ef4ed&language=en-US&include_adult=false&sort_by=created_at.asc`;

    fetch(movieURL)
      .then(res => res.json())
      .then(payload => {
        moviesList = payload.results;
        console.log(payload.results);
        createPosters();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getMovieDetails = movieId => {
    const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=2434d246ec60c162a86db597467ef4ed`;
    fetch(movieDetailsURL)
      .then(res => res.json())
      .then(payload => {
        console.log(payload);
        presentMovieDetailsModal(payload);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const presentMovieDetailsModal = movie => {
    $(".modal-title:first").text(movie.title);
    $(".movieDetails-overview:first").text(movie.overview);
    $(".movieDetails-img:first").attr(
      "src",
      "https://image.tmdb.org/t/p/w500/" + movie.poster_path
    );
    $(".movieDetails-tagline:first").text(movie.tagline);
    $("#movieDetails-modal").modal();
  };

  const createPosters = () => {
    moviesList
      .map(function(movie) {
        var divColumn = $("<div>").attr(
          "class",
          "col-xs-12 col-sm-6 col-md-4 col-lg-4"
        );
        var divThumbnail = $("<div>")
          .attr("class", "thumbnail poster_thumbnail")
          .append(
            $("<img>")
              .attr(
                "src",
                "http://image.tmdb.org/t/p/w500/" + movie.poster_path
              )
              .attr("class", "poster_img")
          )
          .append(
            $("<h4>")
              .append(movie.release_date)
              .attr("class", "hidden-xs hidden-sm")
          )
          .append(
            $("<p>", {
              class: "",
              text: movie.overview
            }).attr("class", "hidden-xs hidden-sm")
          )
          .append(
            $("<div>")
              .attr("class", "caption")
              .append($("<h2>").append(movie.title))
              .append(
                $("<button>")
                  .attr("id", "movie-details")
                  .attr("class", "btn btn-info btn-md")
                  .attr("type", "button")
                  .text("Details")
                  .click(function() {
                    console.log(movie.id);
                    getMovieDetails(movie.id);
                  })
              )
          );

        divColumn.append(divThumbnail);
        return divColumn;
      })
      .map(appendElementWithVisableSpacing);
  };

  const appendElementWithVisableSpacing = (movieElement, index) => {
    const divVisiableSpaceMDLG = $("<div>").attr(
      "class",
      "clearfix visable-md-block visable-lg-block"
    );
    const divVisableSpaceSM = $("<div>").attr(
      "class",
      "clearfix visible-sm-block"
    );

    $(".movies").append(movieElement);
    if (index && (index + 1) % 3 === 0) {
      $(".movies").append(divVisiableSpaceMDLG);
      if (index && (index + 1) % 2 === 0) {
        $(".movies").append(divVisableSpaceSM);
      }
    }
  };
  getMovies();
});
