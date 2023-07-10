$(document).ready(function() {
  // This code is to generate the current date
  document.getElementById('date').valueAsDate = new Date();

  // navbar links
  const signInLink = $("#signInLink");
  const viewProfileLink = $("#viewProfileLink");
  const logoutBtn = $("#logoutBtn");

  // NAV BAR
  let accountType;
  let userName;
  $.ajax({
    url: '/api/student-view',
    method: 'GET',
    success: function(response) {
      // Handle the data received from the server
      accountType = response.accountType; // Access the accountType value
      userName = response.userName;
      
        // reservation seats
      const resSeatsP = $(".resSeatsContainer p");
      let roomName = document.querySelector('#roomName').innerHTML.substring(14);
      let url;
      if (roomName == 'CL01') {
        url = '/api/cl01';
      } else if (roomName == 'CL02') {
        url = '/api/cl02';
      } else {
        url = '/api/cl03';
      }
      let allReservations = [];

      $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
          // Handle the data received from the server
          for (let key in response) {
            allReservations.push(response[key]);
          }
          // Use the data to reflect it on your HTML page
          updateReservedSeats(); // Call the function here, inside the success callback
        },
        error: function(error) {
          // Handle the error response from the server
          console.log('Error retrieving data:', error);
        }
      });

      function updateReservedSeats (){
        let dateSelected = document.querySelector('#date').value;
        let timeSelected = document.querySelector('#time').value;
        const reservedSeatsContainer = document.querySelector(".resSeatsContainer");

        reservedSeatsContainer.innerHTML = "";
        for(let i = 1; i <= 48; i++){
          if(i < 10){
            let btn = document.querySelector(`#btn-0${i}`);
            btn.disabled = false;
            let labelElement = document.querySelector(`label[for="btn-0${i}"]`);
            labelElement.classList.replace("btn-danger", "btn-outline-info"); 
          } else {
            let btn = document.querySelector(`#btn-${i}`);
            btn.disabled = false;
            let labelElement = document.querySelector(`label[for="btn-${i}"]`);
            labelElement.classList.replace("btn-danger", "btn-outline-info");
          }
        }

        for(reservation of allReservations){
          if(reservation.date == dateSelected && reservation.time == timeSelected){
              // display the reserved seats

              if(!Array.isArray(reservation.seatSelected)){
                reservation.seatSelected = [reservation.seatSelected];
              }
              
              for(b of reservation.seatSelected){
                let btn = document.querySelector(`#btn-${b}`);
                btn.disabled = true;
                let labelElement = document.querySelector(`label[for="btn-${b}"]`);
                labelElement.classList.replace("btn-outline-info", "btn-danger");


                let parag = $("<p>");
                parag.addClass("text-white custom-font text-center");
                parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white">${reservation.user}`);
                reservedSeatsContainer.append(parag[0]);
              
              }
          }
        }
      }
      
      document.addEventListener("DOMContentLoaded", updateReservedSeats);

      // Add event listeners to the date and time inputs
      document.querySelector('#date').addEventListener("change", updateReservedSeats);
      document.querySelector('#time').addEventListener("change", updateReservedSeats);



      if(accountType == "Student"){
        signInLink.addClass("d-none");
        viewProfileLink.removeClass("d-none");
        logoutBtn.removeClass("d-none");

        for(p of resSeatsP){
          p.classList.add("d-none");
        }

      } else if(accountType == "Technician") {
        signInLink.addClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.removeClass("d-none");

        for(p of resSeatsP){
          p.classList.add("d-none");
        }
      } else {
        signInLink.removeClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.addClass("d-none");
      }

      // The next lines of code is for reserving seats

      $('.reserve-form').submit((event) => {
        // VISITOR
        event.preventDefault();
        let roomName = document.querySelector('#roomName').innerHTML.substring(14);
        let roomNameObject = {name: "roomName", value: roomName};
        let user = userName;

        
        // STUDENT
        if (accountType == "Student") {
          // SEND DATA TO APP.JS
          var formData = $(event.target).serializeArray(); // Serialize the form data
          // Log the selected seat values
          var selectedSeats = formData
            .filter(function (item) {
              return item.name === 'seatSelected';
            })
            .map(function (item) {
              return item.value;
            });

           

          const checkedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
          const checkedId = checkedCheckboxes.map((checkbox) => checkbox.id);
          var date = document.querySelector("#date").value;
          var time = document.querySelector("#time").value;

          var reserve;
          var anonymous;
          var dateRequested;
          const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
          var seatNumbers = [];
          var name = "Anonymous";
          var profileLink = "";


          // this for loop is to uncheck the boxes after selecting them
          for(let i = 0; i < checkedCheckboxes.length; i++){
            checkedCheckboxes[i].checked = false;
          }
      
          if (date !== "" && time !== "" && checkedCheckboxes != "") {
            reserve = confirm(`Reserve the selected seats on ${date} from ${time}?`);
      
            if(reserve == true){
              anonymous = confirm(`Do you want to reserve anonymously [ok for YES | cancel for NO]?`);
              if(anonymous == true){
                user = 'Anonymous'

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
                  parag.html(`Seat #${s}: ${user}`);
                  reservedSeatsContainer.append(parag[0]);
                }
              } else {
                // code to store the logged in email in database
                name = user;
                profileLink = "profile.html"
                user = userName;
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
                  parag.html(`Seat #${s}: <a class="link-offset-3 link-offset-2-hover text-white" href="">${user}`);
                  reservedSeatsContainer.append(parag[0]);
                }
              }

              let viewObject = {name: "view", value: 'student'};
              let userObject = {name: "user", value: user};
              // CHANGE USER HERE WHEN LOGIN PAGE IS FINISHED
              // user = ...
  
              formData.push(viewObject);
              formData.push(roomNameObject);
              formData.push(userObject);
        
              // Perform any additional client-side actions or submit the form via AJAX
              $.ajax({
                type: 'POST',
                url: '/room',
                data: formData,
                success: function (response) {
                  // Handle the success response from the server
                },
                error: function (error) {
                  // Handle the error response from the server
                }
              });
            }

          } else {
            alert('Please select a date and a time and the seats you want to reserve!');
          }  
          
        }

        // TECHNICIAN
        else if(accountType == "Technician") {
          // SEND DATA TO APP.JS

          var formData = $(event.target).serializeArray(); // Serialize the form data
          // Log the selected seat values
          var selectedSeats = formData
            .filter(function (item) {
              return item.name === 'seatSelected';
            })
            .map(function (item) {
              return item.value;
            });


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
            anonymous = confirm('Does the student want to reserve anonymously [ok for YES | cancel for NO]?');
            if(anonymous == true){
              // code for storing anonymous instead of the email of student in database
              user = 'Anonymous';
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
                parag.html(`Seat #${s}: ${user}`);
                reservedSeatsContainer.append(parag[0]);
              }
              
              let viewObject = {name: "view", value: 'technician'};
              let userObject = {name: "user", value: user};
              // CHANGE USER HERE WHEN LOGIN PAGE IS FINISHED
              // user = ...

              formData.push(viewObject);
              formData.push(roomNameObject);
              formData.push(userObject);
        
              // Perform any additional client-side actions or submit the form via AJAX
              $.ajax({
                type: 'POST',
                url: '/room',
                data: formData,
                success: function (response) {
                  // Handle the success response from the server
                },
                error: function (error) {
                  // Handle the error response from the server
                }
              });

            } else {
              email = prompt(`Enter email of student:`);
              
              name = user;

              if(email === ""){
                alert('Please enter the email of the student!');
              }
              else if(email == null){
                //do nothing
              }
              else{
                // get account of user based on email
                $.ajax({
                  type: 'POST',
                  url: '/getAccount',
                  data: { email: email }, // Send the email data as an object
                  success: function (response) {
                    // Handle the success response from the server
                    if (response === null) {
                      alert('Email did not match anything in the database');
                    } else {
                      user = response.name;
                      
                      let viewObject = {name: "view", value: 'technician'};
                      let userObject = {name: "user", value: user};
                      // CHANGE USER HERE WHEN LOGIN PAGE IS FINISHED
                      // user = ...

                      formData.push(viewObject);
                      formData.push(roomNameObject);
                      formData.push(userObject);
                
                      // Perform any additional client-side actions or submit the form via AJAX
                      $.ajax({
                        type: 'POST',
                        url: '/room',
                        data: formData,
                        success: function (response) {
                          // Handle the success response from the server
                        },
                        error: function (error) {
                          // Handle the error response from the server
                        }
                      });

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
                        parag.html(`Seat #${s}: <a class="link-offset-3 link-offset-2-hover text-white" href="">${user}`);
                        reservedSeatsContainer.append(parag[0]);
                      }
                    }
                  },
                  error: function (error) {
                    // Handle the error response from the server
                    console.log('Error:', error);
                  }
                });
              }
            }

          } else {
            alert('Please select a date and a time and the seats you want to reserve!');
          }  
        } else {
          if(view == "visitor"){
            alert('Please sign in to reserve a seat.');
  
            var formData = $(event.target).serializeArray(); // Serialize the form data
            // Log the selected seat values
            var selectedSeats = formData
              .filter(function (item) {
                return item.name === 'seatSelected';
              })
              .map(function (item) {
                return item.value;
              });
  
              let viewObject = {name: "view", value: 'visitor'};
              formData.push(viewObject);
              formData.push(roomNameObject);
        
            // Perform any additional client-side actions or submit the form via AJAX
            $.ajax({
              type: 'POST',
              url: '/room',
              data: formData,
              success: function (response) {
                // Handle the success response from the server
              },
              error: function (error) {
                // Handle the error response from the server
              }
            });
          } 
        }
        //window.location.reload();
      });


        },
        error: function(error) {
          // Handle the error response from the server
          console.log('Error retrieving data:', error);
        }
      });

})
  