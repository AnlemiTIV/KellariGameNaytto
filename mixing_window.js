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
    //Ruudun tyhjennys koska uudessa ikkunassa, yleinen tapa peleiss
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgba(92, 90, 90, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //Miksausikkunan koko ja sijainti 
    const mixWinW = 900;
    const mixWinH = 605;
    const mixWinX = Math.round((canvasWidth - mixWinW) / 2); // Keskitetään vaakasuunnassa
    const mixWinY = Math.round((canvasHeight - mixWinH) / 2); // Keskitetään pystysuunnassa

    //Pohja ikkuna
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(mixWinX, mixWinY, mixWinW, mixWinH);
    ctx.fillStyle = "rgba(137, 128, 173, 1)";
    ctx.fillRect(mixWinX + 6, mixWinY + 5, mixWinW - 12, mixWinH - 10);
    //X = -40 > 315 (360 og)
    //315 + 6 = 321 with inner color
    //Width, Height OG 810,561 and 798, 550 //add 30 to each

    //peruskoordinaatit suhteessa mix-ikkunaan 
    const invBaseX = mixWinX + 35;  
    const invBaseY = mixWinY + 364;  
    const invSlotW = 140;
    const invSlotH = 115;

    const mixSlotsBaseX = mixWinX + 55; 
    const mixSlotsBaseY = mixWinY + 154;

    //inventory    
    for (let i = 0; i < inventory.length; i++) {
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 135) + invBaseX, invBaseY, invSlotW, invSlotH);
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 135) + invBaseX + 10, invBaseY + 10, 120, 95);
        ctx.closePath();
    }

    //3 Slottia
    for (let i = 0; i < mixingSlots.length; i++) {
        ctx.fillStyle = "rgba(146, 192, 204, 1)";
        ctx.beginPath();
        ctx.fillRect((i * 175) + mixSlotsBaseX, mixSlotsBaseY, 148, 127);
        ctx.fillStyle = "rgba(122, 140, 143, 1)";
        ctx.fillRect((i * 175) + mixSlotsBaseX + 10, mixSlotsBaseY + 10, 128, 107);
        ctx.closePath();
    }

    //Nuoli oikeaan suuntaan
    ctx.beginPath();
    ctx.lineWidth = 6;
    const arrowOffsets = { x: 573, y: 201 }; // alkuperäisten (888,297) - (315,96)
    // Kuka olisi luullut että nuolen pienentämistä on näin hauskaa
    ctx.moveTo(mixWinX + arrowOffsets.x, mixWinY + arrowOffsets.y);
    ctx.lineTo(mixWinX + arrowOffsets.x, mixWinY + arrowOffsets.y + 39);
    ctx.lineTo(mixWinX + arrowOffsets.x + 40, mixWinY + arrowOffsets.y + 39);
    ctx.lineTo(mixWinX + arrowOffsets.x + 40, mixWinY + arrowOffsets.y + 60);
    ctx.lineTo(mixWinX + arrowOffsets.x + 90, mixWinY + arrowOffsets.y + 19);
    ctx.lineTo(mixWinX + arrowOffsets.x + 40, mixWinY + arrowOffsets.y - 25);
    ctx.lineTo(mixWinX + arrowOffsets.x + 40, mixWinY + arrowOffsets.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    ctx.beginPath(); //Reset

    //tulos slot 
    const resultOuterX = mixWinX + 683; // alkuperäinen (628 + 370) - 315 = 683
    const resultOuterY = mixWinY + 154; // alkuperäinen 250 - 96 = 154
    ctx.fillStyle = "rgba(146, 192, 204, 1)";
    ctx.fillRect(resultOuterX, resultOuterY, 148, 127);
    ctx.fillStyle = "rgba(122, 140, 143, 1)";
    ctx.fillRect(resultOuterX + 10, resultOuterY + 10, 128, 107);

    // Piirrä sekoitus-tulos, jos sekoitettu
    const resultInnerX = resultOuterX + 10;
    const resultInnerY = resultOuterY + 10;
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
    }

    //Poistu-painike 
    const exitX = mixWinX + 30; // alkuperäinen 345 = 315 + 30
    const exitY = mixWinY + 14; // alkuperäinen 110 = 96 + 14
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.fillRect(exitX, exitY, 110, 50);
    ctx.fillStyle = "rgba(204, 89, 133, 1)";
    ctx.beginPath();
    ctx.fillRect(exitX + 5, exitY + 5, 100, 40);
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.fillText("Exit", exitX + 55, exitY + 25);

    // Tallennetaan exit-alue globaaliksi
    window.exitBtnArea = { x: exitX, y: exitY, w: 110, h: 50 };



    //inventory esineet //sijoita paikoilleen oikein
    let invIndex2nd = 0;
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        //((i * 135) + invBaseX, invBaseY, 140, 115); Sijainnit missä sekoitus_window:in inventori slotit on

        if (item === "Item_01") {
            ctx.drawImage(img01, (invIndex2nd * 135) + invBaseX + 10, invBaseY - 1, 115, 115);
            img01_index = invIndex2nd;
            invIndex2nd++;
        } else if (item === "Item_02") {
            ctx.drawImage(img02, (invIndex2nd * 135) + invBaseX + 5, invBaseY - 7, 125, 125);
            img02_index = invIndex2nd;
            invIndex2nd++;
        } else if (item === "MixTest") {
            ctx.drawImage(imgMixed, (invIndex2nd * 135) + invBaseX + 5, invBaseY - 7, 125, 125);
            invIndex2nd++;
        }
    }

    // inventorin esine mixing slotteihin jos ne näkyvät niiden muuttujissa
    let mixSlotsIndex = 0;
    for (let i = 0; i < mixingSlots.length; i++) {
        let item2 = mixingSlots[i];

        if (item2 === "Item_01") {
            ctx.drawImage(img01, (mixSlotsIndex * 175) + mixSlotsBaseX, mixSlotsBaseY, 148, 127);
            mixSlotsIndex++;
        } else if (item2 === "Item_02") {
            ctx.drawImage(img02, (mixSlotsIndex * 175) + mixSlotsBaseX, mixSlotsBaseY, 148, 127);
            mixSlotsIndex++;
        } else if (item2 === "MixTest") {
            ctx.drawImage(imgMixed, (mixSlotsIndex * 175) + mixSlotsBaseX, mixSlotsBaseY, 148, 127);
            mixSlotsIndex++;
        }
    }

    //Sekoita-painike
    const sekoitaX = mixWinX + 360; // alkuperäinen 675 = 315 + 360
    const sekoitaY = mixWinY + 498; // alkuperäinen 594 = 96 + 498
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.fillRect(sekoitaX, sekoitaY, 180, 70);
    ctx.fillStyle = "rgba(89, 131, 204, 1)";
    ctx.beginPath();
    ctx.fillRect(sekoitaX + 5, sekoitaY + 5, 170, 60);
    ctx.fillStyle = "rgba(0,0,0, 1)";
    ctx.font = "30px Arial";
    ctx.fillText("Sekoita", sekoitaX + 89, sekoitaY + 33);
    ctx.font = "22px Arial";

    // Sekoita-painikkeen alue globaliksi, klikkauksessa voidaan tunnistaa
    window.sekoitaBtnArea = { x: sekoitaX, y: sekoitaY, w: 180, h: 70 };

    // result-slotin alue (varmistus jos ei määritelty aiemmin)
    window.resultSlotArea = { x: resultInnerX, y: resultInnerY, w: resultInnerW, h: resultInnerH };

    // form-painike mixing-ikkunan yläoikeaan, jos pelaajalla on paperi
    // Kiinteä sijainti canvaksella: (800, 120), koko 100x80
    if (formulaHallussa === true) {
        const fx = 800;
        const fy = 120;
        const fw = 100;
        const fh = 80;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(fx, fy, fw, fh);
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fillRect(fx + 5, fy + 5, fw - 10, fh - 10);
        // Piirrä pienennetty paperikuva, jos saatavilla (käytetään imgformula)
        if (typeof imgformula !== "undefined") {
            ctx.drawImage(imgformula, fx + 8, fy + 8, fw - 16, fh - 16);
        } else {
            ctx.fillStyle = "#000";
            ctx.font = "12px Arial";
            ctx.fillText("Formula", fx + fw/2, fy + fh/2);
        }
        // tallennetaan alue klikkauksia varten
        window.formulaBtnArea = { x: fx, y: fy, w: fw, h: fh };
    }

    // Jos pelaaja avannut form kuvan, piirretään overlay (keskelle)
    if (window.showingFormula) {
        // valitse tasokohtainen kuva
        let formulaImg = imgFormula1; // oletus
        if (typeof tasoNumero !== "undefined") {
            if (tasoNumero === 1) formulaImg = (typeof imgFormula1 !== "undefined" ? imgFormula1 : imgformula);
            else if (tasoNumero === 2) formulaImg = (typeof imgFormula2 !== "undefined" ? imgFormula2 : imgformula);
            else if (tasoNumero === 3) formulaImg = (typeof imgFormula3 !== "undefined" ? imgFormula3 : imgformula);
        }
        // overlay koko ja sijainti (keskitetty)
        const ow = 600;
        const oh = 480;
        const ox = Math.round((canvasWidth - ow) / 2);
        const oy = Math.round((canvasHeight - oh) / 2);
        // tummentava tausta
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        // valkoinen kehys ja kuva
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fillRect(ox, oy, ow, oh);
        if (formulaImg && formulaImg.complete) {
            ctx.drawImage(formulaImg, ox + 10, oy + 10, ow - 20, oh - 20);
        } else {
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.fillText("Formula (taso " + tasoNumero + ")", ox + ow/2, oy + oh/2);
        }
        // tallennetaan overlay-alue, jotta klikkaus sulkee sen
        window.formulaOverlayArea = { x: ox, y: oy, w: ow, h: oh };
    }

} //createMixingWindow ending bracket

function handleMixingScreen(x, y) {
    console.log(x, y);

    //Poistuminen, siirtyminen pelin defaultti näkymään    
    if (window.exitBtnArea &&
        x >= window.exitBtnArea.x &&
        x <= window.exitBtnArea.x + window.exitBtnArea.w &&
        y >= window.exitBtnArea.y &&
        y <= window.exitBtnArea.y + window.exitBtnArea.h) {
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



    //AS: Tämä koodi tehty tekoälyllä, voi sisältää virheitä. Koodi korjaa tavarat, että ei ole painamattomia kuvia. 
    // Sekoita-painikkeen käsittely. 
    if (window.sekoitaBtnArea &&
        x >= window.sekoitaBtnArea.x &&
        x <= window.sekoitaBtnArea.x + window.sekoitaBtnArea.w &&
        y >= window.sekoitaBtnArea.y &&
        y <= window.sekoitaBtnArea.y + window.sekoitaBtnArea.h) {


        if (typeof recipes !== "undefined") {
            for (const recipe of recipes) {
                if (typeof canMixFromSlots === "function" && canMixFromSlots(recipe.ingredients)) {

                    if (typeof removeIngredientsFromSlots === "function") {
                        removeIngredientsFromSlots(recipe.ingredients);
                    } else {

                        for (const ing of recipe.ingredients) {
                            const idx = mixingSlots.indexOf(ing);
                            if (idx !== -1) mixingSlots[idx] = 0;
                        }
                    }
                    mixingResult = recipe.result;
                    mixingScreenResult[0] = recipe.result;
                    createMixingWindow();
                    return;
                }
            }
        }
        console.log("Ei sopivaa reseptiä mixing-sloteille.");
        return;
    }

    //Inventorista mixaus slottiin
    const invBase = window.mixWindowData ? window.mixWindowData.invBaseX : (350);
    const invBaseY = window.mixWindowData ? window.mixWindowData.invBaseY : (460);
    for (let i = 0; i < inventory.length; i++) {
        let x2 = (i * 135) + invBase;
        let y2 = invBaseY + 0; // säilytä sama offset

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
                    if (typeof compactMixingSlots === "function") compactMixingSlots();
                    createMixingWindow();
                }
                return;
            }
        }
    }

    // Mixaus slotista takaisin inventoriin
    const mixBaseX = window.mixWindowData ? window.mixWindowData.mixSlotsBaseX : (370);
    const mixBaseY = window.mixWindowData ? window.mixWindowData.mixSlotsBaseY : (250);
    for (let i = 0; i < mixingSlots.length; i++) {
        let x3 = (i * 175) + mixBaseX;
        let y3 = mixBaseY;

        if (
            x >= x3 &&
            x <= x3 + 128 &&
            y >= y3 &&
            y <= y3 + 107
        ) {
            if (mixingSlots[i] !== 0) {
                const emptyIndex2 = inventory.findIndex(s => s === 0);
                if (emptyIndex2 !== -1) {
                    inventory[emptyIndex2] = mixingSlots[i];
                    mixingSlots[i] = 0;
                    if (typeof compactMixingSlots === "function") compactMixingSlots();
                    createMixingWindow();
                }
                return;
            }
        }
    }

    // Jos overlay on näkyvissä -> klikkaus overlayissa piilottaa sen
    if (window.showingFormula) {
        if (window.formulaOverlayArea &&
            x >= window.formulaOverlayArea.x &&
            x <= window.formulaOverlayArea.x + window.formulaOverlayArea.w &&
            y >= window.formulaOverlayArea.y &&
            y <= window.formulaOverlayArea.y + window.formulaOverlayArea.h) {
            // sulje overlay
            window.showingFormula = false;
            createMixingWindow();
            return;
        } else {
            // klikattu muualla, myös suljetaan
            window.showingFormula = false;
            createMixingWindow();
            return;
        }
    }

    // Formula-painikkeen käsittely (näyttää overlayin)
    if (window.formulaBtnArea &&
        x >= window.formulaBtnArea.x &&
        x <= window.formulaBtnArea.x + window.formulaBtnArea.w &&
        y >= window.formulaBtnArea.y &&
        y <= window.formulaBtnArea.y + window.formulaBtnArea.h) {

        // Toggle näyttö
        window.showingFormula = !window.showingFormula;
        createMixingWindow();
        return;
    }
}