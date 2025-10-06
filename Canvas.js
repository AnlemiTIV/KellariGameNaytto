//Canvas pohjatiedot
let body = document.width

let canvas01 = document.getElementById("canvas01");
let ctx = canvas01.getContext("2d");
const img01 = new Image();
const img02 = new Image();
const imgMixed = new Image();
const imgboss = new Image();

let testPois = 0;
let testPois2 = 0;

//Globaali tavaravarasto, missä esineet pidetään.
let inventory = [0, 0, 0, 0, 0, 0, 0];

//Canvas leveys ja pituus
let canvasWidth = canvas01.width;
let canvasHeight = canvas01.height;

//Location data
const locations = {
    Img1: {
        x: (canvasWidth/2 - 120),
        y: 150,
        width: 230,
        height: 230 
    },

    // Image 02 location data (esim. oikealle item_01:stä)
    Img2: {
        x: (canvasWidth/2 + 120),
        y: 150,
        width: 230,
        height: 230
    },

    boss: {
        x: (canvasWidth/2 - 150),
        y: 20,
        width: 300,
        height: 200,
        alive: true
    }
};

img01.onload = function() {
    refreshCanvas();
}
img02.onload = function() {
    refreshCanvas();
}
imgMixed.src = "kuvat/Mixed_01.png";

imgboss.onload = function() {
    refreshCanvas();
}

function refreshCanvas() {
    //resetoi canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    //Canvas tausta 
    ctx.fillStyle = "rgba(124, 124, 124, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //draw inventory, rect, outer + inner + move right and repeat from start
    for (let i = 0; i < 8; i++) {
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 110) + 215, 620, 320, 110);
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 110) + 225, 627, 300, 95);
    }

    // Piirrä item_01, jos sitä ei ole otettu
    if (testPois === 0){
        ctx.drawImage(img01, locations.Img1.x, locations.Img1.y, locations.Img1.width, locations.Img1.height);
    }
    // Piirrä item_02, jos sitä ei ole otettu
    if (testPois2 === 0){
        ctx.drawImage(img02, locations.Img2.x, locations.Img2.y, locations.Img2.width, locations.Img2.height);
    }
    // Piirrä boss
    if (locations.boss.alive) {
        ctx.drawImage(imgboss, locations.boss.x, locations.boss.y, locations.boss.width, locations.boss.height);
    }


    // Piirrä inventaarion esineet
    let invIndex = 0;
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        if (item === "kuva01") {
            ctx.drawImage(img01, (invIndex * 110) + 215, 615, 120, 120);
            invIndex++;
        } else if (item === "item02") {
            ctx.drawImage(img02, (invIndex * 110) + 215, 615, 120, 120);
            invIndex++;
        } else if (item === "MixTest") {
            ctx.drawImage(imgMixed, (invIndex * 110) + 215, 615, 120, 120);
            invIndex++;
        }
        // Lisää muita esineitä tarvittaessa
    }

    // Piirrä yhdistys-nappi canvasin päälle
    drawMixButton();
}

// Yhdistys-napin piirto
function drawMixButton() {
    ctx.save();
    // Lasketaan viimeisen slotin oikea reuna
    const slotX = (7 * 72) + 215 + 225; // 7. slotin vasen + slotin sisäosan left offset
    const slotY = 627;
    const slotWidth = 300;
    const slotHeight = 95;

    // Nappi slotin sisälle (pienempi kuin slot)
    const btnWidth = 180;
    const btnHeight = 40;
    const btnX = slotX + slotWidth - btnWidth - 10; // 10px marginaali oikeasta reunasta
    const btnY = slotY + slotHeight/2 - btnHeight/2;

    ctx.fillStyle = "#8ad";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
    ctx.strokeRect(btnX, btnY, btnWidth, btnHeight);
    ctx.fillStyle = "#000";
    ctx.font = "22px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Yhdistys test", btnX + btnWidth/2, btnY + btnHeight/2);
    ctx.restore();

    
    mixBtnArea = { x: btnX, y: btnY, w: btnWidth, h: btnHeight };
}

// Poista vanhat click-listenerit (ettei tule tuplaklikkauksia)
canvas01.replaceWith(canvas01.cloneNode(true));
canvas01 = document.getElementById("canvas01");
ctx = canvas01.getContext("2d");

canvas01.addEventListener("click", (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    

    // Yhdistys-napin alue
    if (
        mixBtnArea &&
        mouseX >= mixBtnArea.x &&
        mouseX <= mixBtnArea.x + mixBtnArea.w &&
        mouseY >= mixBtnArea.y &&
        mouseY <= mixBtnArea.y + mixBtnArea.h
    ) {
        if (typeof tryMix === "function") {
            tryMix();
            refreshCanvas();
        }
        return;
    }

    // item_01
    if (
        testPois === 0 &&
        mouseX >= locations.Img1.x &&
        mouseX <= locations.Img1.x + locations.Img1.width &&
        mouseY >= locations.Img1.y &&
        mouseY <= locations.Img1.y + locations.Img1.height
    ){
        testPois = 1;
        inventory.push("kuva01");
        refreshCanvas();
        return;
    }

    // item_02
    if (
        testPois2 === 0 &&
        mouseX >= locations.Img2.x &&
        mouseX <= locations.Img2.x + locations.Img2.width &&
        mouseY >= locations.Img2.y &&
        mouseY <= locations.Img2.y + locations.Img2.height
    ){
        testPois2 = 1;
        inventory.push("item02");
        refreshCanvas();
        return;
    }

    // Boss Poisto test
    if (
        mouseX >= locations.boss.x &&
        mouseX <= locations.boss.x + locations.boss.width &&
        mouseY >= locations.boss.y &&
        mouseY <= locations.boss.y + locations.boss.height
    ){
        inventory = inventory.filter(item => item !== "MixTest");
        locations.boss.alive = false;
        
        refreshCanvas();
        return;
    }

});

img01.src = "kuvat/Item_01.png";
img02.src = "kuvat/Item_02.png";
imgboss.src = "kuvat/Boss_01.png";