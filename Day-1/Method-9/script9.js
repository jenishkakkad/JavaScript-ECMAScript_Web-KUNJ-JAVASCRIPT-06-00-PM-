setInterval(function () {
    let time = new Date().toLocaleTimeString(); 
    document.getElementById("clock").innerText = time; 
}, 1000); 
