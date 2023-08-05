$(document).ready(function() {
  // Generate the current date
  document.getElementById('date').valueAsDate = new Date();

  // query selectors for navbar elements
  const signInLink = $("#signInLink");
  const viewProfileLink = $("#viewProfileLink");
  const logoutBtn = $("#logoutBtn");

  // declare initial variables
  let accountType = 'visitor';
  let userName;

  // get the reservations list based on the room
  let roomName = document.querySelector('#roomName').innerHTML.substring(14);
  let url;
  if (roomName == 'CL01') {
    url = '/api/cl01';
  } else if (roomName == 'CL02') {
    url = '/api/cl02';
  } else {
    url = '/api/cl03';
  }

  // container for the list of reservations
  let allReservations = [];

  // get all reservations based on the specified room via ajax
  $.ajax({
    url: url,
    method: 'GET',
    success: function(response) {
      // store the data in an array
      for (let key in response) {
        allReservations.push(response[key]);
      }
      
      // call function to update the page with the reserved seat
      updateReservedSeats(); 
    },
    error: function(error) {
      // Handle the error response from the server
      console.log('Error retrieving data:', error);
    }
  });

  // function to update reserved seats from data in database
  function updateReservedSeats (){
    // get value of date and time selected from dropdown
    let dateSelected = document.querySelector('#date').value;
    let startTimeSelected = document.querySelector('#start-time').value;
    let endTimeSelected =  document.querySelector('#end-time').value;

    // reset the container and remove all its elements
    const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
    reservedSeatsContainer.innerHTML = "";

    // reset all buttons first
    for(let i = 1; i <= 48; i++){
      if(i < 10){
        let btn = document.querySelector(`#btn-0${i}`);
        btn.disabled = false;
        btn.classList.replace("btn-danger", "btn-outline-info"); 
        btn.classList.replace("btn-warning", "btn-outline-info"); 
      } else {
        let btn = document.querySelector(`#btn-${i}`);
        btn.disabled = false;
        btn.classList.replace("btn-danger", "btn-outline-info");
        btn.classList.replace("btn-warning", "btn-outline-info"); 
      }
    }

    // sort the list of reservations based on seat number
    allReservations.sort((a, b) => {
      if ( a.seatSelected < b.seatSelected ){
        return -1;
      }
      if ( a.seatSelected > b.seatSelected ){
        return 1;
      }
      return 0;
    })
    
    // then set reserved seats to red and disable them
    // get the list of students from database via ajax
    $.ajax({
      url: '/get-all-students',
      method: 'POST',
      success: function(response) {
          for(reservation of allReservations){
            // split the reservation time as multiple time slots is allowed
            array = reservation.time.split(/,/);
            let b = reservation.seatSelected;
            let valid = false;
            for(time of array){
            
              // if the time and date of a reservation matches the selected time and date
              if(reservation.date == dateSelected && time >= startTimeSelected && time <= endTimeSelected){
                valid = true;

                // get the seatBtn based on the reservation
                let btn = document.querySelector(`#btn-${b}`);
                // disable the button and change its color
                array.sort();
                
                if(array[0].substring(0,5) == "09:00" && array[array.length-1].substring(9) == "16:00"){
                  btn.disabled = true;
                  btn.classList.replace("btn-outline-info", "btn-danger");
                } else {
                  btn.classList.replace("btn-outline-info", "btn-warning");
                }            
              }
            }

            if(valid){
              // this is for the objectId to link to the profile of the student
              let objectId;
              for(student of response){
                if(reservation.email == student.email){
                  objectId = student._id;
                }
              }

              // add a paragraph in the container with the details of the reservation
              let parag;
              if(reservation.user != "Anonymous" && reservation.email != ""){
                parag = $("<p>");
                parag.addClass("text-white custom-font text-center");
                parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white" href="/profile/${objectId}">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
              } else {
                parag = $("<p>");
                parag.addClass("text-white custom-font text-center");
                parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
              }
              reservedSeatsContainer.append(parag[0]);
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
  document.querySelector('#start-time').addEventListener("change", updateReservedSeats);
  document.querySelector('#end-time').addEventListener("change", updateReservedSeats);

  // helper function to determine if the selected time slots are consecutive
  function areTimeSlotsConsecutive(timeSlots) {
    if (timeSlots.length === 0) {
      return false;
    }
  
    // sort timeslots first
    timeSlots.sort();
    let i = 1;
    let a;

    // determine if consecutive
    for(let j = 0; j < timeSlots.length - 1; j++){
      a = timeSlots[j].substring(9);
      if(a != timeSlots[i].substring(0, 5)) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  // if the user is a visitor (not logged in)
  if(accountType == 'visitor'){
    signInLink.removeClass("d-none");
    viewProfileLink.addClass("d-none");
    logoutBtn.addClass("d-none");
  }

  // container for list of reserved seats
  const resSeatsP = $(".resSeatsContainer p");
  var email;

  // ajax request to get the account type, username, and email of the user
  $.ajax({
    url: '/api/student-view',
    method: 'GET',
    success: function(response) {
      // access the data from response
      accountType = response.accountType; 
      userName = response.userName;
      email = response.email;

      // change the nav bar depending on the account type of the uer
      if(accountType == "Student"){
        signInLink.addClass("d-none");
        viewProfileLink.removeClass("d-none");
        logoutBtn.removeClass("d-none");

        // remove the paragraph elements of reservation seats container using dnone
        for(p of resSeatsP){
          p.classList.add("d-none");
        }

      } else if(accountType == "Technician") {
        signInLink.addClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.removeClass("d-none");

        // remove the paragraph elements of reservation seats container using dnone
        for(p of resSeatsP){
          p.classList.add("d-none");
        }
      } else {
        signInLink.removeClass("d-none");
        viewProfileLink.addClass("d-none");
        logoutBtn.addClass("d-none");
      }


      // event listener for reserving a seat 
      $('.seatBtn').click(function(event) {
        event.preventDefault();
        let thisBtn = $(this);
      
        // get the time slots selected
        var checkedTimeSlots = [];
        $('.form-check-input:checked').each(function() {
          var timeSlot = $(this).val();
          checkedTimeSlots.push(timeSlot);
        });

        // check if timeslots selected are valid
        if(checkedTimeSlots.length == 0){
          alert('Please select the time slot you want to reserve');
          return
        } else if (!areTimeSlotsConsecutive(checkedTimeSlots)) {
          alert('You can only reserve consecutive time slots.');
          return;
        } else {
  
          // create formData of objects
          var formData = []

          // STUDENT
          if (accountType == "Student") {
            // option to be anonymous of the user
            var anonymous = confirm(`Do you want to reserve anonymously?`);
            if(anonymous == true){
              // set username to anonymous
              userName = 'Anonymous'
            } 
  
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
                      
            // determine if the reservation already exists
             // get the reservations list based on the room
            let url;
            if (roomName == 'CL01') {
              url = '/api/cl01';
            } else if (roomName == 'CL02') {
              url = '/api/cl02';
            } else {
              url = '/api/cl03';
            }

            // container for the list of reservations
            let allReservations = [];

            // get all reservations based on the specified room via ajax
            $.ajax({
              url: url,
              method: 'GET',
              success: function(response) {
                // store the data in an array
                for (let key in response) {
                  allReservations.push(response[key]);
                }
                
                let found = false;
                for(reservation of allReservations){
                  let timeData = reservation.time.split(/,/);
                  if(dateSelected == reservation.date && thisBtn.val() == reservation.seatSelected){
                    timeData = reservation.time.split(/,/);
                    for(time of checkedTimeSlots){
                      for(data of timeData){
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

                  const reserveForm = document.forms.reserveForm;
                  reserveForm.reset();
                  document.getElementById('date').valueAsDate = new Date(dateSelected);

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
                  // update UI
                  // get the reservations list based on the room
                  let url;
                  if (roomName == 'CL01') {
                    url = '/api/cl01';
                  } else if (roomName == 'CL02') {
                    url = '/api/cl02';
                  } else {
                    url = '/api/cl03';
                  }

                  // container for the list of reservations
                  var reservationsBasedOnDate = [];

                  // get all reservations based on the specified room via ajax
                  $.ajax({
                    url: url,
                    method: 'GET',
                    success: function(response) {
                      // store the data in an array
                      for (let key in response) {
                        reservationsBasedOnDate.push(response[key]);
                      }
                      
                      let timeSlots = [];
                      for(let reservation of reservationsBasedOnDate){
                        if(reservation.date == dateSelected && reservation.seatSelected == thisBtn.val()){
                          let array = reservation.time.split(/,/);
                          for(let time of array){
                            timeSlots.push(time);
                          }
                        }
                      }
                      timeSlots.sort();
                      if(timeSlots[0].substring(0,5) == "09:00" && timeSlots[timeSlots.length-1].substring(9) == "16:00"){
                        thisBtn.prop('disabled', true);
                        thisBtn.addClass("btn-danger");
                        thisBtn.removeClass("btn-outline-info");
                      } else {
                        thisBtn.addClass("btn-warning");
                        thisBtn.removeClass("btn-outline-info");
                      }  

                      // reset the container and remove all its elements
                      const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
                      reservedSeatsContainer.innerHTML = "";

                      $.ajax({
                        url: '/get-all-students',
                        method: 'POST',
                        success: function(response) {
                            let startTimeSelected = document.querySelector('#start-time').value;
                            let endTimeSelected =  document.querySelector('#end-time').value;
                            reservationsBasedOnDate.sort((a,b) => {
                              if(a.seatSelected > b.seatSelected){
                                return 1;
                              }
                              else if(a.seatSelected < b.seatSelected){
                                return -1;
                              }
                              return 0;
                            })
                            for(reservation of reservationsBasedOnDate){
                              // split the reservation time as multiple time slots is allowed
                              array = reservation.time.split(/,/);
                              let b = reservation.seatSelected;
                              let valid = false;
                              for(time of array){ 
                                // if the time and date of a reservation matches the selected time and date
                                if(reservation.date == dateSelected && reservation.time >= startTimeSelected && reservation.time <= endTimeSelected){
                                  valid = true;
                  
                                  array.sort();       
                                }
                              }
                              if(valid){
                                // this is for the objectId to link to the profile of the student
                                let objectId;
                                for(student of response){
                                  if(reservation.email == student.email){
                                    objectId = student._id;
                                  }
                                }
                  
                                // add a paragraph in the container with the details of the reservation
                                let parag;
                                if(reservation.user != "Anonymous" && reservation.email != ""){
                                  parag = $("<p>");
                                  parag.addClass("text-white custom-font text-center");
                                  parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white" href="/profile/${objectId}">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
                                } else {
                                  parag = $("<p>");
                                  parag.addClass("text-white custom-font text-center");
                                  parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
                                }
                                reservedSeatsContainer.append(parag[0]);
                              }
                              
                            }
                        },
                        error: function(error) {
                          // Handle the error response from the server
                          console.log('Error retrieving data:', error);
                        }
                      })

                    },
                    error: function(error) {
                      // Handle the error response from the server
                      console.log('Error retrieving data:', error);
                    }
                  });



                }
              },
              error: function(error) {
                // Handle the error response from the server
                console.log('Error retrieving data:', error);
              }
            });


            
          }

          // TECHNICIAN
          else if(accountType == "Technician") {          
            // ask the user if they want to be anonymous
            var anonymous = confirm('Does the student want to reserve anonymously?');
            if(anonymous == true){
              userName = 'Anonymous'
                
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

               // get the reservations list based on the room
            let url;
            if (roomName == 'CL01') {
              url = '/api/cl01';
            } else if (roomName == 'CL02') {
              url = '/api/cl02';
            } else {
              url = '/api/cl03';
            }

            // container for the list of reservations
            let allReservations = [];

            // get all reservations based on the specified room via ajax
            $.ajax({
              url: url,
              method: 'GET',
              success: function(response) {
                // store the data in an array
                for (let key in response) {
                  allReservations.push(response[key]);
                }
                
                let found = false;
                for(reservation of allReservations){
                  let timeData = reservation.time.split(/,/);
                  if(dateSelected == reservation.date && thisBtn.val() == reservation.seatSelected){
                    timeData = reservation.time.split(/,/);
                    for(time of checkedTimeSlots){
                      for(data of timeData){
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

                  const reserveForm = document.forms.reserveForm;
                  reserveForm.reset();
                  document.getElementById('date').valueAsDate = new Date(dateSelected);

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
                  // update UI
                  // get the reservations list based on the room
                  let url;
                  if (roomName == 'CL01') {
                    url = '/api/cl01';
                  } else if (roomName == 'CL02') {
                    url = '/api/cl02';
                  } else {
                    url = '/api/cl03';
                  }

                  // container for the list of reservations
                  var reservationsBasedOnDate = [];

                  // get all reservations based on the specified room via ajax
                  $.ajax({
                    url: url,
                    method: 'GET',
                    success: function(response) {
                      // store the data in an array
                      for (let key in response) {
                        reservationsBasedOnDate.push(response[key]);
                      }
                      
                      let timeSlots = [];
                      for(let reservation of reservationsBasedOnDate){
                        if(reservation.date == dateSelected && reservation.seatSelected == thisBtn.val()){
                          let array = reservation.time.split(/,/);
                          for(let time of array){
                            timeSlots.push(time);
                          }
                        }
                      }
                      timeSlots.sort();
                      if(timeSlots[0].substring(0,5) == "09:00" && timeSlots[timeSlots.length-1].substring(9) == "16:00"){
                        thisBtn.prop('disabled', true);
                        thisBtn.addClass("btn-danger");
                        thisBtn.removeClass("btn-outline-info");
                      } else {
                        thisBtn.addClass("btn-warning");
                        thisBtn.removeClass("btn-outline-info");
                      }  

                      // reset the container and remove all its elements
                      const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
                      reservedSeatsContainer.innerHTML = "";

                      $.ajax({
                        url: '/get-all-students',
                        method: 'POST',
                        success: function(response) {
                            let startTimeSelected = document.querySelector('#start-time').value;
                            let endTimeSelected =  document.querySelector('#end-time').value;
                            reservationsBasedOnDate.sort((a,b) => {
                              if(a.seatSelected > b.seatSelected){
                                return 1;
                              }
                              else if(a.seatSelected < b.seatSelected){
                                return -1;
                              }
                              return 0;
                            })
                            for(reservation of reservationsBasedOnDate){
                              // split the reservation time as multiple time slots is allowed
                              array = reservation.time.split(/,/);
                              let b = reservation.seatSelected;
                              let valid = false;
                              for(time of array){ 
                                // if the time and date of a reservation matches the selected time and date
                                if(reservation.date == dateSelected && reservation.time >= startTimeSelected && reservation.time <= endTimeSelected){
                                  valid = true;
                  
                                  array.sort();       
                                }
                              }
                              if(valid){
                                // this is for the objectId to link to the profile of the student
                                let objectId;
                                for(student of response){
                                  if(reservation.email == student.email){
                                    objectId = student._id;
                                  }
                                }
                  
                                // add a paragraph in the container with the details of the reservation
                                let parag;
                                if(reservation.user != "Anonymous" && reservation.email != ""){
                                  parag = $("<p>");
                                  parag.addClass("text-white custom-font text-center");
                                  parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white" href="/profile/${objectId}">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
                                } else {
                                  parag = $("<p>");
                                  parag.addClass("text-white custom-font text-center");
                                  parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
                                }
                                reservedSeatsContainer.append(parag[0]);
                              }
                              
                            }
                        },
                        error: function(error) {
                          // Handle the error response from the server
                          console.log('Error retrieving data:', error);
                        }
                      })

                    },
                    error: function(error) {
                      // Handle the error response from the server
                      console.log('Error retrieving data:', error);
                    }
                  });



                }
              },
              error: function(error) {
                // Handle the error response from the server
                console.log('Error retrieving data:', error);
              }
            });


            } else {
              // get name of user
              email = prompt(`Enter the email of student:`);
              if(email === ""){
                alert('Please enter the name of the student!');
              }
              else if(email == null){
                //do nothing
              } else{
                dateRequested = new Date()

                let myObj = {
                  email: email
                }

                $.ajax({
                  type: 'POST',
                  url: '/getAccount',
                  data: myObj,
                  success: function(response) {
                  
                    if(response == null){
                      alert('That account does not exist in the database');
                    } else {
                      // get the current date
                      
                      userName = response.name;
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

                       // get the reservations list based on the room
                      let url;
                      if (roomName == 'CL01') {
                        url = '/api/cl01';
                      } else if (roomName == 'CL02') {
                        url = '/api/cl02';
                      } else {
                        url = '/api/cl03';
                      }

                      // container for the list of reservations
                      let allReservations = [];

                      // get all reservations based on the specified room via ajax
                      $.ajax({
                        url: url,
                        method: 'GET',
                        success: function(response) {
                          // store the data in an array
                          for (let key in response) {
                            allReservations.push(response[key]);
                          }
                          
                          let found = false;
                          for(reservation of allReservations){
                            let timeData = reservation.time.split(/,/);
                            if(dateSelected == reservation.date && thisBtn.val() == reservation.seatSelected){
                              timeData = reservation.time.split(/,/);
                              for(time of checkedTimeSlots){
                                for(data of timeData){
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

                            const reserveForm = document.forms.reserveForm;
                            reserveForm.reset();
                            document.getElementById('date').valueAsDate = new Date(dateSelected);

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
                            // update UI
                            // get the reservations list based on the room
                            let url;
                            if (roomName == 'CL01') {
                              url = '/api/cl01';
                            } else if (roomName == 'CL02') {
                              url = '/api/cl02';
                            } else {
                              url = '/api/cl03';
                            }

                            // container for the list of reservations
                            var reservationsBasedOnDate = [];

                            // get all reservations based on the specified room via ajax
                            $.ajax({
                              url: url,
                              method: 'GET',
                              success: function(response) {
                                // store the data in an array
                                for (let key in response) {
                                  reservationsBasedOnDate.push(response[key]);
                                }
                                
                                let timeSlots = [];
                                for(let reservation of reservationsBasedOnDate){
                                  if(reservation.date == dateSelected && reservation.seatSelected == thisBtn.val()){
                                    let array = reservation.time.split(/,/);
                                    for(let time of array){
                                      timeSlots.push(time);
                                    }
                                  }
                                }
                                timeSlots.sort();
                                if(timeSlots[0].substring(0,5) == "09:00" && timeSlots[timeSlots.length-1].substring(9) == "16:00"){
                                  thisBtn.prop('disabled', true);
                                  thisBtn.addClass("btn-danger");
                                  thisBtn.removeClass("btn-outline-info");
                                } else {
                                  thisBtn.addClass("btn-warning");
                                  thisBtn.removeClass("btn-outline-info");
                                }  

                                // reset the container and remove all its elements
                                const reservedSeatsContainer = document.querySelector(".resSeatsContainer");
                                reservedSeatsContainer.innerHTML = "";

                                $.ajax({
                                  url: '/get-all-students',
                                  method: 'POST',
                                  success: function(response) {
                                      let startTimeSelected = document.querySelector('#start-time').value;
                                      let endTimeSelected =  document.querySelector('#end-time').value;
                                      reservationsBasedOnDate.sort((a,b) => {
                                        if(a.seatSelected > b.seatSelected){
                                          return 1;
                                        }
                                        else if(a.seatSelected < b.seatSelected){
                                          return -1;
                                        }
                                        return 0;
                                      })
                                      for(reservation of reservationsBasedOnDate){
                                        // split the reservation time as multiple time slots is allowed
                                        array = reservation.time.split(/,/);
                                        let b = reservation.seatSelected;
                                        let valid = false;
                                        for(time of array){ 
                                          // if the time and date of a reservation matches the selected time and date
                                          if(reservation.date == dateSelected && reservation.time >= startTimeSelected && reservation.time <= endTimeSelected){
                                            valid = true;
                            
                                            array.sort();       
                                          }
                                        }
                                        if(valid){
                                          // this is for the objectId to link to the profile of the student
                                          let objectId;
                                          for(student of response){
                                            if(reservation.email == student.email){
                                              objectId = student._id;
                                            }
                                          }
                            
                                          // add a paragraph in the container with the details of the reservation
                                          let parag;
                                          if(reservation.user != "Anonymous" && reservation.email != ""){
                                            parag = $("<p>");
                                            parag.addClass("text-white custom-font text-center");
                                            parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white" href="/profile/${objectId}">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
                                          } else {
                                            parag = $("<p>");
                                            parag.addClass("text-white custom-font text-center");
                                            parag.html(`Seat #${b}: <a class="link-offset-3 link-offset-2-hover text-white">${reservation.user}</a><br>Time: ${array[0].substring(0,5)} to ${array[array.length-1].substring(9)}`);
                                          }
                                          reservedSeatsContainer.append(parag[0]);
                                        }
                                        
                                      }
                                  },
                                  error: function(error) {
                                    // Handle the error response from the server
                                    console.log('Error retrieving data:', error);
                                  }
                                })

                              },
                              error: function(error) {
                                // Handle the error response from the server
                                console.log('Error retrieving data:', error);
                              }
                            });



                          }
                        },
                        error: function(error) {
                          // Handle the error response from the server
                          console.log('Error retrieving data:', error);
                        }
                      });

                    }
                  }
                })
              }    
            }
            
          
          // VISITOR
          } else {
            alert('Please sign in to reserve a seat.');
            window.location.reload();
          }
        }   
      });


    },
    error: function(error) {
      // Handle the error response from the server
      console.log('Error retrieving data:', error);
    }
  });
  
  // when the visitor tries to reserve a seat
  $('.seatBtn').click(function(event) {
    if(accountType == 'visitor'){
      alert('Please sign in to reserve a seat.');
    }
  })
})
  