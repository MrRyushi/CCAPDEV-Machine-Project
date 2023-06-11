function backToIndex(){
    window.location.href = "computer_labs.html";
}

const seatBtn = document.querySelectorAll(".seatBtn");
for(let i = 0; i < seatBtn.length + 1; i++){
    seatBtn[i].addEventListener("click", confirmReserve);
}

function confirmReserve(){
    var date = document.querySelector("#date").value;
    var time = document.querySelector("#time").value;
    var reserve = confirm(`Reseve this seat on ${date} at ${time}?`);
}

document.getElementById('date').valueAsDate = new Date();

