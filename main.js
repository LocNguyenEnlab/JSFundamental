var seats = [ ]
var freeSeats = [];
var bookedSeats = [];
var selectedSeats = [];
var moneyTotal = 0;

var bookedTickets = [
    {MovieName: "Movie name", ShowTime: "Show time", SeatsNumber:"Seats number", BookedDatetime: "Booked Date time", TotalMoney: "Total money", Remove: "Remove"}
]

for (var i = 'A'; i < 'J'; i = String.fromCharCode(i.charCodeAt(0) + 1)) {
    var x;
    for (var j = 1; j < 13; j++) {
        x = (i+j).toString()
        seats.push(x);
    }
}

function createSeats(data) {
    var table = document.getElementById("seats");
    var row = table.insertRow();
    var count = 1;
    for (var element of data) {
        if (count == 13) {
            var row = table.insertRow();
            count = 1;
        }
        var cell = row.insertCell();
        var btn = document.createElement("button");
        btn.innerHTML = element;
        btn.id = element;
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



p = document.getElementById("date-time").innerHTML = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

function bookTickets() {
    if (selectedSeats.length != 0) {
        var isConfirm = confirm("Are you sure to book tickets!");
        if (isConfirm) {
            var selectedLength = selectedSeats.length;
        
            for (var i = 0; i < selectedLength; i++) {
                var seat = selectedSeats.pop();            
                seat.style.backgroundColor = 'red';  
                bookedSeats.push(seat);    
            }
            
            var ticket = {MovieName: document.getElementById("movie-name").textContent, 
            ShowTime: document.getElementById("show-time").textContent, 
            SeatsNumber: document.getElementById("booked-seats").textContent,
            BookedDatetime: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
            TotalMoney: document.getElementById("money-total").textContent,
            Remove: "..."}

            bookedTickets.push(ticket);

            createTableOfListBookedTickets(bookedTickets);

            document.getElementById("booked-seats").innerHTML = "";
            document.getElementById("money-total").textContent = 0;
            moneyTotal = 0;
        }
    }
    else {
        alert("No seats selected!");
    }
}

function createTableHeadOfListBookedTickets(data) {
    var table = document.getElementById("list-booked-tickets");
    var thead = table.createTHead();
    var row = thead.insertRow();
    var element = data[0];
    for (key in element) {
        var th = document.createElement("th");
        th.style.textAlign = "center";
        var text = document.createTextNode(element[key]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

createTableHeadOfListBookedTickets(bookedTickets); //Object.keys(tickets[0])

function createTableOfListBookedTickets(data) {
    var table = document.getElementById("list-booked-tickets");
    var element = data[data.length-1];
    var row = table.insertRow();    
    for (key in element) {
        var cell = row.insertCell();        
        if (key === "Remove") {
            var btnRemove = document.createElement("button");
            btnRemove.innerHTML = "x";
            btnRemove.style.border = "none";
            btnRemove.style.backgroundColor = "white";
            btnRemove.id = "ticket" + (data.length - 1);
            btnRemove.addEventListener('click', RemoveTicket);
            cell.appendChild(btnRemove);
            break;
        }
        var text = document.createTextNode(element[key]);
        cell.appendChild(text);        
    }
}

function changeSeats() {
    var btn = document.getElementById(this.id);
    var freeSeatIndex = freeSeats.findIndex(s=>s.id === btn.id, 1);
    var bookedSeatIndex = bookedSeats.findIndex(s=>s.id === btn.id, 1);
    var textBoxBookedSeats = document.getElementById("booked-seats");
    if (freeSeats[freeSeatIndex]) {
        btn.style.backgroundColor = "cyan";
        freeSeats.splice(freeSeatIndex, 1);
        selectedSeats.push(btn);
        textBoxBookedSeats.innerHTML += (btn.id + " ");
        moneyTotal += 45000;
        document.getElementById("money-total").textContent = moneyTotal;
    } 
    else if (!bookedSeats[bookedSeatIndex]) {
        btn.style.backgroundColor = "#74e393";
        var selectedSeatIndex = selectedSeats.findIndex(s=>s.id === btn.id);
        freeSeats.push(btn);
        selectedSeats.splice(selectedSeatIndex, 1);
        var bookedSeatName = textBoxBookedSeats.textContent;
        bookedSeatName = bookedSeatName.replace(btn.id, "");
        textBoxBookedSeats.innerHTML = bookedSeatName;  
        moneyTotal -= 45000;
        document.getElementById("money-total").textContent = moneyTotal;
    }
}

function RemoveTicket() {
    var isConfirm = confirm("Are you sure to remove this ticket!");
    if (isConfirm) {
        var rows = document.getElementById('list-booked-tickets').getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[5].childNodes[0].id === this.id) {
                var timeBooked = rows[i].cells[3].childNodes[0].textContent;
                var ticket = bookedTickets.find(s=>s.BookedDatetime === timeBooked);
                var seats = ticket.SeatsNumber.split(" ");
                for (seat of seats) {
                    try {
                        var seatIndex = bookedSeats.findIndex(s=>s.id === seat);
                        bookedSeats.splice(seatIndex, 1);
                        var btn = document.getElementById(seat);
                        btn.style.backgroundColor = "#74e393";
                        freeSeats.push(btn);
                    }
                    catch
                    {

                    }
                }
                document.getElementById('list-booked-tickets').deleteRow(i);            
                break;
            }
        }
        for (var i = 0; i < bookedTickets.length; i++) {
            var x = (bookedTickets[i])
        }
    }
}