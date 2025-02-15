document.addEventListener('click', async function (event) {
  const apiUrl = 'http://localhost:8000/api/student';

  if (event.target && event.target.classList.contains('delete-btn')) {
    const studentId = event.target.getAttribute('data-id');

    fetch(`${apiUrl}/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Student deleted successfully');
          // Optionally, remove the student row from the table
          const row = event.target.closest('tr');
          row.remove();
        } else {
          alert('Error deleting student');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error deleting student');
      });
  }
});
