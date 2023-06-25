$(document).ready(function(){
  // This function is for the back button in lab rooms
  $(".btn-back").click(function(){
    window.location.href = "index.html";
  });

  //set default value
  if(sessionStorage.getItem("view") == null){
    sessionStorage.setItem("view", "visitor");
  }
  view = sessionStorage.getItem("view");
  // navbar links
  const viewRoomsLink = $("#viewRoomsLink");
  const signInLink = $("#signInLink");
  const viewProfileLink = $("#viewProfileLink");
  const logoutBtn = $("#logoutBtn");

  // views links
  const techViewLink = $("#technicianViewLink");
  const studentViewLink = $("#studentViewLink");
  const visitorViewLink = $("#visitorViewLink");

  studentViewLink.on("click", function(){
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
  })

  if(view == "student"){
    signInLink.addClass("d-none");
    viewProfileLink.removeClass("d-none");
    logoutBtn.removeClass("d-none");
    studentViewLink.addClass("d-none");
    visitorViewLink.removeClass("d-none");
    techViewLink.removeClass("d-none");
  } else if(view == "tech") {
    signInLink.addClass("d-none");
    viewProfileLink.addClass("d-none");
    logoutBtn.removeClass("d-none");
    studentViewLink.removeClass("d-none");
    techViewLink.addClass("d-none");
    visitorViewLink.removeClass("d-none");
  } else if(view == "visitor"){
    signInLink.removeClass("d-none");
    viewProfileLink.addClass("d-none");
    logoutBtn.addClass("d-none");
    studentViewLink.removeClass("d-none");
    visitorViewLink.addClass("d-none");
    techViewLink.removeClass("d-none");
  }
})