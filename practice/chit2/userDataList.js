$(document).ready(function() {
    // Retrieve user data from local storage
    var userData = JSON.parse(localStorage.getItem('userData'));
  
    // Display user data in the list
    if (userData) {
      var userDataList = $('#userDataList');
      userData.forEach(function(user) {
        userDataList.append('<li class="list-group-item">Username: ' + user.username + ', Email: ' + user.email + '</li>');
      });
    }
  });
  