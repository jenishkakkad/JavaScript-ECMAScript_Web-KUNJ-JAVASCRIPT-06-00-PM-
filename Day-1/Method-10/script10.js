function updateClock() {
    let time = new Date().toLocaleTimeString(); // 🕒 વર્તમાન સમય મેળવો
    document.getElementById("clock").innerText = time; // ⏳ Update the Clock
}


setInterval(updateClock, 1000);


updateClock();