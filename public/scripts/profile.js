  $(document).ready(function() {
    $(".btn-back-profile").click(function(){
      window.location.href = "/profile";
    });

    const searchResults = $('#searchResults');
  
      // Function to perform the search
  function performSearch(searchQuery) {
    if (searchQuery === '') {
      searchResults.addClass("d-none");
      searchResults.empty(); // Clear previous search results
      return; // Exit early if search query is empty
    }

    $.ajax({
      url: '/search',
      method: 'POST',
      data: { query: searchQuery },
      dataType: 'json',
      success: function(response) {
        console.log('Search results:', response);
        searchResults.empty(); // Clear previous search results

        if (response.length < 1) {
          searchResults.removeClass("d-none");
          searchResults.html('<p>No results found.</p>');
          return;
        }

        response.forEach((item) => {
          const profileLink = $('<a></a>')
            .text(item.name)
            .attr('href', '/profile/' + item._id); // Set the link URL to the profile-visit page with the ObjectId as a parameter

          const profileResult = $('<div></div>')
            .append(profileLink)
            .append('<hr>');

          searchResults.append(profileResult);
        });

        searchResults.removeClass("d-none"); // Show the search results
      },
      error: function(error) {
        console.error('Failed to retrieve search results:', error);
      }
    });
  }

  // Handle input event on the search bar
  $("#search-bar").on('input', function() {
    const searchQuery = $(this).val().trim();
    console.log('input event triggered');
    performSearch(searchQuery);
  });

  // Handle keypress event on the search bar
  $("#search-bar").on('keypress', function(event) {
    const searchQuery = $(this).val().trim();
    if (event.which === 13) { // Check if the key pressed is Enter (key code 13)
      event.preventDefault(); // Prevent the default behavior (form submission or redirect)
      console.log('Enter key pressed');
      performSearch(searchQuery); // Perform the search
    }
  });
  
    // Hide the search results initially
    searchResults.addClass("d-none");

    $.ajax({
      url: '/getReservations',
      method: 'POST',
      success: function(response) {
        // Handle the data received from the server
        const cl01Array = response.cl01Array;
        const cl02Array = response.cl02Array;
        const cl03Array = response.cl03Array;
        // Use the arrays as needed
        
        const reservationContainer = $('#reservationContainer');
        let reservationCount = 0;
        for(let data of cl01Array){
          let tableContainer = $('<div>');
          let table = $('<table>');
          let tbody  = $('<tbody>');
          let tableHeader = $('<th>');
          let editBtn = $('<button>');
          let deleteBtn = $('<button>');
          let cancelBtn = $('<button>');
          let saveBtn = $('<button>');

          reservationContainer.append(tableContainer);
          tableContainer.append(table);
          table.append(tableHeader);
          table.append(tbody);        
          reservationCount += 1;
          tableHeader.text(`Reservation ${reservationCount}`);
          tableHeader.append(editBtn);
          tableHeader.append(deleteBtn);
          tableHeader.append(cancelBtn);
          tableHeader.append(saveBtn);

          editBtn.text('Edit');
          deleteBtn.text('Delete');
          cancelBtn.text('Cancel');
          saveBtn.text('Save');

          tableContainer.addClass('container table-responsive col-xs-12 col-md-6');
          table.addClass('table table-primary table-hover table-striped-columns custom-font-content table-responsive');
          tableHeader.addClass('fs-3 bg-info-subtle p-2 text-primary');
          tableHeader.attr('colspan', '2');
          editBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success edit-btn");
          deleteBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger delete-btn d-none");
          cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
          saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");

          let tableRow2 = $('<tr>');
          let tableRow3 = $('<tr>');
          let tableRow4 = $('<tr>');
          let tableRow5 = $('<tr>');
          let tableRow6 = $('<tr>');
          let tabledata1 = $('<td>');
          let tabledata2 = $('<td>');
          let tabledata3 = $('<td>');
          let tabledata4 = $('<td>');
          let tabledata5 = $('<td>');
          let tabledata6 = $('<td>');
          let tabledata7 = $('<td>');
          let tabledata8 = $('<td>');
          let tabledata9 = $('<td>');
          let tabledata10 = $('<td>');
          tbody.append(tableRow2);
          tbody.append(tableRow3);
          tbody.append(tableRow4);
          tbody.append(tableRow5);
          tbody.append(tableRow6);
          tableRow2.append(tabledata1);
          tableRow2.append(tabledata2);
          tableRow3.append(tabledata3);
          tableRow3.append(tabledata4);
          tableRow4.append(tabledata5);
          tableRow4.append(tabledata6);
          tableRow5.append(tabledata7);
          tableRow5.append(tabledata8);
          tableRow6.append(tabledata9);
          tableRow6.append(tabledata10);

          tabledata1.addClass('fixed-width-cell');
          tabledata3.addClass('fixed-width-cell');
          tabledata5.addClass('fixed-width-cell');
          tabledata7.addClass('fixed-width-cell');
          tabledata9.addClass('fixed-width-cell');

          tbody.addClass('table-group-divider');
          tabledata1.addClass('light-bold');
          tabledata3.addClass('light-bold');
          tabledata5.addClass('light-bold');
          tabledata7.addClass('light-bold');
          tabledata9.addClass('light-bold');
          tabledata2.addClass('room-value');
          tabledata4.addClass('seatnum-value');
          tabledata6.addClass('datereq-value');
          tabledata8.addClass('dateres-value');
          tabledata10.addClass('timeres-value');

          tabledata1.text('CyberLab Room:')
          tabledata3.text('Seat numbers:');
          tabledata5.text('Date and Time of Request:');
          tabledata7.text('Date of Reservation:');
          tabledata9.text('Time Slot of Reservation:');
          tabledata2.text('CL01');
          tabledata4.text(data.seatSelected.toString());

          let month;
          switch(data.dateReq.substring(5, 7)){
            case '01': month="January"; break;
            case '02': month="February"; break;
            case '03': month="March"; break;
            case '04': month="April"; break;
            case '05': month="May"; break;
            case '06': month="June"; break;
            case '07': month="July"; break;
            case '08': month="August"; break;
            case '09': month="September"; break;
            case '10': month="October"; break;
            case '11': month="November"; break;
            case '12': month="December"; break;
          }

          let dateRequested = month + " " + data.dateReq.substring(8, 10) + ", " + data.dateReq.substring(0, 4) + " Time: " +
          data.dateReq.substring(11, 16);

          tabledata6.text(dateRequested);
          
          month;
          switch(data.date.substring(5, 7)){
            case '01': month="January"; break;
            case '02': month="February"; break;
            case '03': month="March"; break;
            case '04': month="April"; break;
            case '05': month="May"; break;
            case '06': month="June"; break;
            case '07': month="July"; break;
            case '08': month="August"; break;
            case '09': month="September"; break;
            case '10': month="October"; break;
            case '11': month="November"; break;
            case '12': month="December"; break;
          }

          let dateReservation = month + " " + data.date.substring(8, 10) + ", " + data.date.substring(0, 4);
          

          tabledata8.text(dateReservation);
          tabledata10.text(data.time);
          
        }

        for(let data of cl02Array){
          let tableContainer = $('<div>');
          let table = $('<table>');
          let tbody  = $('<tbody>');
          let tableHeader = $('<th>');
          tableHeader.html(`Reservation ${reservationCount}`);
          let editBtn = $('<button>');
          let deleteBtn = $('<button>');
          let cancelBtn = $('<button>');
          let saveBtn = $('<button>');

          reservationContainer.append(tableContainer);
          tableContainer.append(table);
          table.append(tableHeader);
          table.append(tbody);        
          reservationCount += 1;
          tableHeader.text(`Reservation ${reservationCount}`);
          tableHeader.append(editBtn);
          tableHeader.append(deleteBtn);
          tableHeader.append(cancelBtn);
          tableHeader.append(saveBtn);

          tableContainer.addClass('container table-responsive col-xs-12 col-md-6');
          table.addClass('table table-primary table-hover table-striped-columns custom-font-content table-responsive');
          tableHeader.addClass('fs-3 bg-info-subtle p-2 text-primary');
          tableHeader.attr('colspan', '2');
          editBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success edit-btn");
          deleteBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger delete-btn d-none");
          cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
          saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");

          editBtn.text('Edit');
          deleteBtn.text('Delete');
          cancelBtn.text('Cancel');
          saveBtn.text('Save');

          let tableRow2 = $('<tr>');
          let tableRow3 = $('<tr>');
          let tableRow4 = $('<tr>');
          let tableRow5 = $('<tr>');
          let tableRow6 = $('<tr>');
          let tabledata1 = $('<td>');
          let tabledata2 = $('<td>');
          let tabledata3 = $('<td>');
          let tabledata4 = $('<td>');
          let tabledata5 = $('<td>');
          let tabledata6 = $('<td>');
          let tabledata7 = $('<td>');
          let tabledata8 = $('<td>');
          let tabledata9 = $('<td>');
          let tabledata10 = $('<td>');
          tbody.append(tableRow2);
          tbody.append(tableRow3);
          tbody.append(tableRow4);
          tbody.append(tableRow5);
          tbody.append(tableRow6);
          tableRow2.append(tabledata1);
          tableRow2.append(tabledata2);
          tableRow3.append(tabledata3);
          tableRow3.append(tabledata4);
          tableRow4.append(tabledata5);
          tableRow4.append(tabledata6);
          tableRow5.append(tabledata7);
          tableRow5.append(tabledata8);
          tableRow6.append(tabledata9);
          tableRow6.append(tabledata10);

          tabledata1.addClass('fixed-width-cell');
          tabledata3.addClass('fixed-width-cell');
          tabledata5.addClass('fixed-width-cell');
          tabledata7.addClass('fixed-width-cell');
          tabledata9.addClass('fixed-width-cell');

          tbody.addClass('table-group-divider');
          tabledata1.addClass('light-bold');
          tabledata3.addClass('light-bold');
          tabledata5.addClass('light-bold');
          tabledata7.addClass('light-bold');
          tabledata9.addClass('light-bold');
          tabledata2.addClass('room-value');
          tabledata4.addClass('seatnum-value');
          tabledata6.addClass('datereq-value');
          tabledata8.addClass('dateres-value');
          tabledata10.addClass('timeres-value');

          tabledata1.text('CyberLab Room:')
          tabledata3.text('Seat numbers:');
          tabledata5.text('Date and Time of Request:');
          tabledata7.text('Date of Reservation:');
          tabledata9.text('Time Slot of Reservation:');
          tabledata2.text('CL02');
          tabledata4.text(data.seatSelected.toString());
          let month;
          switch(data.dateReq.substring(5, 7)){
            case '01': month="January"; break;
            case '02': month="February"; break;
            case '03': month="March"; break;
            case '04': month="April"; break;
            case '05': month="May"; break;
            case '06': month="June"; break;
            case '07': month="July"; break;
            case '08': month="August"; break;
            case '09': month="September"; break;
            case '10': month="October"; break;
            case '11': month="November"; break;
            case '12': month="December"; break;
          }

          let dateRequested = month + " " + data.dateReq.substring(8, 10) + ", " + data.dateReq.substring(0, 4) + " Time: " +
          data.dateReq.substring(11, 16);

          tabledata6.text(dateRequested);
          
          month;
          switch(data.date.substring(5, 7)){
            case '01': month="January"; break;
            case '02': month="February"; break;
            case '03': month="March"; break;
            case '04': month="April"; break;
            case '05': month="May"; break;
            case '06': month="June"; break;
            case '07': month="July"; break;
            case '08': month="August"; break;
            case '09': month="September"; break;
            case '10': month="October"; break;
            case '11': month="November"; break;
            case '12': month="December"; break;
          }

          let dateReservation = month + " " + data.date.substring(8, 10) + ", " + data.date.substring(0, 4);
          

          tabledata8.text(dateReservation);
          tabledata10.text(data.time);
          
        }

        for(let data of cl03Array){
          let tableContainer = $('<div>');
          let table = $('<table>');
          let tbody  = $('<tbody>');
          let tableHeader = $('<th>');
         // let title = $('<p>');
          let editBtn = $('<button>');
          let deleteBtn = $('<button>');
          let cancelBtn = $('<button>');
          let saveBtn = $('<button>');

          reservationContainer.append(tableContainer);
          tableContainer.append(table);
          table.append(tableHeader);
          table.append(tbody);        
          reservationCount += 1;
          tableHeader.html(`Reservation ${reservationCount}`);
          tableHeader.append(editBtn);
          tableHeader.append(deleteBtn);
          tableHeader.append(cancelBtn);
          tableHeader.append(saveBtn);

          editBtn.text('Edit');
          deleteBtn.text('Delete');
          cancelBtn.text('Cancel');
          saveBtn.text('Save');

          tableContainer.addClass('container table-responsive col-xs-12 col-md-6');
          table.addClass('table table-primary table-hover table-striped-columns custom-font-content table-responsive');
          tableHeader.addClass('fs-3 bg-info-subtle p-2 text-primary');
          tableHeader.attr('colspan', '2');
          editBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success edit-btn");
          deleteBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger delete-btn d-none");
          cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
          saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");

          let tableRow2 = $('<tr>');
          let tableRow3 = $('<tr>');
          let tableRow4 = $('<tr>');
          let tableRow5 = $('<tr>');
          let tableRow6 = $('<tr>');
          let tabledata1 = $('<td>');
          let tabledata2 = $('<td>');
          let tabledata3 = $('<td>');
          let tabledata4 = $('<td>');
          let tabledata5 = $('<td>');
          let tabledata6 = $('<td>');
          let tabledata7 = $('<td>');
          let tabledata8 = $('<td>');
          let tabledata9 = $('<td>');
          let tabledata10 = $('<td>');
          tbody.append(tableRow2);
          tbody.append(tableRow3);
          tbody.append(tableRow4);
          tbody.append(tableRow5);
          tbody.append(tableRow6);
          tableRow2.append(tabledata1);
          tableRow2.append(tabledata2);
          tableRow3.append(tabledata3);
          tableRow3.append(tabledata4);
          tableRow4.append(tabledata5);
          tableRow4.append(tabledata6);
          tableRow5.append(tabledata7);
          tableRow5.append(tabledata8);
          tableRow6.append(tabledata9);
          tableRow6.append(tabledata10);

          tabledata1.addClass('fixed-width-cell');
          tabledata3.addClass('fixed-width-cell');
          tabledata5.addClass('fixed-width-cell');
          tabledata7.addClass('fixed-width-cell');
          tabledata9.addClass('fixed-width-cell');

          tbody.addClass('table-group-divider');
          tabledata1.addClass('light-bold');
          tabledata3.addClass('light-bold');
          tabledata5.addClass('light-bold');
          tabledata7.addClass('light-bold');
          tabledata9.addClass('light-bold');
          tabledata2.addClass('room-value');
          tabledata4.addClass('seatnum-value');
          tabledata6.addClass('datereq-value');
          tabledata8.addClass('dateres-value');
          tabledata10.addClass('timeres-value');

          tabledata1.text('CyberLab Room:')
          tabledata3.text('Seat numbers:');
          tabledata5.text('Date and Time of Request:');
          tabledata7.text('Date of Reservation:');
          tabledata9.text('Time Slot of Reservation:');
          tabledata2.text('CL03');
          tabledata4.text(data.seatSelected.toString());

          let month;
          switch(data.dateReq.substring(5, 7)){
            case '01': month="January"; break;
            case '02': month="February"; break;
            case '03': month="March"; break;
            case '04': month="April"; break;
            case '05': month="May"; break;
            case '06': month="June"; break;
            case '07': month="July"; break;
            case '08': month="August"; break;
            case '09': month="September"; break;
            case '10': month="October"; break;
            case '11': month="November"; break;
            case '12': month="December"; break;
          }

          let dateRequested = month + " " + data.dateReq.substring(8, 10) + ", " + data.dateReq.substring(0, 4) + " Time: " +
          data.dateReq.substring(11, 16);

          tabledata6.text(dateRequested);
          
          month;
          switch(data.date.substring(5, 7)){
            case '01': month="January"; break;
            case '02': month="February"; break;
            case '03': month="March"; break;
            case '04': month="April"; break;
            case '05': month="May"; break;
            case '06': month="June"; break;
            case '07': month="July"; break;
            case '08': month="August"; break;
            case '09': month="September"; break;
            case '10': month="October"; break;
            case '11': month="November"; break;
            case '12': month="December"; break;
          }

          let dateReservation = month + " " + data.date.substring(8, 10) + ", " + data.date.substring(0, 4);
          

          tabledata8.text(dateReservation);
          tabledata10.text(data.time);
          
        }

      },
      error: function(error) {
        // Handle the error response from the server
        console.log('Error retrieving data:', error);
      }
    });
 
  // Edit Profile Button Click Event
  $("#editProfileBtn").click(function() {
    $("#deleteUserBtn").addClass("d-none");
    $("#editProfileBtn").addClass("d-none");
    $("#saveBtn").removeClass("d-none");
    $("#editDescBtn").removeClass("d-none");
    $("#editPictureBtn").removeClass("d-none");
  });

  $("#deleteUserBtn").click(function() {
    // Show a confirmation dialog to confirm the deletion
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Send an AJAX request to the server to delete the user
      $.ajax({
        url: "/profile/delete-user",
        method: "POST",
        success: function(response) {
          // Handle the success response
          console.log("User deleted successfully");
          window.location.href = "/profile/logout"; // Redirect the user to the logout page
        },
        error: function(error) {
          // Handle the error response
          console.error("Failed to delete user:", error);
          // Optionally, you can display an error message to the user on the current page
        }
      });
    }
  });
  

  $("#editDescBtn").click(function() {
    // Get the current description text
    let currentDescription = $(".description p").text().trim();

    // Set the current description as the value for the textarea
    $("#profileDescription").val(currentDescription);
    
    // Toggle visibility of the elements
    $(".description").addClass("d-none");
    $("#profileDescription").removeClass("d-none");
    $("#saveDescBtn").removeClass("d-none");
    $("#saveBtn").addClass("d-none");
    $("#editDescBtn").addClass("d-none");
    $("#editPictureBtn").addClass("d-none");
  });

  $("#editPictureBtn").click(function() {
    $("#savePictureBtn").removeClass("d-none");
    $("#editDescBtn").addClass("d-none");
    $("#editPictureBtn").addClass("d-none");
    $("#saveBtn").addClass("d-none");
  
    $("#uploadPictureInput").click();
  });
  
  $("#uploadPictureInput").change(function() {
    if (this.files && this.files[0]) {
      let reader = new FileReader();
  
      reader.onload = function(e) {
        $("#profilePicture").attr("src", e.target.result);
      };
  
      reader.readAsDataURL(this.files[0]);
    }
  });
  
// Save Profile Picture Button Click Event
$("#savePictureBtn").click(function() {
  let file = $("#uploadPictureInput").prop("files")[0];

  if (file) {
    let formData = new FormData();
    formData.append("profilePicture", file);

    $.ajax({
      url: "/profile/update-profile-picture",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        console.log("Profile picture saved successfully!");

        window.location.href = "/profile"; // reload page
      },
      error: function(error) {
        console.error("Failed to save profile picture:", error);
      }
    });
  }

  $("#savePictureBtn").addClass("d-none");
    $("#editPictureBtn").removeClass("d-none");
    $("#editDescBtn").removeClass("d-none");
    $("#saveBtn").removeClass("d-none");
});


  // Save Description Button Click Event
  $("#saveDescBtn").click(function() {
    // Get the new description from the textarea
    let newDescription = $("#profileDescription").val();

    // Check if the new description is not empty
    if (newDescription.trim() !== "") {
      // Update the profile description
      $(".description p").text(newDescription);

      $.ajax({
        url: "/profile/update-description",
        method: "POST",
        data: { description: newDescription },
        success: function(response) {
          // Handle the success response from the server
          console.log("Profile description saved successfully!");
        },
        error: function(error) {
          // Handle the error response from the server
          console.error("Failed to save profile description:", error);
        }
      });
    }

      // Toggle visibility of the elements
      $(".description").removeClass("d-none");
      $("#profileDescription").addClass("d-none");
      $("#saveDescBtn").addClass("d-none");
      $("#editDescBtn").removeClass("d-none");
      $("#editPictureBtn").removeClass("d-none");
      $("#saveBtn").removeClass("d-none")
      // Show a success message to the user
      // alert("Description saved successfully!");
    });


  // Main Save Button Click Event
  $("#saveBtn").click(function() {
    // Return to regular screen

    // Toggle visibility of the elements
    $(".description").removeClass("d-none");
    $("#profileDescription").addClass("d-none");
    $("#saveDescBtn").addClass("d-none");
    $("#editDescBtn").addClass("d-none");
    $("#editPictureBtn").addClass("d-none");
    $("#editProfileBtn").removeClass("d-none");
    $("#deleteUserBtn").removeClass("d-none");
    $("#saveBtn").addClass("d-none");
  });

  
});