$(document).ready(function() {
  // Edit Profile Button Click Event
  $(".btn-edit-profile").click(function() {
    // Enable editing of the description
    $(".profile-description").prop("contenteditable", true);
    $(".profile-description").addClass("editable");

    // Show the profile picture upload button
    $(".btn-upload-picture").removeClass("d-none");
  });

  // Save Profile Button Click Event
  $(".btn-save-profile").click(function() {
    // Disable editing of the description
    $(".profile-description").prop("contenteditable", false);
