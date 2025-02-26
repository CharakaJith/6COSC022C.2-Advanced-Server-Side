document.addEventListener('click', function (event) {
  if (event.target.id === 'search-btn') {
    const apiUrl = 'http://localhost:8000/api/movie/search';
    const searchInput = document.getElementById('searchInput');
    const movieName = searchInput.value.trim();

    if (movieName) {
      fetch(`${apiUrl}/${movieName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            displayMovies(data.data.movies);
          } else {
            console.error('Failed to search movies:', data);
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      const apiUrl = 'http://localhost:8000/api/movie';

      // fetch movies
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            displayMovies(data.data.movies);
          } else {
            console.error('Failed to fetch movies:', data);
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }
});

// create doc -> fyp-progress
// write intro
// create wireframes
