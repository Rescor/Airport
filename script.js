const flightsData = {
    arrivals      : data.arrivals,
    departures    : data.departures,
}
const dataElem      = document.getElementById("data");
const fnElem        = document.getElementById("flightNumber");
const airlineElem   = document.getElementById("airline");
const fromElem      = document.getElementById("from");
const timeElem      = document.getElementById("time");
const statusElem    = document.getElementById("status");
const terminalElem  = document.getElementById("terminal");
const gateElem      = document.getElementById("gate");
const arrivalsBtn   = document.getElementById("arrivalsBtn");
const departuresBtn = document.getElementById("departuresBtn");
let tab             = "arrivals";

function sort(column, element) {
    let type = element.dataset.sort;
    if (!type || type === "up") {
            flightsData[tab].sort((a, b) => {
                if (a[column] > b[column]) return 1;
                if (a[column] == b[column]) return 0;
                // We using '&& a[column]' because we want to show non-empty cells first
                if (a[column] < b[column] && a[column]) return -1;
            });
            element.dataset.sort = "down"
    }
    else if (type === "down") {
            flightsData[tab].sort((a, b) => {
                if (a[column] > b[column]) return -1;
                if (a[column] == b[column]) return 0;
                if (a[column] < b[column]) return 1;
            });
            element.dataset.sort = "up"
    }
    
    refreshDataScreen(tab);
}

fnElem.onclick          = () => sort("fnr", fnElem);
airlineElem.onclick     = () => sort("alname", airlineElem);

fromElem.onclick = () => sort("apname", fromElem);
timeElem.onclick = () => sort("time", timeElem);
statusElem.onclick = () => sort("status", statusElem);
terminalElem.onclick = () => sort("terminal", terminalElem);
gateElem.onclick        = () => sort("gate", gateElem);
timeElem.onclick        = () => sort("sched", timeElem)


function refreshDataScreen(tab) {
    if      (tab == "arrivals")     showArrivals();
    else if (tab == "departures")   showDepartures();
}

function showArrivals() {
    tab                     = "arrivals";
    dataElem.innerHTML      = "";
    gateElem.style.display  = "none";

    for (let i = 0; i < flightsData.arrivals.length; i++) {
        const time = getFormattedTime(flightsData.arrivals[i].sched);
        dataElem.innerHTML  += `<tr><td>${flightsData.arrivals[i].fnr}</td>
                                <td>${flightsData.arrivals[i].alname}</td>
                                <td>${flightsData.arrivals[i].apname}</td>
                                <td>${time}</td>
                                <td>${flightsData.arrivals[i].status}</td>
                                <td>${flightsData.arrivals[i].terminal}</td></tr>`
    }
}

function showDepartures() {
    tab                     = "departures";
    timeElem.dataset.sort   = "down";
    dataElem.innerHTML      = "";
    gateElem.style.display  = "table-cell";

    for (let i = 0; i < flightsData.departures.length; i++) {
        const time = getFormattedTime(flightsData.departures[i].sched);
        dataElem.innerHTML  += `<tr><td>${flightsData.departures[i].fnr}</td>
                                <td>${flightsData.departures[i].alname}</td>
                                <td>${flightsData.departures[i].apname}</td>
                                <td>${time}</td>
                                <td>${flightsData.departures[i].status}</td>
                                <td>${flightsData.departures[i].terminal}</td>
                                <td>${flightsData.departures[i].gate}</td></tr>`
    }
}

function getFormattedTime(date) {
    const time          = new Date(date).toLocaleTimeString();
    const editedTimeStr = time.slice(0, -3);
    return editedTimeStr;
}

arrivalsBtn.onclick     = () => showArrivals();
departuresBtn.onclick   = () => {
    sort("time", timeElem);
    showDepartures();
};

showArrivals();