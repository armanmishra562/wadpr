$(document).ready(function(){
  $('#registrationForm').submit(function(event){
      event.preventDefault(); // Prevent the form from submitting normally
      
      // Get form data
      var formData = {
          'name': $('#name').val(),
          'email': $('#email').val(),
          'password': $('#password').val()
      };

      // Send the data using AJAX
      $.ajax({
          type: 'POST',
          url: 'http://localhost/ajax/saveUserData.php', // Change this to your server-side script URL
          data: formData,
          dataType: 'json',
          encode: true
      })
      .done(function(data){
          // Redirect to the page showing list of registered users
          window.location.href = 'http://localhost/que2/userList.html'; // Change this to the URL of your user list page
      })
      .fail(function(data){
          console.log(data);
          alert('Registration failed. Please try again later.');
      });
  });
});
