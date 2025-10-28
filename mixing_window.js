
// Tässä varastoidaan mixing slottien esineet, mixing slot results:ille omat muuttuja/Array?
let mixingSlots = [0, 0, 0];
let mixingLimit = 0; //jos 3, ei voi enää lisätä, mutta vähenee 1:llä jos mixing sloteista klikataan esinettä
//mixingLimit:in voi poistaa jos sitä ei tule käytettyä yhtään

// Mixing Slot Result, tulee kun sekoitetaan joko 2 tai 3 esinettä oikein, se näytetään, ja samalla lisätään inventoriin
// Tosin tämä ei välttämätön, keskity toistaiseksi mixingSlots:iin. Tämän VOISI piirtää tulos slottiin mutta se ei nyt
// heti välttämätöntä, riittää että näkyy kerran 4. mixing screen slotissa kun sekoittaa, mutta voi vapaasti sen hävittää kun
// mixing screenistä poistutaan
let mixingScreenResult = [0];

//0 = esine on vielä inventorissa, 1 = esine on viety mixing slottiin

//INSTEAD, use array, one that's made within the other, but feel free to move it here
let mixingResult = null;

//inventorin esineen arvo. 
let mixInventory_item = 0;

//mixing slottien esineiden arvo.
let mixSlot_item = 0;

let img01_index = 0;
let img02_index = 0;
let img01_mixing_index = 0;

//Tällä luodaan uusi ikkuna missä esineiden mixaus tehdään, mistä voi myös poistua takaisin defaultti pelin näkymään
function createMixingWindow(){

    //Ruudun tyhjennys koska uudessa ikkunassa, yleinen tapa peleissä
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
    for (let i = 0; i < inventory.length; i++) {
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 135) + 350, 460, 140, 115); 
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 135) + 360, 470, 120, 95);
        ctx.closePath();
        
    }

    //3 Slottia
    for (let i = 0; i < mixingSlots.length; i++){
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 175) + 370, 250, 148, 127);
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 175) + 380, 260, 128, 107);
        ctx.closePath();
    }

    //Nuoli oikeaan suuntaan
    ctx.save();
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
    ctx.restore();
    ctx.beginPath(); //Reset

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
    ctx.fillText("Exit", 400, 135);


    //inventory esineet //sijoita paikoilleen oikein
    let invIndex2nd = 0;
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        //((i * 135) + 350, 460, 140, 115); Sijainnit missä sekoitus_window:in inventori slotit on
        
        if (item === "Item_01") {
            ctx.drawImage(img01, (invIndex2nd * 135) + 360, 459, 115, 115);
            img01_index = invIndex2nd;
            invIndex2nd++;
        } else if (item === "Item_02") {
            ctx.drawImage(img02, (invIndex2nd * 135) + 355, 453, 125, 125);
            img02_index = invIndex2nd;
            invIndex2nd++;
        } else if (item === "MixTest") {
            ctx.drawImage(imgMixed, (invIndex2nd * 135) + 355, 453, 125, 125);
            invIndex2nd++;

        }
    }

    //Piirretään inventorin esine mixing slotteihin jos ne näkyvät niiden muuttujissa
    //Tällä hetkellä ei toimi, piirtää jos mitään tavallisessa inventorissa, aina img02
    //Ei ilmeisesti edes päästä täyttämään ehtoja ja silti asiat tulee piirrettyä?

    let mixSlotsIndex = 0;
    for (let i = 0; i < mixingSlots.length; i++){
        let item2 = mixingSlots[i];

        if (item2 === "Item_01") { //(i * 175) + 370, 250, 148, 127);
            ctx.drawImage(img01, (mixSlotsIndex * 175) + 370, 250, 148, 127);
            mixSlotsIndex++;
            //mixingLimit++;
        } else if (item2 === "Item_02") {
            ctx.drawImage(img02, (mixSlotsIndex * 175) + 370, 250, 148, 127);
            mixSlotsIndex++;
            //mixingLimit++;
        } else if (item2 === "MixTest") {
            ctx.drawImage(imgMixed, (mixSlotsIndex * 175) + 370, 250, 148, 127);
            mixSlotsIndex++;
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



    //Vianratkaisua varten, mihin piirretään clickboxit?
    //ctx.strokeStyle = "red";
    //ctx.lineWidth = 2;
    //for (let i = 0; i < 6; i++) {
        //ctx.strokeRect((i * 135) + 350, 460, 140, 115);
    //}
    //for (let i = 0; i < 3; i++) {
        //ctx.strokeRect((i * 175) + 370, 250, 148, 127);
    //}

} //createMixingWindow ending bracket