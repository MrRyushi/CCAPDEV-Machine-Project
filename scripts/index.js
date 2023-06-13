function backToIndex(){
    window.location.href = "computer_labs.html";
}

var reserve;

const seatBtn = document.querySelectorAll(".seatBtn");
for (let i = 0; i < seatBtn.length; i++) {
  seatBtn[i].addEventListener("click", confirmReserve.bind(null, seatBtn[i]));
}

function confirmReserve(button) {
  var date = document.querySelector("#date").value;
  var time = document.querySelector("#time").value;

  if (date !== "" && time !== "") {
    reserve = confirm(`Reserve this seat on ${date} at ${time}?`);
  } else {
    alert('Please enter a date and time!');
  }

  if (reserve === true) {
    // Change the color of the button
    button.classList.replace("btn-info", "btn-danger");
  }
}


document.getElementById('date').valueAsDate = new Date();


