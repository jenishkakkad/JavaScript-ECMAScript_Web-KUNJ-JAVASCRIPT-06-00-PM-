function updateClock() {
    let time = new Date().toLocaleTimeString(); // 🕒 Get Current Time
    document.getElementById("clock").innerText = time; // Update Clock UI
}

// Update Clock Every 1 Second
setInterval(updateClock, 1000);

// Set Clock Immediately When Page Loads
updateClock();