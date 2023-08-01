$(document).ready(function() {
  // This code is to generate the current date
  document.getElementById('date').valueAsDate = new Date();

  // navbar links
  const signInLink = $("#signInLink");
  const viewProfileLink = $("#viewProfileLink");
  const logoutBtn = $("#logoutBtn");

  // NAV BAR
  let accountType = 'visitor';
  let userName;
  let email

  // get the reservations list depending on the room
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

  // ajax request to get the reservations in the selected room
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

  // function to update reserved seats from data in database
  function updateReservedSeats (){
    let dateSelected = document.querySelector('#date').value;
    let timeSelected = document.querySelector('#time').value;
    const reservedSeatsContainer = document.querySelector(".resSeatsContainer");

    reservedSeatsContainer.innerHTML = "";
    // set first all buttons to blue and enable them
    for(let i = 1; i <= 48; i++){
      if(i < 10){
        let btn = document.querySelector(`#btn-0${i}`);
        btn.disabled = false;
        btn.classList.replace("btn-danger", "btn-outline-info"); 
      } else {
        let btn = document.querySelector(`#btn-${i}`);
        btn.disabled = false;
        btn.classList.replace("btn-danger", "btn-outline-info");
      }
    }

    // then set reserved seats to red and disable them
    allReservations.sort((a, b) => {
      if ( a.seatSelected < b.seatSelected ){
        return -1;
      }
      if ( a.seatSelected > b.seatSelected ){
        return 1;
      }
      return 0;
    })
    
    let allStudents = [];
    $.ajax({
      url: '/get-all-students',
      method: 'POST',
      success: function(response) {
          for(reservation of allReservations){
            array = reservation.time.split(/,/);
            for(time of array){
              if(reservation.date == dateSelected && time == timeSelected){
                // display the reserved seats
                
                b = reservation.seatSelected

                let btn = document.querySelector(`#btn-${b}`);
                btn.disabled = true;
                btn.classList.replace("btn-outline-info", "btn-danger");

                let objectId;
            
                for(student of response){
                  if(reservation.email == student.email){
                    objectId = student._id;
                  }
                }
                
                let parag;
                if(reservation.user != "Anonymous" && reservation.email != ""){
                  parag = $("<p>");
                  parag.addClass("text-white custom-font text-center");
                  parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white" href="/profile/${objectId}">${reservation.user}`);
                } else {
                  parag = $("<p>");
                  parag.addClass("text-white custom-font text-center");
                  parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white">${reservation.user}`);
                }
                reservedSeatsContainer.append(parag[0]);
              }
            }
          }
      },
      error: function(error) {
        // Handle the error response from the server
        console.log('Error retrieving data:', error);
      }
    })
  }

  // this is for when the page is loaded, the reserved seats will appear immediately
  document.addEventListener("DOMContentLoaded", updateReservedSeats);

  // Add event listeners to the date and time inputs
  document.querySelector('#date').addEventListener("change", updateReservedSeats);
  document.querySelector('#time').addEventListener("change", updateReservedSeats);

  function areTimeSlotsConsecutive(timeSlots) {
    if (timeSlots.length === 0) {
      console.log("only 1 time indicated");
      return false;
    }
  
    timeSlots.sort();
    let i = 1;
    let a;
    //console.log(timeSlots[i].substring(0,5));
    for(let j = 0; j < timeSlots.length - 1; j++){
      a = timeSlots[j].substring(9);
      console.log(timeSlots[j] + " == " + timeSlots[i]);
      console.log(a + " == " + timeSlots[i].substring(0, 5));
      if(a != timeSlots[i].substring(0, 5)) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  console.log(accountType);
  if(accountType == 'visitor'){
    signInLink.removeClass("d-none");
    viewProfileLink.addClass("d-none");
    logoutBtn.addClass("d-none");
  }
  // ajax request to get the account type of the user
  $.ajax({
    url: '/api/student-view',
    method: 'GET',
    success: function(response) {
      // Handle the data received from the server
      accountType = response.accountType; // Access the accountType value
      userName = response.userName;
      email = response.email;
      
      console.log("account type: " + accountType);
      // change the nav bar depending on the account type of the student
      if(accountType == "Student"){
        // use dnone to remove certain links and add certain links
        signInLink.addClass("d-none");
        viewProfileLink.removeClass("d-none");
        logoutBtn.removeClass("d-none");

        // remove the paragraph elements of reservation seats container using dnone
        for(p of resSeatsP){
          p.classList.add("d-none");
        }

      } else if(accountType == "Technician") {
        // use dnone to remove certain links and add certain links
        signInLink.addClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.removeClass("d-none");

        // remove the paragraph elements of reservation seats container using dnone
        for(p of resSeatsP){
          p.classList.add("d-none");
        }
      } else {
         // use dnone to remove certain links and add certain links
        signInLink.removeClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.addClass("d-none");
      }

      // -- RESERVING A SEAT -- 
      // when a seat button is clicked
      $('.seatBtn').click(function(event) {
        event.preventDefault();
        let thisBtn = $(this);
      
        /// get the time slots selected
        var checkedTimeSlots = [];
        $('.form-check-input:checked').each(function() {
          var timeSlot = $(this).val();
          checkedTimeSlots.push(timeSlot);
        });



        if(checkedTimeSlots.length == 0){
          alert('Please select the time slot you want to reserve');
          return
        } else if (!areTimeSlotsConsecutive(checkedTimeSlots)) {
          alert('You can only reserve consecutive time slots.');
          return;
        } else {
          // STUDENT

          // create formData of objects
          var formData = []
          if (accountType == "Student") {

            // variables when reserving
            var anonymous; // boolean for anonymous or not
            var dateRequested; // variable for the date requested
            var profileLink = ""; // variable for the profile link of user

            // get the container for reserved seats display
            const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
          
            // ask the user if they want to be anonymous
            anonymous = confirm(`Do you want to reserve anonymously?`);
            if(anonymous == true){
              // set username to anonymous
              userName = 'Anonymous'
            } else {
              // profileLink = "profile.html" FIX THIS
            }

            // set the seat button to disabled
            //thisBtn.removeClass("btn-outline-info").addClass("btn-danger");
            //thisBtn.attr("disabled", "disabled");
    
            // alert the user that the seat was successfully reserved
            dateRequested = new Date()
            
            // create a paragraph element and display it
            //let parag = $("<p>");
           // parag.addClass("text-white custom-font text-center");
            //parag.html(`Seat #${thisBtn.val()}: <a class="link-offset-3 link-offset-2-hover text-white" href="">${userName}`);
           // reservedSeatsContainer.append(parag[0]);

            // get the current date
            let date = new Date();
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');

            // form the date requested
            let dateReq = `${year}-${month}-${day}T${hours}:${minutes}`;

            // get room name and create room object
            let roomName = document.querySelector('#roomName').innerHTML.substring(14);

            // get date selected
            let dateSelected = document.querySelector('#date').value;
                      
            console.log(checkedTimeSlots);
            let found = false;
            for(reservation of allReservations){
              let timeData = reservation.time.split(/,/);
             
              //console.log(`${currDateRes} ${res.date} == ${currSeatnum} ${res.seatSelected}`);
              if(dateSelected == reservation.date && thisBtn.val() == reservation.seatSelected){
                timeData = reservation.time.split(/,/);
  
                for(time of checkedTimeSlots){
                  
                  
                  for(data of timeData){
                    console.log(time + " : " + data);
                    if(time == data){
                      found = true;
                    }
                  }
                }
              }
          
            }

            if(found){
              alert('One of the time slot is already occupied');
            } else {
              alert(`Reservation Successful`);
                // create objects that will be stored in the database
              let seatSelectedObject = {name: 'seatSelected', value: thisBtn.val()};
              let timeObject = {name: 'time', value: checkedTimeSlots};
              let dateObject = {name: 'date', value: dateSelected};
              let viewObject = {name: "view", value: 'student'};
              let roomNameObject = {name: "roomName", value: roomName};
              let userObject = {name: "user", value: userName};
              let emailObject = {name: 'email', value: email};
              let dateReqObject = {name: 'dateReq', value: dateReq};
              
              // push the objects in the array
              formData.push(seatSelectedObject);
              formData.push(timeObject);
              formData.push(dateObject);
              formData.push(viewObject);
              formData.push(roomNameObject);
              formData.push(userObject);
              formData.push(emailObject);
              formData.push(dateReqObject);

              // send data to roomsRouter.js
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

          // TECHNICIAN
          else if(accountType == "Technician") {
            // variables when reserving
            var anonymous; // boolean for anonymous or not
            var profileLink = ""; // variable for the profile link of user

            // get the container for reserved seats display
            const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
          
            // ask the user if they want to be anonymous
            anonymous = confirm('Does the student want to reserve anonymously?');
            if(anonymous == true){
              userName = 'Anonymous'
              // set the seat button to disabled
             // thisBtn.removeClass("btn-outline-info").addClass("btn-danger");
             // thisBtn.attr("disabled", "disabled");
      
              // alert the user that the seat was successfully reserved
              
              // create a paragraph element and display it
              //let parag = $("<p>");
              //parag.addClass("text-white custom-font text-center");
              //parag.html(`Seat #${thisBtn.val()}: <a class="link-offset-3 link-offset-2-hover text-white" href="">${userName}`);
             // reservedSeatsContainer.append(parag[0]);
                
              // get the current date
              let date = new Date();
              let year = date.getFullYear();
              let month = (date.getMonth() + 1).toString().padStart(2, '0');
              let day = date.getDate().toString().padStart(2, '0');
              let hours = date.getHours().toString().padStart(2, '0');
              let minutes = date.getMinutes().toString().padStart(2, '0');

              // form the date requested
              let dateReq = `${year}-${month}-${day}T${hours}:${minutes}`;

              // get room name and create room object
              let roomName = document.querySelector('#roomName').innerHTML.substring(14);

              // get date selected
              let dateSelected = document.querySelector('#date').value;

              let found = false;
            for(reservation of allReservations){
              let timeData = reservation.time.split(/,/);
             
              //console.log(`${currDateRes} ${res.date} == ${currSeatnum} ${res.seatSelected}`);
              if(dateSelected == reservation.date && thisBtn.val() == reservation.seatSelected){
                timeData = reservation.time.split(/,/);
  
                for(time of checkedTimeSlots){
                  
                  
                  for(data of timeData){
                    console.log(time + " : " + data);
                    if(time == data){
                      found = true;
                    }
                  }
                }
              }
          
            }

            if(found){
              alert('One of the time slot is already occupied');
            } else {
              alert(`Reservation Successful`);

              // create objects that will be stored in the database
              let seatSelectedObject = {name: 'seatSelected', value: thisBtn.val()};
              let timeObject = {name: 'time', value: checkedTimeSlots};
              let dateObject = {name: 'date', value: dateSelected};
              let viewObject = {name: "view", value: 'student'};
              let roomNameObject = {name: "roomName", value: roomName};
              let userObject = {name: "user", value: userName};
              let emailObject = {name: 'email', value: email};
              let dateReqObject = {name: 'dateReq', value: dateReq};
              
              // push the objects in the array
              formData.push(seatSelectedObject);
              formData.push(timeObject);
              formData.push(dateObject);
              formData.push(viewObject);
              formData.push(roomNameObject);
              formData.push(userObject);
              formData.push(emailObject);
              formData.push(dateReqObject);

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
              // get name of user
              let name = prompt(`Enter name of student:`);
              if(name === ""){
                alert('Please enter the name of the student!');
              }
              else if(name == null){
                //do nothing
              }
              else{
                // get account of user based on email via ajax
                /*$.ajax({
                  type: 'POST',
                  url: '/getAccount',
                  data: { name: name }, // Send the email data as an object
                  success: function (response) {
                    // Handle the success response from the server
                    if (response === null) {
                      alert('Email did not match anything in the database');
                    } else {
                      userName = response.name;*/

                      // set the seat button to disabled
                      //thisBtn.removeClass("btn-outline-info").addClass("btn-danger");
                     // thisBtn.attr("disabled", "disabled");
              
                      // alert the user that the seat was successfully reserved
                      dateRequested = new Date()
                      alert(`Reservation Successful`);
                      
                      // create a paragraph element and display it
                     // let parag = $("<p>");
                     // parag.addClass("text-white custom-font text-center");
                     // parag.html(`Seat #${thisBtn.val()}: <a class="link-offset-3 link-offset-2-hover text-white" href="">${userName}`);
                      //reservedSeatsContainer.append(parag[0]);

                      userName = response.name;
                      
                      // get the current date
                      let date = new Date();
                      let year = date.getFullYear();
                      let month = (date.getMonth() + 1).toString().padStart(2, '0');
                      let day = date.getDate().toString().padStart(2, '0');
                      let hours = date.getHours().toString().padStart(2, '0');
                      let minutes = date.getMinutes().toString().padStart(2, '0');
                      let email = "";

                      // form the date requested
                      let dateReq = `${year}-${month}-${day}T${hours}:${minutes}`;

                      // get room name and create room object
                      let roomName = document.querySelector('#roomName').innerHTML.substring(14);

                      // get date selected
                      let dateSelected = document.querySelector('#date').value;

                      // create objects that will be stored in the database
                      let seatSelectedObject = {name: 'seatSelected', value: thisBtn.val()};
                      let timeObject = {name: 'time', value: checkedTimeSlots};
                      let dateObject = {name: 'date', value: dateSelected};
                      let viewObject = {name: "view", value: 'student'};
                      let roomNameObject = {name: "roomName", value: roomName};
                      let userObject = {name: "user", value: name};
                      let emailObject = {name: 'email', value: email};
                      let dateReqObject = {name: 'dateReq', value: dateReq};
                      
                      // push the objects in the array
                      formData.push(seatSelectedObject);
                      formData.push(timeObject);
                      formData.push(dateObject);
                      formData.push(viewObject);
                      formData.push(roomNameObject);
                      formData.push(userObject);
                      formData.push(emailObject);
                      formData.push(dateReqObject);
                
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
                    /*
                  },
                  error: function (error) {
                    // Handle the error response from the server
                    console.log('Error:', error);
                  }*/
                
              }
          
          
          // VISITOR
          } else {
            alert('Please sign in to reserve a seat.');
          }
          window.location.reload();
        }
          
      });


    },
    error: function(error) {
      // Handle the error response from the server
      console.log('Error retrieving data:', error);
    }
  });
  $('.seatBtn').click(function(event) {
    if(accountType == 'visitor'){
      alert('Please sign in to reserve a seat.');
    }
  })
})
  