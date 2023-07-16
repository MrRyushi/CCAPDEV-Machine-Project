$(document).ready(function(){
    $.ajax({
        url: '/getAllReservations',
        method: 'POST',
        success: function(response) {
          // Handle the data received from the server
          console.log("response:", response);
          const cl01Array = response.cl01Data;
          const cl02Array = response.cl02Data;
          const cl03Array = response.cl03Data;
          // Use the arrays as needed
          console.log("cl01Array:", cl01Array);
          console.log("cl02Array:", cl02Array);
          console.log("cl03Array:", cl03Array);
        
          // create elements 
          let reservationContainer = $('#reservationContainer');
          let reservationCount = 0;

          for(let data of cl01Array){
            let tableContainer = $('<div>');
            let table = $('<table>');
            let tbody  = $('<tbody>');
            let tableHeader = $('<th>');
            let editBtn = $('<button>');
            let deleteBtn = $('<button>');
            let cancelBtn = $('<button>');
            let saveBtn = $('<button>');
  
            reservationContainer.append(tableContainer);
            tableContainer.append(table);
            table.append(tableHeader);
            table.append(tbody);        
            reservationCount += 1;
            tableHeader.text(`Reservation ${reservationCount}`);
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
            cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
            saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");
  
            let tableRow2 = $('<tr>');
            let tableRow3 = $('<tr>');
            let tableRow4 = $('<tr>');
            let tableRow5 = $('<tr>');
            let tableRow6 = $('<tr>');
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
  
            tabledata1.text('CyberLab Room:')
            tabledata3.text('Seat numbers:');
            tabledata5.text('Date and Time of Request:');
            tabledata7.text('Date of Reservation:');
            tabledata9.text('Time Slot of Reservation:');
            tabledata2.text('CL01');
            tabledata4.text(data.seatSelected.toString());
            tabledata6.text(data.dateReq);
            tabledata8.text(data.date);
            tabledata10.text(data.time);
          }
  
          for(let data of cl02Array){
            let tableContainer = $('<div>');
            let table = $('<table>');
            let tbody  = $('<tbody>');
            let tableHeader = $('<th>');
            tableHeader.html(`Reservation ${reservationCount}`);
            let editBtn = $('<button>');
            let deleteBtn = $('<button>');
            let cancelBtn = $('<button>');
            let saveBtn = $('<button>');
  
            reservationContainer.append(tableContainer);
            tableContainer.append(table);
            table.append(tableHeader);
            table.append(tbody);        
            reservationCount += 1;
            tableHeader.text(`Reservation ${reservationCount}`);
            tableHeader.append(editBtn);
            tableHeader.append(deleteBtn);
            tableHeader.append(cancelBtn);
            tableHeader.append(saveBtn);
  
            tableContainer.addClass('container table-responsive col-xs-12 col-md-6');
            table.addClass('table table-primary table-hover table-striped-columns custom-font-content table-responsive');
            tableHeader.addClass('fs-3 bg-info-subtle p-2 text-primary');
            tableHeader.attr('colspan', '2');
            editBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success edit-btn");
            deleteBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger delete-btn d-none");
            cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
            saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");
  
            editBtn.text('Edit');
            deleteBtn.text('Delete');
            cancelBtn.text('Cancel');
            saveBtn.text('Save');
  
            let tableRow2 = $('<tr>');
            let tableRow3 = $('<tr>');
            let tableRow4 = $('<tr>');
            let tableRow5 = $('<tr>');
            let tableRow6 = $('<tr>');
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
  
            tabledata1.text('CyberLab Room:')
            tabledata3.text('Seat numbers:');
            tabledata5.text('Date and Time of Request:');
            tabledata7.text('Date of Reservation:');
            tabledata9.text('Time Slot of Reservation:');
            tabledata2.text('CL02');
            tabledata4.text(data.seatSelected.toString());
            tabledata6.text(data.dateReq);
            tabledata8.text(data.date);
            tabledata10.text(data.time);
          }
  
          for(let data of cl03Array){
            let tableContainer = $('<div>');
            let table = $('<table>');
            let tbody  = $('<tbody>');
            let tableHeader = $('<th>');
           // let title = $('<p>');
            let editBtn = $('<button>');
            let deleteBtn = $('<button>');
            let cancelBtn = $('<button>');
            let saveBtn = $('<button>');
  
            reservationContainer.append(tableContainer);
            tableContainer.append(table);
            table.append(tableHeader);
            table.append(tbody);        
            reservationCount += 1;
            tableHeader.html(`Reservation ${reservationCount}`);
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
            cancelBtn.addClass("mx-1 mt-1 float-end btn btn-outline-danger cancel-btn d-none");
            saveBtn.addClass("mx-1 mt-1 float-end btn btn-outline-success save-btn d-none");
  
            let tableRow2 = $('<tr>');
            let tableRow3 = $('<tr>');
            let tableRow4 = $('<tr>');
            let tableRow5 = $('<tr>');
            let tableRow6 = $('<tr>');
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
  
            tabledata1.text('CyberLab Room:')
            tabledata3.text('Seat numbers:');
            tabledata5.text('Date and Time of Request:');
            tabledata7.text('Date of Reservation:');
            tabledata9.text('Time Slot of Reservation:');
            tabledata2.text('CL03');
            tabledata4.text(data.seatSelected.toString());
            tabledata6.text(data.dateReq);
            tabledata8.text(data.date);
            tabledata10.text(data.time);
          }
        }
        ,
        error: function(error) {
          // Handle the error response from the server
          console.log('Error retrieving data:', error);
        }
      });

      $('#reservationContainer').on('click', '.edit-btn', function() {
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

        // create forms
        // room
        room.html("");
        room_form = $("<select>");    
        var option1 = $('<option>').text('CL01').val('CL01');
        var option2 = $('<option>').text('CL02').val('CL02');
        var option3 = $('<option>').text('CL03').val('CL03');
        room_form.append(option1, option2, option3);
        room_form.addClass("room-form form-control");
        room_form.attr("cols", "13");
        room_form.attr("placeholder", `${currRoom}`);
        room_form.attr("value", `${currRoom}`);
        room.append(room_form);

        // seat num
        seatnum.html("");
        seatnum_form = $("<input>");
        seatnum_form.addClass("room-form form-control");
        seatnum_form.attr("type", "text");
        seatnum_form.attr("placeholder", `${currSeatnum}`);
        seatnum_form.attr("value", `${currSeatnum}`);
        seatnum.append(seatnum_form);

        // date request
        datereq.html("");
        datereq_form = $("<input>");
        datereq_form.attr("type", "datetime-local")
        datereq_form.addClass("room-form form-control");
        datereq_form.val(currDateReq);
        datereq.append(datereq_form);

        // time request
        timereq.html("");
        timereq_form = $("<input>");
        timereq_form.addClass("room-form form-control");
        timereq_form.attr("type", "text");
        timereq_form.attr("placeholder", `${currTimeReq}`);
        timereq_form.attr("value", `${currTimeReq}`);
        timereq.append(timereq_form);
        
        // date resereved
        dateres.html("");
        dateres_form = $("<input>");
        dateres_form.addClass("room-form form-control");
        dateres_form.attr("type", "date");
        dateres_form.val(currDateRes);
        dateres.append(dateres_form);

        // time reserved
        timeres.html("");
        timeres_form = $("<select>");
        var op1 = $('<option>').text('09:00 to 09:30').val('09:00 to 09:30');
        var op2 = $('<option>').text('09:30 to 10:00').val('09:30 to 10:00');
        var op3 = $('<option>').text('10:00 to 10:30').val('10:00 to 10:30');
        var op4 = $('<option>').text('10:30 to 11:00').val('10:30 to 11:00');
        var op5 = $('<option>').text('11:00 to 11:30').val('11:00 to 11:30');
        var op6 = $('<option>').text('11:30 to 12:00').val('11:30 to 12:00');
        var op7 = $('<option>').text('12:00 to 12:30').val('12:00 to 12:30');
        var op8 = $('<option>').text('12:30 to 13:00').val('12:30 to 13:00');
        var op9 = $('<option>').text('13:00 to 13:30').val('13:00 to 13:30');
        var op10 = $('<option>').text('13:30 to 14:00').val('13:30 to 14:00');
        var op11 = $('<option>').text('14:00 to 14:30').val('14:00 to 14:30');
        var op12 = $('<option>').text('14:30 to 15:00').val('14:30 to 15:00');
        var op13 = $('<option>').text('15:00 to 15:30').val('15:00 to 15:30');
        var op14 = $('<option>').text('15:30 to 16:00').val('15:30 to 16:00');
        var op15 = $('<option>').text('16:00 to 16:30').val('16:00 to 16:30');
        var op16 = $('<option>').text('16:30 to 17:00').val('16:30 to 17:00');
        timeres_form.append(op1, op2, op3, op4, op5, op6, op7, op8, op9, op10, op11, op12, op13, op14, op15, op16);
        timeres_form.addClass("room-form form-control");
        timeres_form.attr("placeholder", `${currTimeRes}`);
        timeres.append(timeres_form);
    }) 

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
        let room = table.find(".room-value");
        let seatnum = table.find(".seatnum-value");
        let datereq = table.find(".datereq-value");
        let timereq = table.find(".timereq-value");
        let dateres = table.find(".dateres-value");
        let timeres = table.find(".timeres-value");
      
        room.html(`${currRoom}`);
        seatnum.html(`${currSeatnum}`);
        datereq.html(`${currDateReq}`);
        timereq.html(`${currTimeReq}`);
        dateres.html(`${currDateRes}`);
        timeres.html(`${currTimeRes}`);
      });


    $('#reservationContainer').on('click', '.save-btn', function() {
        // Find the closest table element
        let table = $(this).closest('table');
      
        // Find the buttons within the table
        let editBtn = table.find(".edit-btn");
        let cancelBtn = table.find(".cancel-btn");
        let deleteBtn = table.find(".delete-btn");

        // Enable all other edit buttons
        $('.edit-btn').not(editBtn).prop('disabled', false);
      
        // Perform the desired operations within the specific table
        $(this).addClass("d-none");
        editBtn.removeClass("d-none");
        cancelBtn.addClass("d-none");
        deleteBtn.addClass("d-none");
      
        // Find the specific form elements within the table and update their content
        let currRoom = room_form.val();
        let currSeatnum = seatnum_form.val();
        let currDateReq = datereq_form.val();
        let currTimeReq = timereq_form.val();
        let currDateRes = dateres_form.val();
        let currTimeRes = timeres_form.val();
      
        // Find the specific elements within the table and update their content
        let room = table.find(".room-value");
        let seatnum = table.find(".seatnum-value");
        let datereq = table.find(".datereq-value");
        let timereq = table.find(".timereq-value");
        let dateres = table.find(".dateres-value");
        let timeres = table.find(".timeres-value");
      
        room.html(`${currRoom}`);
        seatnum.html(`${currSeatnum}`);
        datereq.html(`${currDateReq}`);
        timereq.html(`${currTimeReq}`);
        dateres.html(`${currDateRes}`);
        timeres.html(`${currTimeRes}`);
      });

      $('#reservationContainer').on('click', '.delete-btn', function() {
        let div = $(this).closest("div");
        div.remove();
    
        // Find the closest table element
        let table = $(this).closest('table');
    
        // Find the edit button within the table
        let editBtn = table.find('.edit-btn');
    
        // Enable the edit button
        $('.edit-btn').not(editBtn).prop('disabled', false);
    });
})