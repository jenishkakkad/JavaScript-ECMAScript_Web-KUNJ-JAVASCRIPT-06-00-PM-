let box = document.getElementsByClassName("container");

// જો .container class હોય તો જ એમાં style add કરવું
if (box.length > 0) {
    box[0].style.color = "red";
    box[0].style.height = "200px";
    box[0].style.width = "200px";
    box[0].style.border = "5px solid black"; // સુધારેલ બોર્ડર
}
