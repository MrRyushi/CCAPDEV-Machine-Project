$(document).ready(function(){
  
  // get account type data via ajax
  $.ajax({
    url: '/api/student-view',
    method: 'GET',
    success: function(response) {
      // access the accountType value
      let accountType = response.accountType; 

      // query selectors for the navbar elements
      const signInLink = $("#signInLink");
      const viewProfileLink = $("#viewProfileLink");
      const logoutBtn = $("#logoutBtn");
      const viewRoomsLink = $('#viewRoomLink');
      let backHref = "home";

      // if the account logged in is a student
      if(accountType == "Student"){
        signInLink.addClass("d-none");
        viewProfileLink.removeClass("d-none");
        logoutBtn.removeClass("d-none");
        backHref = "student-view"
        viewRoomsLink.attr("href", "student-view");

      // if the account logged in is a technician
      } else if(accountType == "Technician") {
        signInLink.addClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.removeClass("d-none");
        backHref = "technician-view"
        viewRoomsLink.attr("href", "technician-view");

        // // if the not yet logged in / visitor
      } else {
        signInLink.removeClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.addClass("d-none");
        backHref = "home";
      }

      // back button event listener
      $(".btn-back").click(function(){
        console.log("back: " + backHref);
        window.location.href = backHref;
      });
    },
    error: function(error) {
      // Handle the error response from the server
      console.log('Error retrieving data:', error);
    }
  });

  // this event listener is for when the user is a visitor
  $(".btn-back").click(function(){
    window.location.href = 'home';
  });
})