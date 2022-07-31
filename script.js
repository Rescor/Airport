const flightsData = {
    arrivals      : data.arrivals,
    departures    : data.departures,
}
const dataElem          = document.getElementById("data");
const fnElem            = document.getElementById("flightNumber");
const airlineElem       = document.getElementById("airline");
const directionElem     = document.getElementById("direction");
const timeElem          = document.getElementById("time");
const statusElem        = document.getElementById("status");
const terminalElem      = document.getElementById("terminal");
const gateElem          = document.getElementById("gate");
const switchElem        = document.getElementById("switch");
const typeElem          = document.getElementById("type");
const currentTimeElem   = document.getElementById("currentTime");
const directionTextElem = document.getElementById("directionText");
let tab                 = "arrivals";
let currentTime         = new Date().toLocaleTimeString();

currentTimeElem.innerText = currentTime;

fnElem.onclick          = () => sort("fnr", fnElem);
airlineElem.onclick     = () => sort("alname", airlineElem);
directionElem.onclick   = () => sort("apname", directionElem);
timeElem.onclick        = () => sort("time", timeElem);
statusElem.onclick      = () => sort("status", statusElem);
terminalElem.onclick    = () => sort("terminal", terminalElem);
gateElem.onclick        = () => sort("gate", gateElem);
timeElem.onclick        = () => sort("sched", timeElem);
switchElem.onclick      = () => tab == "arrivals" ? showDepartures() : showArrivals();

function sort(column, element) {
    let type = element.dataset.sort;
    console.log(type)
    if (!type || type === "up") {
            flightsData[tab].sort((a, b) => {
                if (a[column] > b[column]) return 1;
                if (a[column] == b[column]) return 0;
                // We using '&& a[column]' because we want to show non-empty cells first
                if (a[column] < b[column] && a[column]) return -1;
            });
            element.dataset.sort = "down";
    }

    else if (type === "down") {
            flightsData[tab].sort((a, b) => {
                if (a[column] > b[column]) return -1;
                if (a[column] == b[column]) return 0;
                if (a[column] < b[column]) return 1;
            });
            element.dataset.sort = "up";
    }

    refreshDataScreen(tab);
}

function refreshDataScreen(tab) {
    if      (tab == "arrivals")     showArrivals();
    else if (tab == "departures")   showDepartures();
}

function showArrivals() {
    tab                     = "arrivals";
    typeElem.innerHTML      = "Arrivals";
    switchElem.innerText    = "Switch to departures"
    directionTextElem.innerText  = "From"
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
    typeElem.innerHTML      = "Departures";
    switchElem.innerText    = "Switch to arrivals";
    directionTextElem.innerText  = "To"
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

setInterval(() => {
    currentTime = new Date().toLocaleTimeString();
    currentTimeElem.innerText = currentTime;
}, 1000)

showArrivals();