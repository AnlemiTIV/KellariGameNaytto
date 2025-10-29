// Tässä varastoidaan mixing slottien esineet, mixing slot results:ille omat muuttuja/Array?
let mixingSlots = [0, 0, 0];
let mixingLimit = 0; //jos 3, ei voi enää lisätä, mutta vähenee 1:llä jos mixing sloteista klikataan esinettä
let mixingScreenResult = [0];
let mixingResult = null;

//inventorin esineen arvo. 
let mixInventory_item = 0;

//mixing slottien esineiden arvo.
let mixSlot_item = 0;

let img01_index = 0;
let img02_index = 0;
let img01_mixing_index = 0;

//Tällä luodaan uusi ikkuna missä esineiden mixaus tehdään, mistä voi myös poistua takaisin defaultti pelin näkymään
function createMixingWindow() {
    //Ruudun tyhjennys koska uudessa ikkunassa, yleinen tapa peleissä
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgba(92, 90, 90, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //Pohja ikkuna
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(315, 96, 900, 605);
    ctx.fillStyle = "rgba(137, 128, 173, 1)";
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
    for (let i = 0; i < mixingSlots.length; i++) {
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
    ctx.fillRect((628 + 370), 250, 148, 127);
    ctx.fillStyle = "rgba(122, 140, 143, 1)";
    ctx.fillRect((628 + 380), 260, 128, 107);

    // Piirrä sekoitus-tulos, jos sekoitettu
    const resultInnerX = (628 + 380);
    const resultInnerY = 260;
    const resultInnerW = 128;
    const resultInnerH = 107;

    // result-slotin alue globaalisti klikkauksia varten
    window.resultSlotArea = { x: resultInnerX, y: resultInnerY, w: resultInnerW, h: resultInnerH };

    if (mixingResult) {
        if (mixingResult === "Item_01") {
            ctx.drawImage(img01, resultInnerX, resultInnerY, resultInnerW, resultInnerH);
        } else if (mixingResult === "Item_02") {
            ctx.drawImage(img02, resultInnerX, resultInnerY, resultInnerW, resultInnerH);
        } else if (mixingResult === "MixTest") {
            ctx.drawImage(imgMixed, resultInnerX, resultInnerY, resultInnerW, resultInnerH);
        } else {
            // LISÄÄ MUUT TULOKSET TÄHÄN TARVITTAESSA
            // Jos ei ole kuvaa, piirrä tekstinä
            ctx.fillStyle = "#0a0909ff";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(String(mixingResult), resultInnerX + resultInnerW / 2, resultInnerY + resultInnerH / 2);
        }
    } //if mixingResult ending bracket

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
    for (let i = 0; i < mixingSlots.length; i++) {
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

    // Sekoita-painikkeen alue globaliksi, klikkauksessa voidaan tunnistaa
    window.sekoitaBtnArea = { x: 675, y: 594, w: 180, h: 70 };

    // result-slotin alue (varmistus jos ei määritelty aiemmin)
    window.resultSlotArea = { x: resultInnerX, y: resultInnerY, w: resultInnerW, h: resultInnerH };

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

function handleMixingScreen(x, y) {
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

    // Klikkaus tulos-slottiin: lisää sekoitustuloksen inventoriin
    if (mixingResult && window.resultSlotArea &&
        x >= window.resultSlotArea.x &&
        x <= window.resultSlotArea.x + window.resultSlotArea.w &&
        y >= window.resultSlotArea.y &&
        y <= window.resultSlotArea.y + window.resultSlotArea.h) {

        // Yritä käyttää addResultToInventory jos saatavilla (mixing.js)
        if (typeof addResultToInventory === "function") {
            addResultToInventory(mixingResult);
        } else {
            // fallback: sijoita ensimmäiseen tyhjään (0) tai unshift/pop
            const emptyIdx = inventory.findIndex(s => s === 0);
            if (emptyIdx !== -1) {
                inventory[emptyIdx] = mixingResult;
            } else {
                inventory.unshift(mixingResult);
                inventory.pop();
            }
        }

        // tyhjennä tulosslotti
        mixingResult = null;
        mixingScreenResult[0] = 0;
        // päivitä näkymä
        createMixingWindow();
        return;
    }

    // Sekoita-painikkeen käsittely. 
    if (window.sekoitaBtnArea &&
        x >= window.sekoitaBtnArea.x &&
        x <= window.sekoitaBtnArea.x + window.sekoitaBtnArea.w &&
        y >= window.sekoitaBtnArea.y &&
        y <= window.sekoitaBtnArea.y + window.sekoitaBtnArea.h) {

        // Käytetään recipes, canMixFromSlots ja removeIngredientsFromSlots (mixing.js)
        if (typeof recipes !== "undefined") {
            for (const recipe of recipes) {
                if (typeof canMixFromSlots === "function" && canMixFromSlots(recipe.ingredients)) {
                    // Poistetaan ainesosat mixingSlots:ista ja laitetaan tulos tulosslotiin
                    if (typeof removeIngredientsFromSlots === "function") {
                        removeIngredientsFromSlots(recipe.ingredients);
                    } else {
                        // varmuus: poista suoraan mixingSlots jos funktiota ei löydy
                        for (const ing of recipe.ingredients) {
                            const idx = mixingSlots.indexOf(ing);
                            if (idx !== -1) mixingSlots[idx] = 0;
                        }
                    }
                    mixingResult = recipe.result;
                    mixingScreenResult[0] = recipe.result;
                    // Päivitä näkymä näyttämään tulosslotti
                    createMixingWindow();
                    return;
                }
            }
        }
        console.log("Ei sopivaa reseptiä mixing-sloteille.");
        return;
    }

    //AS: Tämä koodi tehty tekoälyllä, voi sisältää virheitä. Koodi korjaa tavarat, että ei ole painamattomia kuvia. 
    //Inventorin slotista mixaus slottiin //(i * 135) + 350, 460, 140, 115 inventori slotin koordinaatit
    for (let i = 0; i < inventory.length; i++) {
        let x2 = (i * 135) + 360;
        let y2 = 470;

        if (
            x >= x2 &&
            x <= x2 + 120 &&
            y >= y2 &&
            y <= y2 + 95
        ) {
            if (inventory[i] !== 0) {
                const emptyIndex = mixingSlots.findIndex(s => s === 0);
                if (emptyIndex !== -1) {
                    mixingSlots[emptyIndex] = inventory[i];
                    inventory[i] = 0;
                    // varmista että slotit ovat kompaktit vasempaan
                    if (typeof compactMixingSlots === "function") compactMixingSlots();
                    createMixingWindow();
                }
                return;
            }
        }
    }

    // Mixaus slotista takaisin inventoriin
    for (let i = 0; i < mixingSlots.length; i++) {
        let x3 = (i * 175) + 380;
        let y3 = 260;

        if (
            x >= x3 &&
            x <= x3 + 128 &&
            y >= y3 &&
            y <= y3 + 107
        ) {
            // Jos slotissa on esine, siirrä se inventoriin
            if (mixingSlots[i] !== 0) {
                const emptyIndex2 = inventory.findIndex(s => s === 0);
                if (emptyIndex2 !== -1) {
                    inventory[emptyIndex2] = mixingSlots[i];
                    mixingSlots[i] = 0;
                    // kompaktataan slotit poistamisen jälkeen
                    if (typeof compactMixingSlots === "function") compactMixingSlots();
                    createMixingWindow();
                }
                return;
            }
        }
    }
}