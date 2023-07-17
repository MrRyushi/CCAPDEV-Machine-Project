$(document).ready(function() {
  //back button
  /*$(".btn-back").click(function(){
    window.location.href = "home";
  });*/


  $(document).ready(function() {
    $(".btn-back-profile").click(function(){
      window.location.href = "/profile";
    });
    const searchResults = $('#searchResults');
  
    $("#search-bar").on('input', function() {
      const searchQuery = $(this).val().trim();
      console.log('input event triggered');
    
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
    });
  
    // Hide the search results initially
    searchResults.addClass("d-none");


    $.ajax({
      url: '/getReservations',
      method: 'POST',
      success: function(response) {
        // Handle the data received from the server
        console.log("response:", response);
        const cl01Array = response.cl01Array;
        const cl02Array = response.cl02Array;
        const cl03Array = response.cl03Array;
        // Use the arrays as needed
        console.log("cl01Array:", cl01Array);
        console.log("cl02Array:", cl02Array);
        console.log("cl03Array:", cl03Array);
        
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
          tabledata6.text(data.dateReq);
          tabledata8.text(data.date);
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
          tabledata6.text(data.dateReq);
          tabledata8.text(data.date);
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
          tabledata6.text(data.dateReq);
          tabledata8.text(data.date);
          tabledata10.text(data.time);
          
        }

      },
      error: function(error) {
        // Handle the error response from the server
        console.log('Error retrieving data:', error);
      }
    });
  });
  
  
  

  // Edit Profile Button Click Event
  $("#editProfileBtn").click(function() {
    $("#deleteUserBtn").addClass("d-none");
    $("#editProfileBtn").addClass("d-none");
    $("#saveBtn").removeClass("d-none");
    $("#editDescBtn").removeClass("d-none");
    $("#editPictureBtn").removeClass("d-none");
  });

  $("#editDescBtn").click(function() {
    // Get the current description text
    let currentDescription = $(".description p").text().trim();

    // Set the current description as the placeholder for the textarea
    $("#profileDescription").attr("placeholder", currentDescription);
    $("#profileDescription").val("");
    
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

  // Handle file upload change event
  $("#uploadPictureInput").change(function() {
    // Get the selected file
    let file = $(this).prop("files")[0];

    // Check if a file was selected
    if (file) {
      // Read the file as a data URL
      let reader = new FileReader();
      reader.onload = function(e) {
        // Update the profile picture
        $(".picture-container img").attr("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
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

  // Save Profile Picture Button Click Event
  $("#savePictureBtn").click(function() {
    // Save the profile picture changes

    // Show a success message to the user
    // alert("Profile picture saved successfully!");
    $("#savePictureBtn").addClass("d-none");
    $("#editPictureBtn").removeClass("d-none");
    $("#editDescBtn").removeClass("d-none");
    $("#saveBtn").removeClass("d-none");

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

  

  // navbar links
  const viewRoomsLink = $("#viewRoomsLink");
  const signInLink = $("#signInLink");
  const viewProfileLink = $("#viewProfileLink");
  const logoutBtn = $("#logoutBtn");

  // NAV BAR
  const view = sessionStorage.getItem("view");

  // PROFILE
  const deleteUserBtn = $("#deleteUserBtn");
  const editProfileBtn = $("#editProfileBtn");
  const saveBtn = $("#saveBtn");
  const editPictureBtn = $("#editPictureBtn");
  const editDescBtn = $("#editDescBtn");
  const saveDescBtn = $("#saveDescBtn");
  const savePictureBtn = $("#savePictureBtn");

  // reservations
  const editBtns = $(".edit-btn");

  // if(view == "student"){
  //   signInLink.addClass("d-none");
  //   viewProfileLink.removeClass("d-none");
  //   logoutBtn.removeClass("d-none");
  // } else if(view == "tech") {
  //   signInLink.addClass("d-none");
  //   viewProfileLink.addClass("d-none");
  //   logoutBtn.removeClass("d-none");

  //   deleteUserBtn.addClass("d-none");
  //   editProfileBtn.addClass("d-none");
  //   saveBtn.addClass("d-none");
  //   editPictureBtn.addClass("d-none");
  //   editDescBtn.addClass("d-none");
  //   saveDescBtn.addClass("d-none");
  //   savePictureBtn.addClass("d-none");
  // } else if(view == "visitor"){
  //   signInLink.removeClass("d-none");
  //   viewProfileLink.addClass("d-none");
  //   logoutBtn.addClass("d-none");

  //   deleteUserBtn.addClass("d-none");
  //   editProfileBtn.addClass("d-none");
  //   saveBtn.addClass("d-none");
  //   editPictureBtn.addClass("d-none");
  //   editDescBtn.addClass("d-none");
  //   saveDescBtn.addClass("d-none");
  //   savePictureBtn.addClass("d-none");

  //   for(e of editBtns){
  //     e.classList.add("d-none");
  //   }
  // }
});
