$(document).ready(function() {
    const loginBtn = document.querySelector("#loginBtn");

    loginBtn.addEventListener("click", () => {
    loggedIn = true;
    sessionStorage.setItem("loggedIn", true);
    }); 
})
