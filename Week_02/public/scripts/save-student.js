document.getElementById('student-form').addEventListener('submit', async function (event) {
  const apiUrl = 'http://localhost:8000/api/student';

  event.preventDefault();

  // get form values
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const email = document.getElementById('email').value;

  // form data object
  const studentDetails = {
    name,
    id,
    email,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentDetails),
    });

    if (response.ok) {
      const result = await response.json();
      alert('Student details saved successfully!');

      displayStudent(result.data.student);

      // clear form data
      document.getElementById('student-form').reset();
    } else {
      alert('Failed to save student details.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while saving student details!');
  }
});

function displayStudent(student) {
  const tableBody = document.getElementById('studentTableBody');

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
}
