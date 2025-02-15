document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://localhost:8000/api/student';

  // fetch data
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        displayStudents(data.data.students);
      } else {
        console.error('Failed to fetch students:', data);
      }
    })
    .catch((error) => console.error('Error fetching data:', error));
});

// display students in the table
function displayStudents(students) {
  const tableBody = document.getElementById('studentTableBody');
  tableBody.innerHTML = '';

  students.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td style="display: flex; gap: 10px;">
              <button class="edit-btn" data-id="${student.id}" style="background: none; border: none; cursor: pointer; color: blue; text-decoration: underline;">
                Edit
              </button>
              <button class="delete-btn" data-id="${student.id}" style="background: none; border: none; cursor: pointer; color: red; text-decoration: underline;">
                Delete
              </button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}
