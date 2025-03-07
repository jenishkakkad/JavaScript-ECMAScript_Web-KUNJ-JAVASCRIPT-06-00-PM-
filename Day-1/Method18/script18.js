// ✨ 1. <style> element બનાવો અને CSS Inject કરો
let style = document.createElement("style");
style.innerHTML = `
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: lightgray;
        margin: 0;
    }
    .container {
        width: 400px;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        border: 5px solid black;
        background-color: white;
    }
    .circle {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 50%; /* Circle */
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
document.head.appendChild(style); // <head> માં CSS ઉમેરો

// ✨ 2. મોટું container div બનાવો
let container = document.createElement("div");
container.classList.add("container"); // CSS class add કરો

// ✨ 3. 3 child circles (div) બનાવો
for (let i = 1; i <= 3; i++) {
    let circle = document.createElement("div");
    circle.classList.add("circle"); // CSS class add કરો
    circle.innerText = i; // Number Add Inside Circle
    container.appendChild(circle); // Container માં Add કરો
}

// ✨ 4. Container ને Body માં Add કરો
document.body.appendChild(container);
