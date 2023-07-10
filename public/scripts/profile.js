$(document).ready(function() {
  //back button
  /*$(".btn-back").click(function(){
    window.location.href = "home";
  });*/

  $(".btn-back-profile").click(function(){
    window.location.href = "profile.html";
  });

  $("#search-bar").on('input', function() {
    const searchQuery = $(this).val().trim();
    const searchResults = $('#searchResults');
    console.log('input event triggered');
  
    $.ajax({
      url: '/search',
      method: 'POST',
      data: { query: searchQuery },
      dataType: 'json',
      success: function(response) {
        console.log('Search results:', response);
        searchResults.empty(); // Clear previous search results
  
        if (searchQuery === '') {
          return; // Exit early if search query is empty
        }
        
        if (response.length < 1) {
          searchResults.html('<p>No results found.</p>');
          return;
        }
  
        response.forEach((item, index) => {
          if (index > 0) searchResults.append('<hr>');
          searchResults.append(`<p>${item.name}</p>`);
        });
      },
      error: function(error) {
        console.error('Failed to retrieve search results:', error);
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
