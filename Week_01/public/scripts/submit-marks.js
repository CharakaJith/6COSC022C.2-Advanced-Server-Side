document.getElementById('marks-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  fetch('/api/module', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formObject),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
