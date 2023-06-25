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
  
      var anonymous;

      // this for loop is to uncheck the boxes after selecting them
      for(let i = 0; i < checkedCheckboxes.length; i++){
        checkedCheckboxes[i].checked = false;
      }
  
      if (date !== "" && time !== "" && checkedCheckboxes != "") {
        anonymous = confirm('Do you want to reserve anonymously?');
        if(anonymous == true){
          // code for storing anonymous instead of the email of student in database

          for(let i = 0; i < checkedId.length; i++){
            let btn = document.querySelector(`#${checkedId[i]}`);
            let labelElement = document.querySelector(`label[for="${checkedId[i]}"]`);
            labelElement.classList.replace("btn-outline-info", "btn-danger");
            btn.disabled=true;
          }
        } else {
          email = prompt(`Enter email of student:`);

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
        }
        
      } else {
        alert('Please select a date and a time and the seats you want to reserve!');
      }  
      
    });
  })
  