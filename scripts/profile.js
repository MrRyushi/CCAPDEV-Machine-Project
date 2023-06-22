$(document).ready(function() {
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

});
