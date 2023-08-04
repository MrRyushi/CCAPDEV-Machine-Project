$(document).ready(function(){
  var previousSeat;
  var previousTime;
  let room;
  let seatnum;
  let datereq;
  let timereq;
  let dateres;
  let timeres;
  let currRoom;
  let currSeatnum;
  let currDateReq;
  let currTimeReq;
  let currDateRes;
  let currTimeRes;

  // Global variable to store selected values of time slots
  var selectedValues = [];

  // Checkbox change event listener
  $('#reservationContainer').on('change', '.form-check-input', function() {
    var value = $(this).val();
    var index = selectedValues.indexOf(value);

    // Add or remove the value from the selectedValues array
    if ($(this).prop('checked')) {
      if (index === -1) {
        selectedValues.push(value);
      }
    } else {
      if (index !== -1) {
        selectedValues.splice(index, 1);
      }
    }
  });

  // helper function to update selected values
  function updateSelectedValues() {
    selectedValues = [];
    $('#reservationContainer').find('.form-check-input:checked').each(function() {
      selectedValues.push($(this).val());
    });
  }

  // Checkbox change event listener
  $('#reservationContainer').on('change', '.form-check-input', function() {
    updateSelectedValues();
  });

  // Event listener for clicking the edit button
  $('#reservationContainer').on('click', '.edit-btn', function() {
    // Clear the selectedValues array before editing another table
    selectedValues = [];

    // get the buttons
    let editBtns = $('.edit-btn');
    // Disable all other edit buttons
    editBtns.not(this).prop('disabled', true);
    let table = $(this).closest("table");
    let cancelBtn = table.find(".cancel-btn");
    let saveBtn = table.find(".save-btn");
    let deleteBtn = table.find(".delete-btn");
    
    // hide the edit and show the cancel and save buttons
    $(this).addClass("d-none");
    cancelBtn.removeClass("d-none");
    saveBtn.removeClass("d-none");
    deleteBtn.removeClass("d-none");

    // get the value elements
    room = table.find(".room-value");
    seatnum = table.find(".seatnum-value");
    datereq = table.find(".datereq-value");
    timereq = table.find(".timereq-value");
    dateres = table.find(".dateres-value");
    timeres = table.find(".timeres-value");

    // store their current value
    currRoom = room.text();
    currSeatnum = seatnum.text();
    currDateReq = datereq.text();
    currTimeReq = timereq.text();
    currDateRes = dateres.text();
    currTimeRes = timeres.text();
    previousSeat = seatnum.text();
    previousTime = timeres.text();
    
    // seat num
    seatnum.html("");
    seatnum_form = $("<input>");
    seatnum_form.addClass("room-form form-control");
    seatnum_form.attr("type", "number");
    seatnum_form.attr("placeholder", `${currSeatnum}`);
    seatnum_form.attr("value", `${currSeatnum}`);
    seatnum_form.attr("min", "1");
    seatnum_form.attr("max", "48");
    seatnum.append(seatnum_form);

    // create elements
    var container = $('<div>')
    var timeContainer = $('<div>')
    var title = $('<div>')
    var titleText = $('<p>')
    title.append(titleText);
    timeContainer.append(title);

    // the available time slots
    var timeSlots = [
      { value: '09:00 to 09:30', id: '09:00', label: '09:00 to 09:30' },
      { value: '09:30 to 10:00', id: '09:30', label: '09:30 to 10:00' },
      { value: '10:00 to 10:30', id: '10:00', label: '10:00 to 10:30' },
      { value: '10:30 to 11:00', id: '10:30', label: '10:30 to 11:00' },
      { value: '11:00 to 11:30', id: '11:00', label: '11:00 to 11:30' },
      { value: '11:30 to 12:00', id: '11:30', label: '11:30 to 12:00' },
      { value: '12:00 to 12:30', id: '12:00', label: '12:00 to 12:30' },
      { value: '12:30 to 13:00', id: '12:30', label: '12:30 to 13:00' },
      { value: '13:00 to 13:30', id: '13:00', label: '13:00 to 13:30' },
      { value: '13:30 to 14:00', id: '13:30', label: '13:30 to 14:00' },
      { value: '14:00 to 14:30', id: '14:00', label: '14:00 to 14:30' },
      { value: '14:30 to 15:00', id: '14:30', label: '14:30 to 15:00' },
      { value: '15:00 to 15:30', id: '15:00', label: '15:00 to 15:30' },
      { value: '15:30 to 16:00', id: '15:30', label: '15:30 to 16:00' }
    ];

    // each timeslots
    $.each(timeSlots, function(index, slot) {
      var formCheck = $('<div>').addClass('form-check mx-auto');
      var input = $('<input>').addClass('form-check-input').attr({
        type: 'checkbox',
        value: slot.value,
        id: slot.id
      });
      var label = $('<label>').addClass('form-check-label').attr('for', slot.id).text(slot.label);
      formCheck.append(input, label);
      timeContainer.append(formCheck);
    });
    
    // Create a set to store the values in currTimeRes array
    let currTimeSet = new Set(currTimeRes.split(', '));

    // Iterate over each checkbox and check it if the value is in currTimeSet
    timeContainer.find('.form-check-input').each(function() {
      let value = $(this).val();
      if (currTimeSet.has(value)) {
        console.log("in");
        $(this).prop('checked', true);
      }
    });

    container.append(timeContainer);
    let prevTime = timeres.text();
    let prevTimeArray = prevTime.split(/,/);
    timeres.append(container);

    // Create a set to store the values in prevTimeArray
    let prevTimeSet = new Set(prevTimeArray);
    console.log(prevTimeSet);
    // Iterate over each checkbox and check it if the value is in prevTimeSet
    timeContainer.find('.form-check-input').each(function() {
      let value = $(this).val();
      if (prevTimeSet.has(value)) {
        $(this).prop('checked', true);
      }
    });
    updateSelectedValues();
  }) 

  // event listener for when the cancel button is clicked
  $('#reservationContainer').on('click', '.cancel-btn', function() {
      // Find the closest table element
      let table = $(this).closest('table');
  
      // Find the buttons within the table
      let editBtn = table.find(".edit-btn");
      let saveBtn = table.find(".save-btn");
      let deleteBtn = table.find(".delete-btn");
  
      // Enable all other edit buttons
      $('.edit-btn').not(editBtn).prop('disabled', false);
    
      // Perform the desired operations within the specific table
      $(this).addClass("d-none");
      editBtn.removeClass("d-none");
      saveBtn.addClass("d-none");
      deleteBtn.addClass("d-none")
    
      // get the value elements
      let seatnum = table.find(".seatnum-value");
      let timeres = table.find(".timeres-value");
    
      //room.html(`${currRoom}`);
      seatnum.html(`${currSeatnum}`);
      timeres.html(`${currTimeRes}`);
    });
    
  // helper function to determine if the timeslots are consecutive
  function areTimeSlotsConsecutive(timeSlots) {
    if (timeSlots.length === 0) {
      return false;
    }
  
    timeSlots.sort();

    let i = 1;
    let a;
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

  // event listener for when the save button is clicked
  $('#reservationContainer').on('click', '.save-btn', function () {
    // Store a reference to the table element
    let table = $(this).closest("table");

    // get all the reservations from database via ajax
    $.ajax({
      url: '/getAllReservations',
      method: 'POST',
      success: function(response) {

        const cl01 = response.cl01Data;
        const cl02 = response.cl02Data;
        const cl03 = response.cl03Data;

        // assign room used based on the room of the selected reservation 
        let roomUsed;
        if(currRoom == 'CL01'){
          roomUsed = cl01;
        } else if(currRoom == 'CL02'){
          roomUsed = cl02;
        } else if(currRoom == 'CL03'){
          roomUsed = cl03;
        }
        
        // validate seat number
        let currrSeatnum = seatnum_form.val();
        if(currrSeatnum > 48 || currSeatnum <= 0){
          alert(`There is no seat no. ${currSeatnum}`);
          return;
        }

        // add 0 if seat number is single digit
        if(currrSeatnum < 10 && currrSeatnum > 0 && currrSeatnum.substring(0,1) != 0){
          currrSeatnum = `0${currrSeatnum}`;
        }

        let currrTimeRes = selectedValues.join(',');
        let found = false;
        let timeRes = currrTimeRes.split(/,/);
        let dateResArray = currDateRes.split(' ');
        let month;
        switch(dateResArray[0]){
          case 'January': month='01'; break;
          case 'February': month='02'; break;
          case 'March': month='03'; break;
          case 'April': month='04'; break;
          case 'May': month='05'; break;
          case 'June': month='06'; break;
          case 'July': month='07'; break;
          case 'August': month='08'; break;
          case 'September': month='09'; break;
          case 'October': month='10'; break;
          case 'November': month='11'; break;
          case 'December': month='12'; break;
        }
        let newCurrDateRes = dateResArray[2] + "-" + month + "-" + dateResArray[1].substring(0, 2);
        
        // determine if the selected seat num is alr occupied based on time slots
        for(res of roomUsed){
          let timeData = res.time.split(/,/);
          if(currSeatnum == res.seatSelected && newCurrDateRes == res.date && currTimeRes == timeData){
            console.log("continue");
            continue;
          } else {
            if(newCurrDateRes == res.date && currrSeatnum == res.seatSelected){
              timeData = res.time.split(/,/);
              for(time of timeRes){
                for(data of timeData){
                  console.log(time + " : " + data);
                  if(time == data){
                    found = true;
                  }
                }
              }
            }
          }
        }

        console.log("found: " + found);

        // get the time slots selected
        var checkedTimeSlots = [];
        $('.form-check-input:checked').each(function() {
          var timeSlot = $(this).val();
          checkedTimeSlots.push(timeSlot);
        });
        
        if(found == true){
          alert('seat and given time already occupied');
        }
        else if(checkedTimeSlots.length == 0){
          alert('Please select the time slot you want to reserve');
          return
        } else if (!areTimeSlotsConsecutive(checkedTimeSlots)) {
          alert('You can only reserve consecutive time slots.');
          return;
        } else {          
        
          let seatnum = table.find(".seatnum-value");
          let timeres = table.find(".timeres-value");
        
          seatnum.html(`${currrSeatnum}`);
          timeres.html(`${currrTimeRes}`);
          
          let editBtn = table.find(".edit-btn");
          let cancelBtn = table.find(".cancel-btn");
          let deleteBtn = table.find(".delete-btn");
          let saveBtn = table.find(".save-btn");

          // Enable all other edit buttons
          $('.edit-btn').not(editBtn).prop('disabled', false);
        
          saveBtn.addClass("d-none");
          editBtn.removeClass("d-none");
          cancelBtn.addClass("d-none");
          deleteBtn.addClass("d-none");
          
          // create formData to push the new details of reservation
          let formData = [];
          formData.push({name: "roomName", value: currRoom});
          formData.push({name: "date", value: newCurrDateRes});
          formData.push({name: "newTimeRes", value: currrTimeRes})
          formData.push({name: "newSeatNum", value: currrSeatnum});
          formData.push({name: "prevSeat", value: previousSeat});
          formData.push({name: "prevTime", value: previousTime});

          // send data via ajax
          $.ajax({
            type: 'POST',
            url: '/update-reservation',
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
    })
  });

  // event listener when delete button is clicked
  $('#reservationContainer').on('click', '.delete-btn', function() {
    let div = $(this).closest("div");
    div.remove();

    // Find the closest table element
    let table = $(this).closest('table');

    // Find the edit button within the table
    let editBtn = table.find('.edit-btn');

    // Enable the edit button
    $('.edit-btn').not(editBtn).prop('disabled', false);

    // get the date on YYYY-MM-DD format
    let dateResArray = currDateRes.split(' ');
    let month;
    switch(dateResArray[0]){
      case 'January': month='01'; break;
      case 'February': month='02'; break;
      case 'March': month='03'; break;
      case 'April': month='04'; break;
      case 'May': month='05'; break;
      case 'June': month='06'; break;
      case 'July': month='07'; break;
      case 'August': month='08'; break;
      case 'September': month='09'; break;
      case 'October': month='10'; break;
      case 'November': month='11'; break;
      case 'December': month='12'; break;
    }
    let newCurrDateRes = dateResArray[2] + "-" + month + "-" + dateResArray[1].substring(0, 2);

    let formData = [];
    // create objects to be sent through ajax
    formData.push({name: "room", value: currRoom});
    formData.push({name: "seatNum", value: currSeatnum});
    formData.push({name: "date", value: newCurrDateRes});
    formData.push({name: "time", value: currTimeRes})

    $.ajax({
      type: 'POST',
      url: '/delete-reservation',
      data: formData,
      success: function (response) {
        // Handle the success response from the server
      },
      error: function (error) {
        // Handle the error response from the server
      }
    });
    window.location.reload();
    
  });
})