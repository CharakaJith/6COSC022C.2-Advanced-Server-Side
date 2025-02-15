document.getElementById('age-form').addEventListener('submit', async function (event) {
  const apiUrl = 'http://localhost:8000/api/date';

  event.preventDefault();

  // get form value
  const birthDate = document.getElementById('date').value;

  // form data object
  const reqBody = {
    date: birthDate,
  };

  try {
    // reset result values
    document.getElementById('age').textContent = '';
    document.getElementById('text').textContent = '';
    document.getElementById('error').textContent = '';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    const result = await response.json();
    if (response.ok) {
      // set values
      document.getElementById('age').textContent = `Current age: ${result.data.age}`;
      document.getElementById('text').textContent = `${result.data.nextBday}`;
    } else {
      // set error
      document.getElementById('error').textContent = result.data.message;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while calculating the age!');
  }

  // flip the form to result side
  document.querySelector('.form-wrapper').classList.add('flipped');
});

// event listner to go back
document.getElementById('go-back').addEventListener('click', function () {
  // flip the form to front side
  document.querySelector('.form-wrapper').classList.remove('flipped');

  // reset form
  document.getElementById('age-form').reset();
});
