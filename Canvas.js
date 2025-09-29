
//Canvas pohjatiedot
let body = document.width

let canvas01 = document.getElementById("canvas01");
let ctx = canvas01.getContext("2d");
const img01 = new Image();

let testPois = 0;

//Globaali tavaravarasto, missä esineet pidetään
let inventory = [];

//Canvas leveys ja pituus
let canvasWidth = canvas01.width;
let canvasHeight = canvas01.height;

//Image 01 location data
//Testi kuvan sijainnin tallennus jotta sitä voidaan klikata
const image_one_location = {
    x: (canvasWidth/2 - 120),
    y: 150,
    width: 230,
    height: 230 
}

//Todennäköisesti tämä sama tehtävä jokaisen kuvakkeen kanssa? Esi tasoille varmaan omat JS tiedostot?
img01.onload = function() {

    refreshCanvas();
    
}

function refreshCanvas() {
    
    //resettoi canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    //Canvas tausta 
    ctx.fillStyle = "rgba(124, 124, 124, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //draw inventory, rect, outer + inner + move right and repeat from start
    for (let i = 0; i < 8; i++) {
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 110) + 215, 620, 320, 110);  //i * x tärkeä neliöiden koolle, sijoitukselle + jälkeen oleva numero
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 110) + 225, 627, 300, 95);
    };

    if (testPois === 0){
    //Canvas testi kuvan piirtäminen
    ctx.drawImage(img01, (canvasWidth / 2) - 120, 150, 150, 150); //kuva, X, Y, width, height
    }

    if (testPois === 1) {
        ctx.drawImage(img01, (0 * 110) + 215, 615, 120, 120); 
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
        ){
            testPois = 1;
            inventory.push("kuva01")
            console.log("klikkasit kuvaa", inventory);
            refreshCanvas();
        }
    });

}


img01.src = "kuvat/Item_01.png"


