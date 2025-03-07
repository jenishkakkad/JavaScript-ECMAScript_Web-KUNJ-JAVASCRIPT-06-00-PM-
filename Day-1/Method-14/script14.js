// નવું h1 element બનાવો
let heading = document.createElement("h1");
heading.innerText = "Welcome to My Page"; // h1 નું ટેક્સ્ટ
heading.style.color = "red"; // h1 નું રંગ
heading.style.textAlign = "center"; // h1 text center

// નવું p element બનાવો
let paragraph = document.createElement("p");
paragraph.innerText = "This is an example of adding HTML elements dynamically using JavaScript.";
paragraph.style.color = "blue"; // p નું રંગ
paragraph.style.fontSize = "1.5rem"; // p નો font size
paragraph.style.textAlign = "center"; // p text center
paragraph.style.backgroundColor = "yellow";

// HTML body માં add કરો
document.body.appendChild(heading);
document.body.appendChild(paragraph);
