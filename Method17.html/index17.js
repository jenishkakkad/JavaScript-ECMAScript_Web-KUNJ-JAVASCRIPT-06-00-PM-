let box = document.getElementById("container");

if (box) {
    box.innerHTML = "<h1>Hello</h1> <p>Love</p>"; // HTML Inject
    box.style.color = "red"; // Color Apply
    box.style.fontSize = "20px"; // Font Size
    box.style.border = "2px solid black"; // Border
} else {
    console.log("Error: container div not found!");
}
