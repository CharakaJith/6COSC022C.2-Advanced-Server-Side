document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const apiUrl = 'http://localhost:8000/api/movie';
    const confirmDelete = confirm('Are you sure you want to delete this movie?');

    if (confirmDelete) {
      const movieId = event.target.dataset.id;

      fetch(`${apiUrl}/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.message || 'Failed to delete movie.');
            });
          }
          return response.json();
        })
        .then(() => {
          event.target.closest('tr').remove(); // remove the row from the table
        })
        .catch((error) => console.error('Error fetching data:', error.message));
    }
  }
});
