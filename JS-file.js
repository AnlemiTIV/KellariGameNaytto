//Canvas pohjatiedot
let body = document.width
let canvas01 = document.getElementById("canvas01");
let ctx = canvas01.getContext("2d");
const img = new Image();

//Canvas leveys ja pituus
let canvasWidth = canvas01.width;
let canvasHeight = canvas01.height;

//canvas01.width = window.innerWidth;
//canvas01.height = window.innerHeight;

img.onload = function() {
    //Canvas tausta
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //Canvas testi kuvan piirtäminen
    ctx.drawImage(img, (canvasWidth / 2) - 120, 150, 230, 230); //kuva, X, Y, width, height

    //Testi kuvan sijainnin tallennus jotta sitä voidaan klikata
    const image_one_location = {    
    x: (canvasWidth/2 - 120),
    y: 150,
    width: 230,
    height: 230 
}

    //Testataan voidaanko kohdetta klikata, 23.9.2025 AL
    canvas01.addEventListener("click", (e) => {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        
        if ( 
            mouseX >= image_one_location.x &&
            mouseX <= image_one_location.x + image_one_location.width &&
            mouseY >= image_one_location.y &&
            mouseY <= image_one_location.y + image_one_location.height
        )
        {
            console.log("klikkasit kuvaa");
        }
    });
}

img.src = "kuvat/Item_01.png"
