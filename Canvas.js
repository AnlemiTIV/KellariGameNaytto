//Canvas pohjatiedot
let body = document.width

let canvas01 = document.getElementById("canvas01");
let canvasWidth = canvas01.width;
let canvasHeight = canvas01.height;
let ctx = canvas01.getContext("2d");
const img01 = new Image();
const img02 = new Image();
const imgMixed = new Image();
const imgboss = new Image();
const imgavain = new Image();
const imgBackground = new Image();


let testPois = 0;
let testPois2 = 0;
let useless;

// 0----w
let avainHallussa = false; //Jos true, avain piirretään näkyville ja jota tarvitaan ovelle, jos true, oven klikatessa
//päästään erilaiseen Canvas.js tiedostoon (taso 2), tämän tiedoston voi kopioida, tosin joitain asioita muutettava
//esim musiikki, kuvat, tausta, inventori esineet ja niiden sijoitukset. Mutta tämä vasta kun mixing_window tietyssä vaiheessa
//Ja luultavasti mixing_window:ille omat JS tiedot, tai yksinkertaisesti erilaiset "else if" ehdot jonka mukaan
//piirretään/lisätään erilaiset inventori esineet, ilman että tarvitaan 3 uutta JS tiedostoa

//> mutta, kun sirrytään uuteen JS tiedostoon, html lienee sama, mutta siirrytään joko erilliseen JS tiedostoon,
//tai erilliseen html tiedostoon, tästä vielä varmistettava chatgpt:ltä, mikä ideaalisempaa, mättää kaikki JS tiedostot
//samaan html tiedostoon, vai oltava sekä eri/uusi html ja js tiedosto?

let tasoNumero = 1; //kenties voi käyttää tämänkaltaista esineiden, inventorin loopatessa? Voisi
//päivittää joka kerta kun ovesta klikataan ja avain on hallussa? Ehkä? arvona 2 kun 2. tasossa jne
//if (avainHallussa === true)...tämän voisi lisätä jos oven koordinaattia klikataan,
//tätä mukaa sitten muistettava että "locations" voisi myös päivittää, kentän omille esineille omat
//ID tai tunnisteet, joiden avulla voi loopata huoletta kentän numerosta riippuen? Tosin vielä työn alla

//Globaali tavaravarasto, missä esineet pidetään.
let inventory = [0, 0, 0, 0, 0, 0]; //6 loppuversiossa, pitänee käyttää mixing_windowissa omaa?

// Lisätty: inventoryn vasemman reunan perus-x (vähentää kovakoodattuja +215 jne.)
const inventoryBaseX = 90; // aiemmin käytettiin 215

//9.10.2025 AL - Is mixingWindow open, sen slotit, mixing tulos¨
let isMixingWindowOpen = false; //tällä voi säätää kaiken muun pimentämistä ja klikattavuutta



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
    },

    background: {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight
    },


};

imgBackground.onload = function() {
    refreshCanvas();
}

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

imgavain.onload = function() {
    refreshCanvas();
}

function refreshCanvas() {
    //resetoi canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    //Canvas tausta
    ctx.drawImage(imgBackground, 0, 0, canvasWidth, canvasHeight);


    //9.10.2025 AL, mixing_window.js testi
    //Luo uuden mixaus buttonin, ja jos siitä klikataan canvas01.addEventListener:in
    //sisällä, kutsuu se funktiota, mikä Itsessään sijaitsee mixing_window.js tiedostossa, missä se window piirretään
    if (isMixingWindowOpen === false){
       
        ctx.fillStyle = "#65649fff";
        ctx.fillRect(840, 610, 130, 120);
        ctx.fillStyle = "#6f6eacff";
        ctx.fillRect(850, 617, 110, 105);
        ctx.fillStyle = "#000";
        ctx.font = "22px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Mixaus", 840 + 65, 610 + 60);
    }

    //draw inventory, rect, outer + inner + move right and repeat from start
    for (let i = 0; i < inventory.length; i++) {
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 110) + inventoryBaseX, 620, 120, 110);
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 110) + inventoryBaseX + 10, 627, 100, 95);
        
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


    //Piirrä avain inventorin ulkopuolelle
    if (avainHallussa === true){
        ctx.drawImage(imgavain, 90, 529, 95, 95);
    }


    // Piirrä inventaarion esineet
    let invIndex = 0;
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
       
        if (item === "Item_01") {
            ctx.drawImage(img01, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        } else if (item === "Item_02") {
            ctx.drawImage(img02, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        } else if (item === "MixTest") {
            ctx.drawImage(imgMixed, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        }
      
        // Lisää muita esineitä tarvittaessa
    }

    // Piirrä yhdistys-nappi canvasin päälle
    //drawMixButton();
} 



// Poista vanhat click-listenerit (ettei tule tuplaklikkauksia) //28.10.25 kommentoin tämän jotta tämänhetkinen koodi toimisi
//canvas01.replaceWith(canvas01.cloneNode(true));
//canvas01 = document.getElementById("canvas01");
//ctx = canvas01.getContext("2d");

canvas01.addEventListener("click", (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    //************************************************
    // Ehdotukset chatgpt:ltä, varmuuden vuoksi jos jotain hyötyä, muussa tapauksessa voi poistaa

    //const rect = canvas01.getBoundingClientRect();
    //const scaleX = canvas01.width / rect.width;
    //const scaleY = canvas01.height / rect.height;

    //const mouseX = (e.clientX - rect.left) * scaleX;
    //const mouseY = (e.clientY - rect.top) * scaleY;
    //************************************************

    //AL 10.10.25 - Jos Mixaus painikkeesta painetaan inventorin vieressä, siirrytään Mixaus ikkunaan
    //1340, 610, 130, 120);

    if (isMixingWindowOpen === false) {
        handleFirstScreen(mouseX, mouseY);
    } else {
        if (!isMixingWindowOpen) return;
        handleMixingScreen(mouseX, mouseY);
    }
}); 

function handleFirstScreen(x, y){
    
    //siirtyminen mixing_window.js:ään
    if (
        isMixingWindowOpen === false &&
        x >= 840 &&
        x <= 840 + 130 &&
        y >= 610 &&
        y <= 610 + 120
    ) {
        if (typeof createMixingWindow === "function") {
            
            isMixingWindowOpen = true;
            createMixingWindow();
        }
        return;
    }

    // item_01
    if (
        testPois === 0 &&
        x >= locations.Img1.x &&
        x <= locations.Img1.x + locations.Img1.width &&
        y >= locations.Img1.y &&
        y <= locations.Img1.y + locations.Img1.height
    ){
        if (isMixingWindowOpen === false){
            testPois = 1;
            inventory.unshift("Item_01");
            useless = inventory.pop();
            refreshCanvas();
            return;
        }

    }

    // item_02
    if (
        testPois2 === 0 &&
        x >= locations.Img2.x &&
        x <= locations.Img2.x + locations.Img2.width &&
        y >= locations.Img2.y &&
        y <= locations.Img2.y + locations.Img2.height
    ){
        if (isMixingWindowOpen === false){
            testPois2 = 1;
            inventory.unshift("Item_02");
            useless = inventory.pop();
            refreshCanvas();
            return;
        }

    }

    // Boss Poisto test
    if (
        x >= locations.boss.x &&
        x <= locations.boss.x + locations.boss.width &&
        y >= locations.boss.y &&
        y <= locations.boss.y + locations.boss.height
        && inventory.includes("MixTest")
    ){
        
        if (isMixingWindowOpen === false){
            inventory = inventory.filter(item => item !== "MixTest");
            locations.boss.alive = false;
            console.log("Bossi on voitettu!");
            inventory.unshift(0);
            //AL 25.10.25. Tässä todennäköisesti aktivoidaan muttujan arvo, mikä lisää avaimen käyttöön
            //Ja tällä avaimella, saadaan muutokset aikaan kun ovesta painetaan, mikä vie meidät erilaiseen tasoon
            avainHallussa = true;
        
            refreshCanvas();
            return;
        }

    }
} 

function handleMixingScreen(x, y){
    console.log(x, y);

    //Poistuminen, siirtyminen pelin defaultti näkymään    
    if (
        x >= 345 &&
        x <= 345 + 110 &&
        y >= 110 &&
        y <= 110 + 50
    ) {
        if (isMixingWindowOpen === true && typeof refreshCanvas === "function") {
            isMixingWindowOpen = false;
            refreshCanvas();
        }
        return;
    }
    
    //Inventorin slotista mixaus slottiin //(i * 135) + 350, 460, 140, 115 inventori slotin koordinaatit
    for (let i = 0; i < inventory.length; i++){
        let x2 = (i * 135) + 360; //(i * 135) + 360, 470, 120, 95)
        let y2 = 470
        
        if (
            x >= x2 && //485
            x <= x2 + 120 && //275 
            y >= y2 &&
            y <= y2 + 95)
            {
                if (inventory[i] !== 0){
                    
                    const emptyIndex = mixingSlots.findIndex(s => s === 0);
                    if (emptyIndex !== -1){
                        mixingSlots[emptyIndex] = inventory[i];
                        inventory[i] = 0;
                        //mixingLimit++
                        createMixingWindow();
                    }
                    return;
                }
            }
            
        }
        
    // Mixaus slotista takaisin inventoriin  // (i * 175) + 370, 250, 148, 127);
    for (let i = 0; i < mixingSlots.length; i++){
        let x3 = (i * 175) + 380; //((i * 175) + 380, 260, 128, 107);
        let y3 = 260
        
        if (
            x >= x3 &&
            x <= x3 + 128 &&
            y >= y3 &&
            y <= y3 + 107)
            {
                if (mixingSlots[i] !== 0){
                    
                    const emptyIndex2 = inventory.findIndex(s => s === 0);
                    if (emptyIndex2 !== -1){
                        inventory[emptyIndex2] = mixingSlots[i];
                        mixingSlots[i] = 0;
                        //mixingLimit++
                        createMixingWindow();
                    }
                    return;
                }
            }
        }

}

img01.src = "kuvat/Item_01.png";
img02.src = "kuvat/Item_02.png";
imgboss.src = "kuvat/taso_1_kuvat/Boss_01.png";
imgavain.src = "kuvat/key_item.png";
imgBackground.src = "kuvat/taso_1_kuvat/Taso_1.png";