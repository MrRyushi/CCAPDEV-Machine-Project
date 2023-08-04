$(document).ready(function(){
  $('.btn-back').click(() => {
    window.location.href = 'technician-view';
  })

  $.ajax({
    url: '/getAllReservations',
    method: 'POST',
    success: function(response) {
      const cl01Array = response.cl01Data;
      const cl02Array = response.cl02Data;
      const cl03Array = response.cl03Data;

      cl01Array.sort((a, b) => {
        if ( a.date < b.date ){
          return -1;
        } else if ( a.date > b.date ){
          return 1;
        } else {
          if(a.time < b.time){
            return -1;
          } else if(a.time > b.time) {
            return 1;
          }
          return 0;
        }
      })

      for(res of cl01Array){
        console.log(res.date);
      }
      

      cl02Array.sort((a, b) => {
        if ( a.date < b.date ){
          return -1;
        } else if ( a.date > b.date ){
          return 1;
        } else {
          if(a.time < b.time){
            return -1;
          } else if(a.time > b.time) {
            return 1;
          }
          return 0;
        }
      })

      cl03Array.sort((a, b) => {
        if ( a.date < b.date ){
          return -1;
        } else if ( a.date > b.date ){
          return 1;
        } else {
          if(a.time < b.time){
            return -1;
          } else if(a.time > b.time) {
            return 1;
          }
          return 0;
        }
      })
    
      // create elements 
      let upcomingReservationContainer = $('#upcomingReservationContainer');
      let pastReservationContainer = $('#pastReservationContainer')
      let pastReservationCount = 0;
      let upcomingReservationCount = 0

      for(let data of cl01Array){
        let tableContainer = $('<div>');
        let table = $('<table>');
        let tbody  = $('<tbody>');
        let tableHeader = $('<th>');
        let editBtn = $('<button>');
        let deleteBtn = $('<button>');
        let cancelBtn = $('<button>');
        let saveBtn = $('<button>');

        let tableRow2 = $('<tr>');
        let tableRow3 = $('<tr>');
        let tableRow4 = $('<tr>');
        let tableRow5 = $('<tr>');
        let tableRow6 = $('<tr>');
        let tableRow7 = $('<tr>');
        let tabledata1 = $('<td>');
        let tabledata2 = $('<td>');
        let tabledata3 = $('<td>');
        let tabledata4 = $('<td>');
        let tabledata5 = $('<td>');
        let tabledata6 = $('<td>');
        let tabledata7 = $('<td>');
        let tabledata8 = $('<td>');
        let tabledata9 = $('<td>');
        let tabledata10 = $('<td>');
        let tabledata11 = $('<td>');
        let tabledata12 = $('<td>');
        tbody.append(tableRow7);
        tbody.append(tableRow2);
        tbody.append(tableRow3);
        tbody.append(tableRow4);
        tbody.append(tableRow5);
        tbody.append(tableRow6);
        tableRow2.append(tabledata1);
        tableRow2.append(tabledata2);
        tableRow3.append(tabledata3);
        tableRow3.append(tabledata4);
        tableRow4.append(tabledata5);
        tableRow4.append(tabledata6);
        tableRow5.append(tabledata7);
        tableRow5.append(tabledata8);
        tableRow6.append(tabledata9);
        tableRow6.append(tabledata10);
        tableRow7.append(tabledata11);
        tableRow7.append(tabledata12);

        tabledata1.addClass('fixed-width-cell');
        tabledata3.addClass('fixed-width-cell');
        tabledata5.addClass('fixed-width-cell');
        tabledata7.addClass('fixed-width-cell');
        tabledata9.addClass('fixed-width-cell');
        tabledata11.addClass('fixed-width-cell')

        tbody.addClass('table-group-divider');
        tabledata1.addClass('light-bold');
        tabledata3.addClass('light-bold');
        tabledata5.addClass('light-bold');
        tabledata7.addClass('light-bold');
        tabledata9.addClass('light-bold');
        tabledata2.addClass('room-value');
        tabledata4.addClass('seatnum-value');
        tabledata6.addClass('datereq-value');
        tabledata8.addClass('dateres-value');
        tabledata10.addClass('timeres-value');
        tabledata11.addClass('username');

        tabledata1.text('CyberLab Room:')
        tabledata3.text('Seat numbers:');
        tabledata5.text('Date and Time of Request:');
        tabledata7.text('Date of Reservation:');
        tabledata9.text('Time Slot of Reservation:');
        tabledata2.text('CL01');
        tabledata11.text('Name of User');
        tabledata4.text(data.seatSelected.toString());
        let month;
        switch(data.dateReq.substring(5, 7)){
          case '01': month="January"; break;
          case '02': month="February"; break;
          case '03': month="March"; break;
          case '04': month="April"; break;
          case '05': month="May"; break;
          case '06': month="June"; break;
          case '07': month="July"; break;
          case '08': month="August"; break;
          case '09': month="September"; break;
          case '10': month="October"; break;
          case '11': month="November"; break;
          case '12': month="December"; break;
        }

        let dateRequested = month + " " + data.dateReq.substring(8, 10) + ", " + data.dateReq.substring(0, 4) + " Time: " +
        data.dateReq.substring(11, 16);

        tabledata6.text(dateRequested);
        
        month;
        switch(data.date.substring(5, 7)){
          case '01': month="January"; break;
          case '02': month="February"; break;
          case '03': month="March"; break;
          case '04': month="April"; break;
          case '05': month="May"; break;
          case '06': month="June"; break;
          case '07': month="July"; break;
          case '08': month="August"; break;
          case '09': month="September"; break;
          case '10': month="October"; break;
          case '11': month="November"; break;
          case '12': month="December"; break;
        }

        let dateReservation = month + " " + data.date.substring(8, 10) + ", " + data.date.substring(0, 4);
        
        tabledata8.text(dateReservation);
        tabledata10.text(data.time);
        tabledata12.text(data.user);
        let date = new Date();
        let currTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
        let currDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        if(currDate > data.date){
          pastReservationContainer.append(tableContainer);
          pastReservationCount += 1;
          tableHeader.html(`Reservation ${pastReservationCount}`);
        } else if(currDate == data.date && currTime > data.time.substring(data.time.length-5)){
          pastReservationContainer.append(tableContainer);
          pastReservationCount += 1;
          tableHeader.html(`Reservation ${pastReservationCount}`);
        } else {
          upcomingReservationContainer.append(tableContainer);
          upcomingReservationCount += 1;
          tableHeader.html(`Reservation ${upcomingReservationCount}`);
        }

        tableContainer.append(table);
        table.append(tableHeader);
        table.append(tbody);        
        tableHeader.append(editBtn);
        tableHeader.append(deleteBtn);
        tableHeader.append(cancelBtn);
        tableHeader.append(saveBtn);

        editBtn.text('Edit');
        deleteBtn.text('Delete');
        cancelBtn.text('Cancel');
        saveBtn.text('Save');

        tableContainer.addClass('container table-responsive col-xs-12 col-md-6');
        table.addClass('table table-primary table-hover table-striped-columns custom-font-content table-responsive');
        tableHeader.addClass('fs-3 bg-info-subtle p-2 text-primary');
        tableHeader.attr('colspan', '2');
        editBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success edit-btn");
        deleteBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger delete-btn d-none");
        deleteBtn.attr("disabled", "disabled");
        cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
        saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");
      }

      for(let data of cl02Array){
        let tableContainer = $('<div>');
        let table = $('<table>');
        let tbody  = $('<tbody>');
        let tableHeader = $('<th>');
        let editBtn = $('<button>');
        let deleteBtn = $('<button>');
        let cancelBtn = $('<button>');
        let saveBtn = $('<button>');

        let tableRow2 = $('<tr>');
        let tableRow3 = $('<tr>');
        let tableRow4 = $('<tr>');
        let tableRow5 = $('<tr>');
        let tableRow6 = $('<tr>');
        let tableRow7 = $('<tr>');
        let tabledata1 = $('<td>');
        let tabledata2 = $('<td>');
        let tabledata3 = $('<td>');
        let tabledata4 = $('<td>');
        let tabledata5 = $('<td>');
        let tabledata6 = $('<td>');
        let tabledata7 = $('<td>');
        let tabledata8 = $('<td>');
        let tabledata9 = $('<td>');
        let tabledata10 = $('<td>');
        let tabledata11 = $('<td>');
        let tabledata12 = $('<td>');
        tbody.append(tableRow7);
        tbody.append(tableRow2);
        tbody.append(tableRow3);
        tbody.append(tableRow4);
        tbody.append(tableRow5);
        tbody.append(tableRow6);
        tableRow2.append(tabledata1);
        tableRow2.append(tabledata2);
        tableRow3.append(tabledata3);
        tableRow3.append(tabledata4);
        tableRow4.append(tabledata5);
        tableRow4.append(tabledata6);
        tableRow5.append(tabledata7);
        tableRow5.append(tabledata8);
        tableRow6.append(tabledata9);
        tableRow6.append(tabledata10);
        tableRow7.append(tabledata11);
        tableRow7.append(tabledata12);

        tabledata1.addClass('fixed-width-cell');
        tabledata3.addClass('fixed-width-cell');
        tabledata5.addClass('fixed-width-cell');
        tabledata7.addClass('fixed-width-cell');
        tabledata9.addClass('fixed-width-cell');
        tabledata11.addClass('fixed-width-cell')

        tbody.addClass('table-group-divider');
        tabledata1.addClass('light-bold');
        tabledata3.addClass('light-bold');
        tabledata5.addClass('light-bold');
        tabledata7.addClass('light-bold');
        tabledata9.addClass('light-bold');
        tabledata2.addClass('room-value');
        tabledata4.addClass('seatnum-value');
        tabledata6.addClass('datereq-value');
        tabledata8.addClass('dateres-value');
        tabledata10.addClass('timeres-value');
        tabledata11.addClass('username');

        tabledata1.text('CyberLab Room:')
        tabledata3.text('Seat numbers:');
        tabledata5.text('Date and Time of Request:');
        tabledata7.text('Date of Reservation:');
        tabledata9.text('Time Slot of Reservation:');
        tabledata2.text('CL02');
        tabledata11.text('Name of User');
        tabledata4.text(data.seatSelected.toString());
        let month;
        switch(data.dateReq.substring(5, 7)){
          case '01': month="January"; break;
          case '02': month="February"; break;
          case '03': month="March"; break;
          case '04': month="April"; break;
          case '05': month="May"; break;
          case '06': month="June"; break;
          case '07': month="July"; break;
          case '08': month="August"; break;
          case '09': month="September"; break;
          case '10': month="October"; break;
          case '11': month="November"; break;
          case '12': month="December"; break;
        }
        let dateRequested = month + " " + data.dateReq.substring(8, 10) + ", " + data.dateReq.substring(0, 4) + " Time: " +
        data.dateReq.substring(11, 16);
        tabledata6.text(dateRequested);
        
        month;
        switch(data.date.substring(5, 7)){
          case '01': month="January"; break;
          case '02': month="February"; break;
          case '03': month="March"; break;
          case '04': month="April"; break;
          case '05': month="May"; break;
          case '06': month="June"; break;
          case '07': month="July"; break;
          case '08': month="August"; break;
          case '09': month="September"; break;
          case '10': month="October"; break;
          case '11': month="November"; break;
          case '12': month="December"; break;
        }

        let dateReservation = month + " " + data.date.substring(8, 10) + ", " + data.date.substring(0, 4);
        tabledata8.text(dateReservation);
        tabledata10.text(data.time);
        tabledata12.text(data.user);

        let date = new Date();
        let currTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
        let currDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        if(currDate > data.date){
          pastReservationContainer.append(tableContainer);
          pastReservationCount += 1;
          tableHeader.html(`Reservation ${pastReservationCount}`);
        } else if(currDate == data.date && currTime > data.time.substring(data.time.length-5)){
          pastReservationContainer.append(tableContainer);
          pastReservationCount += 1;
          tableHeader.html(`Reservation ${pastReservationCount}`);
        } else {
          upcomingReservationContainer.append(tableContainer);
          upcomingReservationCount += 1;
          tableHeader.html(`Reservation ${upcomingReservationCount}`);
        }
        tableContainer.append(table);
        table.append(tableHeader);
        table.append(tbody);        
        tableHeader.append(editBtn);
        tableHeader.append(deleteBtn);
        tableHeader.append(cancelBtn);
        tableHeader.append(saveBtn);

        editBtn.text('Edit');
        deleteBtn.text('Delete');
        cancelBtn.text('Cancel');
        saveBtn.text('Save');

        tableContainer.addClass('container table-responsive col-xs-12 col-md-6');
        table.addClass('table table-primary table-hover table-striped-columns custom-font-content table-responsive');
        tableHeader.addClass('fs-3 bg-info-subtle p-2 text-primary');
        tableHeader.attr('colspan', '2');
        editBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success edit-btn");
        deleteBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger delete-btn d-none");
        deleteBtn.attr("disabled", "disabled");
        cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
        saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");
      }

      for(let data of cl03Array){
        let tableContainer = $('<div>');
        let table = $('<table>');
        let tbody  = $('<tbody>');
        let tableHeader = $('<th>');
        let editBtn = $('<button>');
        let deleteBtn = $('<button>');
        let cancelBtn = $('<button>');
        let saveBtn = $('<button>');

        let tableRow2 = $('<tr>');
        let tableRow3 = $('<tr>');
        let tableRow4 = $('<tr>');
        let tableRow5 = $('<tr>');
        let tableRow6 = $('<tr>');
        let tableRow7 = $('<tr>');
        let tabledata1 = $('<td>');
        let tabledata2 = $('<td>');
        let tabledata3 = $('<td>');
        let tabledata4 = $('<td>');
        let tabledata5 = $('<td>');
        let tabledata6 = $('<td>');
        let tabledata7 = $('<td>');
        let tabledata8 = $('<td>');
        let tabledata9 = $('<td>');
        let tabledata10 = $('<td>');
        let tabledata11 = $('<td>');
        let tabledata12 = $('<td>');
        tbody.append(tableRow7);
        tbody.append(tableRow2);
        tbody.append(tableRow3);
        tbody.append(tableRow4);
        tbody.append(tableRow5);
        tbody.append(tableRow6);
        tableRow2.append(tabledata1);
        tableRow2.append(tabledata2);
        tableRow3.append(tabledata3);
        tableRow3.append(tabledata4);
        tableRow4.append(tabledata5);
        tableRow4.append(tabledata6);
        tableRow5.append(tabledata7);
        tableRow5.append(tabledata8);
        tableRow6.append(tabledata9);
        tableRow6.append(tabledata10);
        tableRow7.append(tabledata11);
        tableRow7.append(tabledata12);

        tabledata1.addClass('fixed-width-cell');
        tabledata3.addClass('fixed-width-cell');
        tabledata5.addClass('fixed-width-cell');
        tabledata7.addClass('fixed-width-cell');
        tabledata9.addClass('fixed-width-cell');
        tabledata11.addClass('fixed-width-cell')

        tbody.addClass('table-group-divider');
        tabledata1.addClass('light-bold');
        tabledata3.addClass('light-bold');
        tabledata5.addClass('light-bold');
        tabledata7.addClass('light-bold');
        tabledata9.addClass('light-bold');
        tabledata2.addClass('room-value');
        tabledata4.addClass('seatnum-value');
        tabledata6.addClass('datereq-value');
        tabledata8.addClass('dateres-value');
        tabledata10.addClass('timeres-value');
        tabledata11.addClass('username');

        tabledata1.text('CyberLab Room:')
        tabledata3.text('Seat numbers:');
        tabledata5.text('Date and Time of Request:');
        tabledata7.text('Date of Reservation:');
        tabledata9.text('Time Slot of Reservation:');
        tabledata2.text('CL03');
        tabledata11.text('Name of User');
        tabledata4.text(data.seatSelected.toString());
        let month;
        switch(data.dateReq.substring(5, 7)){
          case '01': month="January"; break;
          case '02': month="February"; break;
          case '03': month="March"; break;
          case '04': month="April"; break;
          case '05': month="May"; break;
          case '06': month="June"; break;
          case '07': month="July"; break;
          case '08': month="August"; break;
          case '09': month="September"; break;
          case '10': month="October"; break;
          case '11': month="November"; break;
          case '12': month="December"; break;
        }

        let dateRequested = month + " " + data.dateReq.substring(8, 10) + ", " + data.dateReq.substring(0, 4) + " Time: " +
        data.dateReq.substring(11, 16);
        tabledata6.text(dateRequested);
        
        month;
        switch(data.date.substring(5, 7)){
          case '01': month="January"; break;
          case '02': month="February"; break;
          case '03': month="March"; break;
          case '04': month="April"; break;
          case '05': month="May"; break;
          case '06': month="June"; break;
          case '07': month="July"; break;
          case '08': month="August"; break;
          case '09': month="September"; break;
          case '10': month="October"; break;
          case '11': month="November"; break;
          case '12': month="December"; break;
        }

        let dateReservation = month + " " + data.date.substring(8, 10) + ", " + data.date.substring(0, 4);
        tabledata8.text(dateReservation);
        tabledata10.text(data.time);
        tabledata12.text(data.user);

        let date = new Date();
        let currTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
        let currDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        if(currDate > data.date){
          pastReservationContainer.append(tableContainer);
          pastReservationCount += 1;
          tableHeader.html(`Reservation ${pastReservationCount}`);
        } else if(currDate == data.date && currTime > data.time.substring(data.time.length-5)){
          pastReservationContainer.append(tableContainer);
          pastReservationCount += 1;
          tableHeader.html(`Reservation ${pastReservationCount}`);
        } else {
          upcomingReservationContainer.append(tableContainer);
          upcomingReservationCount += 1;
          tableHeader.html(`Reservation ${upcomingReservationCount}`);
        }
        tableContainer.append(table);
        table.append(tableHeader);
        table.append(tbody);        
        tableHeader.append(editBtn);
        tableHeader.append(deleteBtn);
        tableHeader.append(cancelBtn);
        tableHeader.append(saveBtn);

        editBtn.text('Edit');
        deleteBtn.text('Delete');
        cancelBtn.text('Cancel');
        saveBtn.text('Save');

        tableContainer.addClass('container table-responsive col-xs-12 col-md-6');
        table.addClass('table table-primary table-hover table-striped-columns custom-font-content table-responsive');
        tableHeader.addClass('fs-3 bg-info-subtle p-2 text-primary');
        tableHeader.attr('colspan', '2');
        editBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success edit-btn");
        deleteBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger delete-btn d-none");
        deleteBtn.attr("disabled", "disabled");
        cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
        saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");
      }
    }
    ,
    error: function(error) {
      // Handle the error response from the server
      console.log('Error retrieving data:', error);
    }
  });

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

   // Checkbox change event listener
   $('#upcomingReservationContainer').on('change', '.form-check-input', function() {
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
  })

  function updateSelectedValues() {
    selectedValues = [];
    $('#upcomingReservationContainer').find('.form-check-input:checked').each(function() {
      selectedValues.push($(this).val());
    });
  }
  
  $('#upcomingReservationContainer').on('change', '.form-check-input', function() {
    updateSelectedValues();
  });
  
  $('#upcomingReservationContainer').on('click', '.edit-btn', function() {
    // Clear the selectedValues array before editing another table
    var selectedValues = [];
    let date = new Date();
      let currTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
      let currDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

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

    let pastTime = parseInt(currTimeRes.substring(3,5)) + 10;
    let newTime = currTimeRes.substring(0,3) + pastTime;

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

    if(currDate > newCurrDateRes){
      deleteBtn.removeAttr("disabled");
    } else if(currDate == currDateRes && currTime >= newTime){
      deleteBtn.removeAttr("disabled");
    }

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

    var container = $('<div>')
    var timeContainer = $('<div>')
    var title = $('<div>')
    var titleText = $('<p>')
    title.append(titleText);
    timeContainer.append(title);

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
        $(this).prop('checked', true);
      }
    });

    container.append(timeContainer);
    let prevTime = timeres.text();
    let prevTimeArray = prevTime.split(/,/);
    timeres.append(container);

    // Create a set to store the values in prevTimeArray
    let prevTimeSet = new Set(prevTimeArray);

    // Iterate over each checkbox and check it if the value is in prevTimeSet
    timeContainer.find('.form-check-input').each(function() {
      let value = $(this).val();
      if (prevTimeSet.has(value)) {
        $(this).prop('checked', true);
      }
    });
    updateSelectedValues();
  }) 

  $('#upcomingReservationContainer').on('click', '.cancel-btn', function() {
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
  
      seatnum.html(`${currSeatnum}`);
      timeres.html(`${currTimeRes}`);
    });
    

    function areTimeSlotsConsecutive(timeSlots) {
      if (timeSlots.length === 0) {
        return false;
      }
    
      timeSlots.sort();
      let i = 1;
      let a;
      for(let j = 0; j < timeSlots.length - 1; j++){
        a = timeSlots[j].substring(9);

        if(a != timeSlots[i].substring(0, 5)) {
          return false;
        }
        i += 1;
      }
      return true;
    }
  

  $('#upcomingReservationContainer').on('click', '.save-btn', function () {
    // Store a reference to the table element
    let table = $(this).closest("table");
    $.ajax({
      url: '/getAllReservations',
      method: 'POST',
      success: function(response) {
        const cl01 = response.cl01Data;
        const cl02 = response.cl02Data;
        const cl03 = response.cl03Data;
  
        let roomUsed;
        if(currRoom == 'CL01'){
          roomUsed = cl01;

        } else if(currRoom == 'CL02'){
          roomUsed = cl02;
        } else if(currRoom == 'CL03'){
          roomUsed = cl03;
        }
        
        let currrSeatnum = seatnum_form.val();
        if(currrSeatnum > 48 || currSeatnum <= 0){
          alert(`There is no seat no. ${currSeatnum}`);
          return;
        }

        if(currrSeatnum < 10 && currrSeatnum > 0 && currrSeatnum.substring(0,1) != 0){
          currrSeatnum = `0${currrSeatnum}`;
        }

        currrTimeRes = selectedValues.join(',');
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
        console.log(newCurrDateRes);
        
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

        /// get the time slots selected
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
          
          // Find the specific elements within the table and update their content
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
        
          // Perform the desired operations within the specific table
          saveBtn.addClass("d-none");
          editBtn.removeClass("d-none");
          cancelBtn.addClass("d-none");
          deleteBtn.addClass("d-none");


          let formData = [];
          formData.push({name: "roomName", value: currRoom});
          formData.push({name: "date", value: newCurrDateRes});
          formData.push({name: "newTimeRes", value: currrTimeRes})
          formData.push({name: "newSeatNum", value: currrSeatnum});
          formData.push({name: "prevSeat", value: previousSeat});
          formData.push({name: "prevTime", value: previousTime});
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

  $('#upcomingReservationContainer').on('click', '.delete-btn', function() {
    let div = $(this).closest("div");
    div.remove();

    // Find the closest table element
    let table = $(this).closest('table');

    // Find the edit button within the table
    let editBtn = table.find('.edit-btn');

    // Enable the edit button
    $('.edit-btn').not(editBtn).prop('disabled', false);
    
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


  // PAST ------------------

  // Checkbox change event listener
  $('#pastReservationContainer').on('change', '.form-check-input', function() {
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
  })

  function updateSelectedValues() {
    selectedValues = [];
    $('#pastReservationContainer').find('.form-check-input:checked').each(function() {
      selectedValues.push($(this).val());
    });
  }

  $('#pastReservationContainer').on('change', '.form-check-input', function() {
    updateSelectedValues();
  });

  $('#pastReservationContainer').on('click', '.edit-btn', function() {
    // Clear the selectedValues array before editing another table
    var selectedValues = [];
    let date = new Date();
      let currTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
      let currDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

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

    let pastTime = parseInt(currTimeRes.substring(3,5)) + 10;
    let newTime = currTimeRes.substring(0,3) + pastTime;

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
    if(currDate > newCurrDateRes){
      deleteBtn.removeAttr("disabled");
    } else if(currDate == currDateRes && currTime >= newTime){
      deleteBtn.removeAttr("disabled");
    }

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

    var container = $('<div>')
    var timeContainer = $('<div>')
    var title = $('<div>')
    var titleText = $('<p>')
    title.append(titleText);
    timeContainer.append(title);

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
        $(this).prop('checked', true);
      }
    });

    container.append(timeContainer);
    let prevTime = timeres.text();
    let prevTimeArray = prevTime.split(/,/);
    timeres.append(container);

    // Create a set to store the values in prevTimeArray
    let prevTimeSet = new Set(prevTimeArray);

    // Iterate over each checkbox and check it if the value is in prevTimeSet
    timeContainer.find('.form-check-input').each(function() {
      let value = $(this).val();
      if (prevTimeSet.has(value)) {
        $(this).prop('checked', true);
      }
    });
    updateSelectedValues();
  }) 

  $('#pastReservationContainer').on('click', '.cancel-btn', function() {
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
    
      seatnum.html(`${currSeatnum}`);
      timeres.html(`${currTimeRes}`);
    });
    

    function areTimeSlotsConsecutive(timeSlots) {
      if (timeSlots.length === 0) {
        return false;
      }
    
      timeSlots.sort();
      let i = 1;
      let a;
      for(let j = 0; j < timeSlots.length - 1; j++){
        a = timeSlots[j].substring(9);

        if(a != timeSlots[i].substring(0, 5)) {
          return false;
        }
        i += 1;
      }
      return true;
    }


  $('#pastReservationContainer').on('click', '.save-btn', function () {
    // Store a reference to the table element
    let table = $(this).closest("table");
    $.ajax({
      url: '/getAllReservations',
      method: 'POST',
      success: function(response) {
        // Handle the data received from the server

        const cl01 = response.cl01Data;
        const cl02 = response.cl02Data;
        const cl03 = response.cl03Data;
        // Use the arrays as needed

        let roomUsed;
        if(currRoom == 'CL01'){
          roomUsed = cl01;

        } else if(currRoom == 'CL02'){
          roomUsed = cl02;
        } else if(currRoom == 'CL03'){
          roomUsed = cl03;
        }
        
        let currrSeatnum = seatnum_form.val();
        if(currrSeatnum > 48 || currSeatnum <= 0){
          alert(`There is no seat no. ${currSeatnum}`);
          return;
        }

        if(currrSeatnum < 10 && currrSeatnum > 0 && currrSeatnum.substring(0,1) != 0){
          currrSeatnum = `0${currrSeatnum}`;
        }

        currrTimeRes = selectedValues.join(',');
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
        console.log(newCurrDateRes);
        
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

        /// get the time slots selected
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
          // Find the specific elements within the table and update their content
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
        
          // Perform the desired operations within the specific table
          saveBtn.addClass("d-none");
          editBtn.removeClass("d-none");
          cancelBtn.addClass("d-none");
          deleteBtn.addClass("d-none");


          let formData = [];
          formData.push({name: "roomName", value: currRoom});
          formData.push({name: "date", value: newCurrDateRes});
          formData.push({name: "newTimeRes", value: currrTimeRes})
          formData.push({name: "newSeatNum", value: currrSeatnum});
          formData.push({name: "prevSeat", value: previousSeat});
          formData.push({name: "prevTime", value: previousTime});
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

  $('#pastReservationContainer').on('click', '.delete-btn', function() {
    let div = $(this).closest("div");
    div.remove();

    // Find the closest table element
    let table = $(this).closest('table');

    // Find the edit button within the table
    let editBtn = table.find('.edit-btn');

    // Enable the edit button
    $('.edit-btn').not(editBtn).prop('disabled', false);
    
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
