$(document).ready(function(){
  // This function is for the back button in lab rooms
  $(".btn-back").click(function(){
    window.location.href = "computer_labs.html";
  });

  // This code is to generate the current date
  document.getElementById('date').valueAsDate = new Date();

  // The next lines of code is for reserving seats
  const form = document.querySelector('.reserve-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const checkedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    const checkedId = checkedCheckboxes.map((checkbox) => checkbox.id);
    var date = document.querySelector("#date").value;
    var time = document.querySelector("#time").value;
    let seats;

    // this for loop is to uncheck the boxes after selecting them
    for(let i = 0; i < checkedCheckboxes.length; i++){
      checkedCheckboxes[i].checked = false;
    }

    if (date !== "" && time !== "" && checkedCheckboxes != "") {
      reserve = confirm(`Reserve the selected seats on ${date} from ${time}?`);
      seats = null;

      if(reserve == true){
        for(let i = 0; i < checkedId.length; i++){
          let btn = document.querySelector(`#${checkedId[i]}`);
          let labelElement = document.querySelector(`label[for="${checkedId[i]}"]`);
          labelElement.classList.replace("btn-outline-info", "btn-danger");
          btn.disabled=true;
        }  
      }
    } else {
      alert('Please select a date and a time and the seats you want to reserve!');
    }  
    
  });
})
