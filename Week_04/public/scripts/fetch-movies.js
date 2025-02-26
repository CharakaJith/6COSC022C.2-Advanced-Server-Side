document.addEventListener('DOMContentLoaded', function () {
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
});

// display movies in the table
function displayMovies(movies) {
  const tableBody = document.getElementById('movieTableBody');
  tableBody.innerHTML = '';

  movies.forEach((movie) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td>${movie.director}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating}</td>
        <td>${movie.released}</td>
        <td style="display: flex; gap: 10px;">
              <button class="edit-btn" data-id="${movie.id}" style="background: none; border: none; cursor: pointer; color: blue; text-decoration: underline;">
                Edit
              </button>
              <button class="delete-btn" data-id="${movie.id}" style="background: none; border: none; cursor: pointer; color: red; text-decoration: underline;">
                Delete
              </button>
            </td>
        `;

    tableBody.appendChild(row);
  });
}
