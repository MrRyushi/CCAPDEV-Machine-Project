$(document).ready(function() {
  const viewRoomLink = $('#viewRoomLink');
  
  viewRoomLink.on("click", () => {
    console.log("response");
    $.ajax({
      url: '/api/student-view',
      method: 'GET',
      success: function(response) {
        // access the data from response
        let accountType = response.accountType; 

        console.log(accountType);
        if(accountType == "Student"){
          viewRoomLink.attr("href", "student-view");
        } else if(accountType == "Technician"){
          viewRoomLink.attr("href", "technician-view");
        } else {
          viewRoomLink.attr("href", "home");
        }
      } 
    })  

  })
})