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
  
      var reserve;
      var anonymous;
      var dateRequested;
      const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
      var seatNumbers = [];
      var name = "Anonymous";
      var profileLink = "";

      if (date !== "" && time !== "" && checkedCheckboxes != "") {
        reserve = confirm(`Reserve the selected seats on ${date} from ${time}?`);
  
        if(reserve == true){
          anonymous = confirm(`Do you want to reserve anonymously?`);
          if(anonymous == true){
            // code to store the email in database as anonymous
          } else {
            // code to store the logged in email in database
            name = "Muzan Kibutsuji";
            profileLink = "[student]-profile.html"
          }
          for(let i = 0; i < checkedId.length; i++){
            let btn = document.querySelector(`#${checkedId[i]}`);
            let labelElement = document.querySelector(`label[for="${checkedId[i]}"]`);
            labelElement.classList.replace("btn-outline-info", "btn-danger");
            btn.disabled = true;
            seatNumbers.push(labelElement.textContent);
          }  
          dateRequested = new Date()
          alert(`Seats reserved on ${dateRequested.getMonth()+1} / ${dateRequested.getDate()} / ${dateRequested.getFullYear()} Time: ${dateRequested.getHours()} : ${dateRequested.getMinutes()} : ${dateRequested.getSeconds()} `);
          
          // create a paragraph element

          for(s of seatNumbers){
            let parag = $("<p>");
            parag.addClass("text-white custom-font text-center");
            parag.html(`Seat #${s}: <a class="link-offset-3 link-offset-2-hover text-white" href="${profileLink}">${name}`);
            console.log(parag[0]); 
            reservedSeatsContainer.append(parag[0]);
          }
        }
      } else {
        alert('Please select a date and a time and the seats you want to reserve!');
      }  
      
    });
  })
  