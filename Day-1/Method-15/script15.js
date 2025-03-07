// નવું <style> element બનાવો
let style = document.createElement("style");

// Inject થતો CSS
style.innerHTML = `
    body {
        background-color: cyan;
        color: black;
        text-align: center;
        font-family: Arial, sans-serif;
    }
    h1 {
        color: red;
        font-size: 2rem;
    }
    p {
        color: blue;
        font-size: 1.5rem;
    }
`;

// <head> માં CSS ઉમેરો
document.head.appendChild(style);

// -------- Now HTML Elements Create -------- //

// નવું h1 element બનાવો
let heading = document.createElement("h1");
heading.innerText = "Welcome to My Page"; // h1 નું ટેક્સ્ટ

// નવું p element બનાવો
let paragraph = document.createElement("p");
paragraph.innerText = "This is an example of adding HTML elements dynamically using JavaScript.";



// HTML body માં add કરો
document.body.appendChild(heading);
document.body.appendChild(paragraph);
