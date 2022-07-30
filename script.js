const arrivals      = data.arrivals;
const departures    = data.departures;
const gateElem      = document.getElementById("gate")
const dataElem      = document.getElementById("data");
const arrivalsBtn   = document.getElementById("arrivalsBtn");
const departuresBtn = document.getElementById("departuresBtn");

function showArrivals() {
    dataElem.innerHTML      = "";
    gateElem.style.display  = "none";

    for (let i = 0; i < arrivals.length; i++) {
        const time = getFormattedTime(arrivals[i].sched);
        dataElem.innerHTML  += `<tr><td>${arrivals[i].fnr}</td>
                                <td>${arrivals[i].alname}</td>
                                <td>${arrivals[i].apname}</td>
                                <td>${time}</td>
                                <td>${arrivals[i].status}</td>
                                <td>${arrivals[i].terminal}</td></tr>`
    }
}

function showDepartures() {
    dataElem.innerHTML      = "";
    gateElem.style.display  = "table-cell";
    
    for (let i = 0; i < departures.length; i++) {
        const time = getFormattedTime(departures[i].sched);
        dataElem.innerHTML  += `<tr><td>${departures[i].fnr}</td>
                                <td>${departures[i].alname}</td>
                                <td>${departures[i].apname}</td>
                                <td>${time}</td>
                                <td>${departures[i].status}</td>
                                <td>${departures[i].terminal}</td>
                                <td>${departures[i].gate}</td></tr>`
    }
}

function getFormattedTime(date) {
    const time          = new Date(date).toLocaleTimeString();
    const editedTimeStr = time.slice(0, -3);
    return editedTimeStr;
}

arrivalsBtn.onclick     = () => showArrivals();
departuresBtn.onclick   = () => showDepartures();

showArrivals();