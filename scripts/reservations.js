$(document).ready(function(){
    $(".edit-btn").click(function(){
        // get the buttons
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

    $(".cancel-btn").click(function(){
        // get the buttons
        let th = $(this).parent();
        let editBtn = th.find(".edit-btn");
        let saveBtn = th.find(".save-btn");
        let deleteBtn = th.find(".delete-btn");

        $(this).addClass("d-none");
        editBtn.removeClass("d-none");
        saveBtn.addClass("d-none");
        deleteBtn.addClass("d-none")

        room.html(`${currRoom}`);
        seatnum.html(`${currSeatnum}`);
        datereq.html(`${currDateReq}`);
        timereq.html(`${currTimeReq}`);
        dateres.html(`${currDateRes}`);
        timeres.html(`${currTimeRes}`);

    })

    $(".save-btn").click(function(){
        // get the buttons
        let th = $(this).parent();
        let editBtn = th.find(".edit-btn");
        let cancelBtn = th.find(".cancel-btn");
        let deleteBtn = th.find(".delete-btn");

        $(this).addClass("d-none");
        editBtn.removeClass("d-none");
        cancelBtn.addClass("d-none");
        deleteBtn.addClass("d-none");
        
        currRoom = room_form.val();
        currSeatnum = seatnum_form.val();
        currDateReq = datereq_form.val();
        currTimeReq = timereq_form.val();
        currDateRes = dateres_form.val();
        currTimeRes = timeres_form.val();

        room.html(`${currRoom}`);
        seatnum.html(`${currSeatnum}`);
        datereq.html(`${currDateReq}`);
        timereq.html(`${currTimeReq}`);
        dateres.html(`${currDateRes}`);
        timeres.html(`${currTimeRes}`);

    })

    $(".delete-btn").click(function() {
        let div = $(this).closest("div");
        div.remove();
    })
})