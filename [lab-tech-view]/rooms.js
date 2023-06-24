$(document).ready(function(){
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
        email = prompt(`Enter email of student:`);
        seats = null;
  
        if(email === ""){
          alert('Please enter the email of the student!');
        }
        else if(email == null){
          //do nothing
        }
        else{
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
  