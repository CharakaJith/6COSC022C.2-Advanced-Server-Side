document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://localhost:8000/api/user/login';
  const form = document.querySelector('.log-in-form');
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
          alert('Login successful!');

          // store user data in session
          const userData = data.response.data.user;
          sessionStorage.setItem('user', JSON.stringify(userData));

          window.location.href = 'home.html';
        } else {
          // clear previous errors
          errorMessagesContainer.style.display = 'block';
          errorList.innerHTML = '';

          // scenario: single error message
          if (data.response && data.response.data) {
            if (typeof data.response.data === 'string') {
              const errorItem = document.createElement('li');
              errorItem.textContent = data.response.data;
              errorList.appendChild(errorItem);
            }

            // scenario: error message array
            else if (Array.isArray(data.response.data)) {
              data.response.data.forEach((error) => {
                const errorItem = document.createElement('li');
                errorItem.textContent = error.message || 'Unknown error';
                errorList.appendChild(errorItem);
              });
            } else if (data.response.data.message) {
              const errorItem = document.createElement('li');
              errorItem.textContent = data.response.data.message;
              errorList.appendChild(errorItem);
            }
          }

          // default
          else {
            alert('There was an error logging in. Please try again.');
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  // clear data
  window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
      sessionStorage.removeItem('user');
      form.reset();
      errorMessagesContainer.style.display = 'none';
      errorList.innerHTML = '';
    }
  });
});
