const arrivals = data.arrivals;
const departures = data.departures;
const gateElem = document.getElementById("gate")
console.log(departures)
const arrivalsBtn = document.getElementById("arrivalsBtn");
const departuresBtn = document.getElementById("departuresBtn");
const dataElem = document.getElementById("data");

for (let i = 0; i < arrivals.length; i++) {
    const time = new Date(arrivals[i].sched).toLocaleTimeString();
    const timeStr = time.toString();
    const editedTimeStr = timeStr.slice(0, -3);
    dataElem.innerHTML += `<tr><td>${arrivals[i].fnr}</td>
                            <td>${arrivals[i].alname}</td>
                            <td>${arrivals[i].apname}</td>
                            <td>${editedTimeStr}</td>
                            <td>${arrivals[i].status}</td>
                            <td>${arrivals[i].terminal}</td></tr>`
}


arrivalsBtn.onclick = () => {
    dataElem.innerHTML = "";
    gateElem.style.display = "none";
    for (let i = 0; i < arrivals.length; i++) {
        const time = new Date(arrivals[i].sched).toLocaleTimeString();
        const timeStr = time.toString();
        const editedTimeStr = timeStr.slice(0, -3);
        dataElem.innerHTML += `<tr><td>${arrivals[i].fnr}</td>
                                <td>${arrivals[i].alname}</td>
                                <td>${arrivals[i].apname}</td>
                                <td>${editedTimeStr}</td>
                                <td>${arrivals[i].status}</td>
                                <td>${arrivals[i].terminal}</td></tr>`
    }
}

departuresBtn.onclick = () => {
    dataElem.innerHTML = "";
    gateElem.style.display = "";
    for (let i = 0; i < departures.length; i++) {
        const time = new Date(departures[i].sched).toLocaleTimeString();
        const timeStr = time.toString();
        const editedTimeStr = timeStr.slice(0, -3);
        dataElem.innerHTML += `<tr><td>${departures[i].fnr}</td>
                                <td>${departures[i].alname}</td>
                                <td>${departures[i].apname}</td>
                                <td>${editedTimeStr}</td>
                                <td>${departures[i].status}</td>
                                <td>${departures[i].terminal}</td>
                                <td>${departures[i].gate}</td></tr>`
    }
}