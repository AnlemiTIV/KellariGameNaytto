
//Tällä luodaan uusi ikkuna missä esineiden mixaus tehdään, mistä voi myös poistua takaisin defaultti pelin näkymään
function createMixingWindow(){

    //Ruudun tyhjennys koska uudessa ikkunassa, ehkä ei paras mutta joissakin
    //peleissä tehdään sama juttu reppujen tai karttojen kanssa joten ihan sama
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "rgba(92, 90, 90, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //Pohja ikkuna
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.fillRect(315, 96, 900, 605);
    ctx.fillStyle = "rgba(137, 128, 173, 1)"
    ctx.fillRect(321, 101, 888, 595);
    //X = -40 > 315 (360 og)
    //315 + 6 = 321 with inner color
    //Width, Height OG 810,561 and 798, 550 //add 30 to each

    //inventory    
    for (let i = 0; i < 6; i++) {
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 135) + 350, 460, 140, 115);
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 135) + 360, 470, 120, 95);
        
    }

    //3 Slottia
    for (let i = 0; i < 3; i++){
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 175) + 370, 250, 148, 127);
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 175) + 380, 260, 128, 107);
    }

    //Nuoli oikeaan suuntaan
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.moveTo(888, 297); //OG 900, 297 //muutos 888, 297
    ctx.lineTo(888, 336); //900, 336
    ctx.lineTo(928, 336); //940, 336
    ctx.lineTo(928, 357); //940, 357
    ctx.lineTo(974, 318); //986, 318
    ctx.lineTo(928, 278); //940, 278
    ctx.lineTo(928, 297); //940, 297
    ctx.closePath();
    ctx.stroke();

    //tulos slot
    ctx.fillStyle = "rgba(146, 192, 204, 1)";
    ctx.fillRect((628 + 370), 250, 148, 127)
    ctx.fillStyle = "rgba(122, 140, 143, 1)";
    ctx.fillRect((628 + 380), 260, 128, 107);

    //Poistu-painike
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.fillRect(345, 110, 110, 50);
    ctx.fillStyle = "rgba(204, 89, 133, 1)";
    ctx.beginPath();
    ctx.fillRect(350, 115, 100, 40);
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.fillText("Poistu", 400, 135);


    //inventory esineet
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

}

    //Sekoita-painike
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.fillRect(675, 594, 180, 70);
    ctx.fillStyle = "rgba(89, 131, 204, 1)";
    ctx.beginPath();
    ctx.fillRect(680, 599, 170, 60);
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.font = "30px Arial";
    ctx.fillText("Sekoita", 764, 627);
    ctx.font = "22px Arial";


    //Poistuminen takaisin pelin defaultti näkymään
    canvas01.addEventListener("click", (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    if (
        isMixingWindowOpen === true &&
        mouseX >= 345 &&
        mouseX <= 345 + 110 &&
        mouseY >= 110 &&
        mouseY <= 110 + 50) {

        if (typeof refreshCanvas === "function") {
            
            isMixingWindowOpen = false;
            refreshCanvas();
        }
        return;
    }
    });

}