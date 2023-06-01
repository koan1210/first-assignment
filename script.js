// 영화 API 구현
const fetchMovieData = async () => {
  const fetchMovieOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmM2NTM3MzM2MTZlYzdhYTk3MDBiMGI1MTgzOTFlZSIsInN1YiI6IjY0NzA4OWI4NTQzN2Y1MDBhOTA3OGEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4TOmGfbPiOIwgNU0M00BbY9FUDSbcgf9kIpQjieBgPc",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    fetchMovieOptions
  );
  const movieData = await response.json();
  return movieData.results;
};
const movieCardList = document.querySelector(".grid");

const createMovieCards = async () => {
  const movies = await fetchMovieData();
  console.log(movies);
  movieCardList.innerHTML = movies
    .map(
      (movie) =>
        `<div class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
            <h3 class="movie-title">${movie.title}</h3>
            <p class="release-date">Release date : ${movie.release_date}</p>
            <p class="vote-average">Rating : ${movie.vote_average}</p>
            <p class="movie-overview">${movie.overview}</p>
        </div>`
    )
    .join("");
};

createMovieCards();

// 영화 포스터 클릭
const handleMoviePosterClick = (movieId) => {
  alert(`선택한 영화의 ID: ${movieId}`);
};

// 영화 카드 클릭
movieCardList.addEventListener("click", (event) => {
  const movieCard = event.target.closest(".movie-card");
  if (movieCard) {
    const movieId = movieCard.id;
    handleMoviePosterClick(movieId);
  }
});

// 영화 검색
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchKeyword = searchInput.value.toLowerCase();

  const movies = await fetchMovieData();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchKeyword)
  );
  movieCardList.innerHTML = filteredMovies
    .map(
      (movie) =>
        `<div class="movie-card" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie-poster" />
            <h3 class="movie-title">${movie.title}</h3>
            <p class="release-date">Release date : ${movie.release_date}</p>
            <p class="vote-average">Rating : ${movie.vote_average}</p>
            <p class="movie-overview">${movie.overview}</p>
        </div>`
    )
    .join("");
});
