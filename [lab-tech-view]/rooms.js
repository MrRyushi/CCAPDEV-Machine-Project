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
  

      // this for loop is to uncheck the boxes after selecting them
      for(let i = 0; i < checkedCheckboxes.length; i++){
        checkedCheckboxes[i].checked = false;
      }
  
      var anonymous;
      const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
      var seatNumbers = [];
      var name = "Anonymous";
      var profileLink = "";

      if (date !== "" && time !== "" && checkedCheckboxes != "") {
        anonymous = confirm('Do you want to reserve anonymously?');
        if(anonymous == true){
          // code for storing anonymous instead of the email of student in database

          for(let i = 0; i < checkedId.length; i++){
            let btn = document.querySelector(`#${checkedId[i]}`);
            let labelElement = document.querySelector(`label[for="${checkedId[i]}"]`);
            labelElement.classList.replace("btn-outline-info", "btn-danger");
            btn.disabled=true;
            seatNumbers.push(labelElement.textContent);
          }

          for(s of seatNumbers){
            let parag = $("<p>");
            parag.addClass("text-white custom-font text-center");
            parag.html(`Seat #${s}: <a class="link-offset-3 link-offset-2-hover text-white" href="${profileLink}">${name}`);
            console.log(parag[0]); 
            reservedSeatsContainer.append(parag[0]);
          }
        } else {
          email = prompt(`Enter email of student:`);
          name = "Muzan Kibutsuji";
          profileLink = "[tech]-profile.html";

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
              seatNumbers.push(labelElement.textContent);
            }
            
              // create a paragraph element

            for(s of seatNumbers){
              let parag = $("<p>");
              parag.addClass("text-white custom-font text-center");
              parag.html(`Seat #${s}: <a class="link-offset-3 link-offset-2-hover text-white" href="${profileLink}">${name}`);
              console.log(parag[0]); 
              reservedSeatsContainer.append(parag[0]);
            }
          }
        }
      } else {
        alert('Please select a date and a time and the seats you want to reserve!');
      }  
      
    });
  })
  