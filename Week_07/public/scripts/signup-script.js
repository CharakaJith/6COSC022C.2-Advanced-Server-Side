document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://localhost:8000/api/user';
  const form = document.querySelector('.sign-up-form');
  const errorMessagesContainer = document.getElementById('errorMessages');
  const errorList = document.getElementById('errorList');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // send request
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Sign-up successful!');

          window.location.href = 'login.html';
        } else {
          // clear previous errors
          errorMessagesContainer.style.display = 'block';
          errorList.innerHTML = '';

          // scenario: single error message
          if (data.response && data.response.data && data.response.data.message) {
            const errorMessage = data.response.data.message;
            const errorItem = document.createElement('li');
            errorItem.textContent = errorMessage;
            errorList.appendChild(errorItem);
          }

          // scenario: error message array
          else if (data.response && data.response.data && Array.isArray(data.response.data)) {
            data.response.data.forEach((error) => {
              const errorItem = document.createElement('li');
              errorItem.textContent = `${error.message}`;
              errorList.appendChild(errorItem);
            });
          }

          // default
          else {
            alert('There was an error signing up. Please try again.');
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);

        window.location.href = 'index.html';
      });
  });
});
