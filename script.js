const flightsData = {
    arrivals      : data.arrivals,
    departures    : data.departures,
}
console.log(flightsData)
// make a copy of original data
const origData           = JSON.parse(JSON.stringify(data));

// Desktop
const dataElem           = document.getElementById("data");
const fnElem             = document.getElementById("flightNumber");
const airlineElem        = document.getElementById("airline");
const directionElem      = document.getElementById("direction");
const timeElem           = document.getElementById("time");
const statusElem         = document.getElementById("status");
const terminalElem       = document.getElementById("terminal");
const gateElem           = document.getElementById("gate");
const switchElem         = document.getElementById("switch");
const typeElem           = document.getElementById("type");
const currentTimeElem    = document.getElementById("currentTime");
const directionTextElem  = document.getElementById("directionText");

// Mobile
const mDataElem          = document.getElementById("mData");
const mDirectionElem     = document.getElementById("mDirection");
const mDirectionTextElem = document.getElementById("mDirectionText");
const mFnElem            = document.getElementById("mFlightNumber");
const mStatusElem        = document.getElementById("mStatus");
const mTerminalElem      = document.getElementById("mTerminal");
const mGateElem          = document.getElementById("mGate");
const mTimeElem          = document.getElementById("mTime");
const mSwitchElem        = document.getElementById("mSwitch");

let tab                  = "arrivals";
let currentTime          = getLocalTime();

currentTimeElem.innerText = currentTime;

fnElem.onclick           = () => sort("fnr", fnElem);
airlineElem.onclick      = () => sort("alname", airlineElem);
directionElem.onclick    = () => sort("apname", directionElem);
timeElem.onclick         = () => sort("sched", timeElem);
statusElem.onclick       = () => sort("status", statusElem);
terminalElem.onclick     = () => sort("terminal", terminalElem);
gateElem.onclick         = () => sort("gate", gateElem);

mFnElem.onclick          = () => sort("fnr", mFnElem);
mDirectionElem.onclick   = () => sort("apname", mDirectionElem);
mStatusElem.onclick      = () => sort("status", mStatusElem);
mTerminalElem.onclick    = () => sort("terminal", mTerminalElem);
mGateElem.onclick        = () => sort("gate", mGateElem);
mTimeElem.onclick        = () => sort("sched", mTimeElem);

switchElem.onclick       = () => {
    tab == "arrivals" ? showDepartures() : showArrivals();
    reloadDataset(flightsData);
}
mSwitchElem.onclick      = () => {
    tab == "arrivals" ? showDepartures() : showArrivals();
    reloadDataset(flightsData);
}

function sort(column, element) {
    let type = element.dataset.sort;
    if (!type || type === "up") {
        flightsData[tab].sort((a, b) => {
            if (a[column] && !b[column]) return -1;
            if (b[column] && !a[column]) return 1;
            return a[column] > b[column] ? 1 : -1;
        });
        element.dataset.sort = "down";
    }

    else if (type === "down") {
        flightsData[tab].sort((a, b) => {
            if (a[column] && !b[column]) return -1;
            if (b[column] && !a[column]) return 1;
            return a[column] > b[column] ? -1 : 1;
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
    tab                             = "arrivals";
    typeElem.innerHTML              = "Arrivals";
    switchElem.innerText            = "View departures";
    mSwitchElem.innerText           = "View departures";
    directionTextElem.innerText     = "From";
    mDirectionTextElem.innerText    = "From";
    dataElem.innerHTML              = "";
    mDataElem.innerHTML             = "";
    gateElem.style.display          = "none";
    mGateElem.style.display         = "none";

    for (let i = 0; i < flightsData.arrivals.length; i++) {
        const time = getFormattedTime(flightsData.arrivals[i].sched);
        dataElem.innerHTML  += `<tr><td>${time}</td>
                                <td>${flightsData.arrivals[i].fnr}</td>
                                <td>${flightsData.arrivals[i].alname}</td>
                                <td>${flightsData.arrivals[i].apname}</td>
                                <td class="status">${flightsData.arrivals[i].status}</td>
                                <td>${flightsData.arrivals[i].terminal}</td></tr>`;

        mDataElem.innerHTML += `<tr><td>${time}</td>
                                <td>${flightsData.arrivals[i].fnr}<br>${flightsData.arrivals[i].alname}</td>
                                <td>${(flightsData.arrivals[i].apname).replace("/", "/ ")}</td>
                                <td class="status">${flightsData.arrivals[i].status}</td>
                                <td>${flightsData.arrivals[i].terminal}</td></tr>`;
    }
}

function showDepartures() {
    tab                             = "departures";
    typeElem.innerHTML              = "Departures";
    switchElem.innerText            = "View arrivals";
    mSwitchElem.innerText           = "View arrivals";
    directionTextElem.innerText     = "To";
    mDirectionTextElem.innerText    = "To";
    dataElem.innerHTML              = "";
    mDataElem.innerHTML             = "";
    gateElem.style.display          = "table-cell";
    mGateElem.style.display         = "table-cell";

    for (let i = 0; i < flightsData.departures.length; i++) {
        const time = getFormattedTime(flightsData.departures[i].sched);
        dataElem.innerHTML  += `<tr><td>${time}</td>
                                <td>${flightsData.departures[i].fnr}</td>
                                <td>${flightsData.departures[i].alname}</td>
                                <td>${flightsData.departures[i].apname}</td>
                                <td class="status">${flightsData.departures[i].status}</td>
                                <td>${flightsData.departures[i].terminal}</td>
                                <td>${flightsData.departures[i].gate}</td></tr>`;

        mDataElem.innerHTML += `<tr><td>${time}</td>
                                <td>${flightsData.departures[i].fnr}<br>${flightsData.departures[i].alname}</td>
                                <td>${(flightsData.departures[i].apname).replace("/", "/ ")}</td>
                                <td class="status">${flightsData.departures[i].status}</td>
                                <td>${flightsData.departures[i].terminal}</td>
                                <td>${flightsData.departures[i].gate}</td></tr>`;
    }
}

function getFormattedTime(date) {
    return date.substring(11, 16);
}

function reloadDataset(flightData) {
    reloadedData            = JSON.parse(JSON.stringify(origData));
    flightData.arrivals     = reloadedData.arrivals;
    flightData.departures   = reloadedData.departures;
}

function getLocalTime() {
    const timeZoneOffsetMs  = new Date().getTimezoneOffset() * 60000;
    const offsetDate        = (new Date(new Date().getTime() - timeZoneOffsetMs));
    const localTime         = offsetDate.toISOString().substring(11,19);
    return localTime;
}

setInterval(() => {
    currentTimeElem.innerText = getLocalTime();
}, 1000);

showArrivals();