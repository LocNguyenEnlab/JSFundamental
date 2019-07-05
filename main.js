var seats = [];
var freeSeats = [];
var bookedSeats = [];
var selectedSeats = [];
var moneyTotal = 0;
var bookedTickets = [];

for (var i = 'A'; i < 'J'; i = String.fromCharCode(i.charCodeAt(0) + 1)) {
    var x;
    for (var j = 1; j < 13; j++) {
        x = (i+j).toString()
        seats.push(x);
    }
}

function createSeats(seats) {
    var table = document.getElementById("seats");
    var row = table.insertRow();
    var count = 1;
    for (var seat of seats) {
        if (count == 13) {
            var row = table.insertRow();
            count = 1;
        }
        var cell = row.insertCell();
        var btn = document.createElement("button");
        btn.innerHTML = seat;
        btn.id = seat;
        btn.style.width = '100%';
        btn.style.backgroundColor = '#74e393';
        btn.style.border = 'none';
        btn.addEventListener('click', changeSeats);
        cell.appendChild(btn);
        freeSeats.push(btn);
        count++;
    }
}

createSeats(seats);

function bookTickets() {
    if (selectedSeats.length != 0) {
        var isConfirm = confirm("Are you sure to book tickets!");
        if (isConfirm) {

            for (var seat of selectedSeats) {         
                seat.style.backgroundColor = 'red';  
                bookedSeats.push(seat);    
            }

            selectedSeats = [];
            
            var ticket = {
                MovieName: document.getElementById("movie-name").textContent, 
                ShowTime: document.getElementById("show-time").textContent, 
                SeatsNumber: document.getElementById("booked-seats").textContent,
                BookedDatetime: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                TotalMoney: document.getElementById("money-total").textContent + " vnd",
                RemoveId: "ticket" + bookedTickets.length
            };

            bookedTickets.push(ticket);

            createTableOfListBookedTickets(ticket);

            document.getElementById("booked-seats").innerHTML = "";
            document.getElementById("money-total").textContent = 0;
            moneyTotal = 0;
        }
    }
    else {
        alert("No seats selected!");
    }
}

function createTableOfListBookedTickets(ticket) {
    var table = document.getElementById("list-booked-tickets");
    var row = table.insertRow();    
    for (var element in ticket) {
        var cell = row.insertCell();        
        if (element === "RemoveId") {
            var btnRemove = document.createElement("button");
            btnRemove.innerHTML = "x";
            btnRemove.style.border = "none";
            btnRemove.style.backgroundColor = "white";
            btnRemove.id = ticket[element];
            btnRemove.addEventListener('click', removeTicket);
            cell.appendChild(btnRemove);
            break;
        }
        var text = document.createTextNode(ticket[element]);
        cell.appendChild(text);        
    }
}

function changeSeats() {
    var btnSeat = document.getElementById(this.id);
    var freeSeatIndex = freeSeats.findIndex(s=>s.id === btnSeat.id); //findIndex return -1 if not found
    var selectedSeatIndex = selectedSeats.findIndex(s=>s.id === btnSeat.id);
    var textBoxBookedSeats = document.getElementById("booked-seats");

    if (freeSeatIndex != -1) {
        btnSeat.style.backgroundColor = "cyan";
        freeSeats.splice(freeSeatIndex, 1);
        selectedSeats.push(btnSeat);
        textBoxBookedSeats.innerHTML += (btnSeat.id + " ");
        moneyTotal += 45000;
        document.getElementById("money-total").textContent = moneyTotal.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').toString();
    } 
    else if (selectedSeatIndex != -1) {
        btnSeat.style.backgroundColor = "#74e393";
        freeSeats.push(btnSeat);
        selectedSeats.splice(selectedSeatIndex, 1);
        var bookedSeatsName = textBoxBookedSeats.textContent;
        bookedSeatsName = bookedSeatsName.replace(btnSeat.id, "");
        textBoxBookedSeats.innerHTML = bookedSeatsName;  
        moneyTotal -= 45000;
        document.getElementById("money-total").textContent = moneyTotal.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').toString();
    }
}

function removeTicket() {
    var isConfirm = confirm("Are you sure to remove this ticket!");
    if (isConfirm) {
        var rows = document.getElementById('list-booked-tickets').getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[5].childNodes[0].id === this.id) {
                //var timeBooked = rows[i].cells[3].childNodes[0].textContent;
                var ticket = bookedTickets.find(s=>s.RemoveId === this.id);
                var seats = ticket.SeatsNumber.split(" ");
                for (var seat of seats) {
                    if (seat === "")
                        continue;
                    var seatIndex = bookedSeats.findIndex(s=>s.id === seat);
                    bookedSeats.splice(seatIndex, 1);
                    var btn = document.getElementById(seat);
                    btn.style.backgroundColor = "#74e393";
                    freeSeats.push(btn);
                }
                document.getElementById('list-booked-tickets').deleteRow(i);            
                break;
            }
        }
    }
}