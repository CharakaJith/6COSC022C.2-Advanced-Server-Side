document.addEventListener('DOMContentLoaded', function () {
  // fetch data from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem('user'));

  // validate data
  if (userData) {
    // populate the user details
    document.getElementById('userId').textContent = userData.id;
    document.getElementById('userFirstName').textContent = userData.first_name;
    document.getElementById('userLastName').textContent = userData.last_name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userStatus').textContent = userData.user_status;
    document.getElementById('userCreatedAt').textContent = userData.created_at;
    document.getElementById('userUpdatedAt').textContent = userData.updated_at;
  } else {
    alert('No user data found. Please log in.');

    window.location.href = 'login.html';
  }
});
