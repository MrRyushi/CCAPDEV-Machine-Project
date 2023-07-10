$(document).ready(function(){
  // This function is for the back button in lab rooms
  $.ajax({
    url: '/api/student-view',
    method: 'GET',
    success: function(response) {
      // Handle the data received from the server
      let accountType = response.accountType; // Access the accountType value
      //console.log('accountType: ' + accountType);

      const signInLink = $("#signInLink");
      const viewProfileLink = $("#viewProfileLink");
      const logoutBtn = $("#logoutBtn");
      const viewRoomsLink = $('#viewRoomLink');
      console.log(viewRoomsLink);
      let backHref = "home";

      if(accountType == "Student"){
        signInLink.addClass("d-none");
        viewProfileLink.removeClass("d-none");
        logoutBtn.removeClass("d-none");
        //studentViewLink.addClass("d-none");
        //visitorViewLink.removeClass("d-none");
        //techViewLink.removeClass("d-none");
        backHref = "student-view"
        viewRoomsLink.attr("href", "student-view");

      } else if(accountType == "Technician") {
        signInLink.addClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.removeClass("d-none");
        //studentViewLink.removeClass("d-none");
        //techViewLink.addClass("d-none");
        //visitorViewLink.removeClass("d-none");
        backHref = "technician-view"
        viewRoomsLink.attr("href", "technician-view");
      } else {
        signInLink.removeClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.addClass("d-none");
        //studentViewLink.removeClass("d-none");
        //visitorViewLink.addClass("d-none");
        //techViewLink.removeClass("d-none");
      }

      $(".btn-back").click(function(){
        window.location.href = backHref;
      });
    },
    error: function(error) {
      // Handle the error response from the server
      console.log('Error retrieving data:', error);
    }
  });

  // views links
  /*
  const techViewLink = $("#technicianViewLink");
  const studentViewLink = $("#studentViewLink");
  const visitorViewLink = $("#visitorViewLink");*/

  /*studentViewLink.on("click", function(){
    signInLink.addClass("d-none");
    viewProfileLink.removeClass("d-none");
    logoutBtn.removeClass("d-none");
    studentViewLink.addClass("d-none");
    visitorViewLink.removeClass("d-none");
    techViewLink.removeClass("d-none");
    sessionStorage.setItem("view", "student");
  })
  techViewLink.on("click", function(){
    signInLink.addClass("d-none");
    viewProfileLink.addClass("d-none");
    logoutBtn.removeClass("d-none");
    studentViewLink.removeClass("d-none");
    techViewLink.addClass("d-none");
    visitorViewLink.removeClass("d-none");
    sessionStorage.setItem("view", "tech");
  })

  visitorViewLink.on("click", function(){
    signInLink.removeClass("d-none");
    viewProfileLink.addClass("d-none");
    logoutBtn.addClass("d-none");
    studentViewLink.removeClass("d-none");
    visitorViewLink.addClass("d-none");
    techViewLink.removeClass("d-none");
    sessionStorage.setItem("view", "visitor");
  })*/
})