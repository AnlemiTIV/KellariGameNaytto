// Muuttujia
let testPois = 0; //mahdollisesti voi poistaa?
let testPois2 = 0;
let useless;

// Avain tilanne ja taosnumero jolla siirrytään tasosta seuraavaan // 0----w
let formulaHallussa = false;
let avainHallussa = false; 
let tasoNumero = 1; 
let inNextLevel = false; //mustalle ruudulle, on "true" sen aikana kun ovesta klikataan, menee "false" kun refreshCanvasissa

//Globaali tavaravarasto, missä esineet pidetään.
let inventory = [0, 0, 0, 0, 0, 0]; //[]

// Lisätty: inventoryn vasemman reunan perus-x (vähentää kovakoodattuja +215 jne.)
const inventoryBaseX = 90; // aiemmin käytettiin 215

//9.10.2025 AL - Is mixingWindow open, sen slotit, mixing tulos¨
let isMixingWindowOpen = false; //tällä voi säätää kaiken muun piilottamista ja klikattavuutta

// Tällä new Image(), canvasin pohja, location, img src, img onload
genImageOnload();

function refreshCanvas() {

    //resetoi canvas ja canvas:in tausta
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    //poistu mustasta ruudusta
    if (inNextLevel === true) {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        setTimeout(() => {
            inNextLevel = false;
            refreshCanvas()
        }, 2000);
    }

    const stageNow = locations.stages[tasoNumero - 1];

    ctx.drawImage(stageNow.background.value, 0, 0, canvasWidth, canvasHeight);



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

    // Piirtää itemit
    if (Array.isArray(stageNow.images)) {
        // Käy läpi kaikki kentän images-taulukon objektit ja piirrä ne, jos niitä ei ole otettu
        stageNow.images.forEach(imgObj => {
            if (!imgObj) return;
            // jos objekteilla on 'obtained' -kenttä, tarkistetaan se; muuten piirretään aina
            if (typeof imgObj.obtained === "number") {
                if (imgObj.obtained !== 1 && imgObj.value) {
                    ctx.drawImage(imgObj.value, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
                }
            } else {
                // fallback: piirrä jos value löytyy
                if (imgObj.value) {
                    console.log("kuva piirretty ilman 'obtained' -kenttää", imgObj);
                    ctx.drawImage(imgObj.value, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
                }
            }
        });
    }

    // Pirrää roskakasan taso 1
    if (stageNow.trash) {
        ctx.drawImage(stageNow.trash.value, stageNow.trash.x, stageNow.trash.y, stageNow.trash.width, stageNow.trash.height);
    }
    
    if (stageNow.crackWall) {
        ctx.drawImage(stageNow.crackWall.value, stageNow.crackWall.x, stageNow.crackWall.y, stageNow.crackWall.width, stageNow.crackWall.height);
    }

    // Stage 2

    if (stageNow.kulho) {
        ctx.drawImage(stageNow.kulho.value, stageNow.kulho.x, stageNow.kulho.y, stageNow.kulho.width, stageNow.kulho.height);
    }

    if (stageNow.lockbox) {
        ctx.drawImage(stageNow.lockbox.value, stageNow.lockbox.x, stageNow.lockbox.y, stageNow.lockbox.width, stageNow.lockbox.height);
    }



    // Piirrä munakotelo taso 3
    if (stageNow.munakotelo) {
        ctx.drawImage(stageNow.munakotelo.value, stageNow.munakotelo.x, stageNow.munakotelo.y, stageNow.munakotelo.width, stageNow.munakotelo.height);
    }

    // Piirrä boss
    if (stageNow.boss && stageNow.boss.alive) { //`item_${item_number}`)
        ctx.drawImage(stageNow.boss.value, stageNow.boss.x, stageNow.boss.y, stageNow.boss.width, stageNow.boss.height);
    }

    //Piirrä avain inventorin ulkopuolelle
    if (avainHallussa === true){
        ctx.drawImage(imgavain, 90, 529, 95, 95);
    }

    // Piirrä inventaarion esineet (yksinkertaisempi: käytä map:ia nimestä kuvaan)
    // Rakennetaan kartta nykyisen kentän item-nimestä siihen liittyvään Image-objektiin
    const itemImageMap = {};
    // stageNow määritellään yllä refreshCanvasissa
    if (stageNow && Array.isArray(stageNow.images)) {
        stageNow.images.forEach(imgObj => {
            if (imgObj && imgObj.name && imgObj.value) {
                itemImageMap[imgObj.name] = imgObj.value;
            }
        });
    }
    // Lisää globaaleja / erikoistapauksia karttaan (tarvittaessa laajenna)
    // Eli ei (stageNow.images) vaan erikseen määritellyt itemit.
    itemImageMap["MixTest"] = imgMixed;
    itemImageMap["Potioni_vesi"] = imgPotBlue;
    // itemImageMap["Item_03"] = someImage; // lisää tarvittaessa
    itemImageMap["Vesikulhossa"] = imgGlassBlue; //Toimii ilmankin joten jos jonkinlainen visuaalinen virhe, poista

    let invIndex = 0;
    for (let i = 0; i < inventory.length; i++) {
        const itemName = inventory[i];
        if (!itemName || itemName === 0) continue; // tyhjä paikka

        const drawImg = itemImageMap[itemName];
        const drawX = (invIndex * 110) + inventoryBaseX;
        const drawY = 615;
        const drawW = 120;
        const drawH = 120;

        if (drawImg) {
            ctx.drawImage(drawImg, drawX, drawY, drawW, drawH);
        } else {
            // Debug: piirrä placeholder jos kuvaa ei löydy
            ctx.fillStyle = "rgba(40,40,40,0.6)";
            ctx.fillRect(drawX, drawY, drawW, drawH);
            ctx.fillStyle = "#fff";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(String(itemName), drawX + drawW/2, drawY + drawH/2);
        }

        invIndex++;
    }

} 

canvas01.addEventListener("click", (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

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

    // Kenttä rippuen tasonumerosta
    const stageNow = locations.stages[tasoNumero - 1];
    
    //Item tarkistus
    for (let i = 0; i < stageNow.images.length; i++) {
        const item = stageNow.images[i];
        if (
            item.obtained === 0 &&
            x >= item.x && x <= item.x + item.width &&
            y >= item.y && y <= item.y + item.height
        ) {
            // Jos form_paperi, älä lisää inventoriin — merkitse löydetyksi ja ota formula käyttöön
            if (item.name === "form_paperi") {
                item.obtained = 1;
                formulaHallussa = true;
                refreshCanvas();
                return;
            }
            inventory.unshift(item.name);
            useless = inventory.pop();
            item.obtained = 1;

            if (item.name === "form_paperi") {
                formulaHallussa = true;
            }

            refreshCanvas();
            return;
        }
    }

    //klikattu roskakasa (trash) -> Saat esineitä yksi kerrallaan
    if (stageNow.trash &&
        x >= stageNow.trash.x &&
        x <= stageNow.trash.x + stageNow.trash.width &&
        y >= stageNow.trash.y &&
        y <= stageNow.trash.y + stageNow.trash.height) {

        if (!Array.isArray(stageNow.trash.items)) {
            stageNow.trash.items = ["Potioni_vihrea", "mata_paprika"];
        }
        // Jos roskiksessa ei ole enää esineitä, annetaan palaute ja palataan
        if (stageNow.trash.items.length === 0) {
            console.log("Roskiksesta ei löydy mitään.");
            return;
        }
        const emptyIdx = inventory.indexOf(0);
        if (emptyIdx === -1) {
            console.log("Inventori täynnä.");
            return;
        }

        // Ota ensimmäinen esine roskiksesta ja poista se listalta
        const foundItem = stageNow.trash.items.shift();
        inventory[emptyIdx] = foundItem;
        console.log("Löysit roskiksesta:", foundItem);
        refreshCanvas();
        return;
    }

    //klikattu munakotelosta (eggcarton) -> Saat kananmunan
    if (stageNow.munakotelo &&
        x >= stageNow.munakotelo.x &&
        x <= stageNow.munakotelo.x + stageNow.munakotelo.width &&
        y >= stageNow.munakotelo.y &&
        y <= stageNow.munakotelo.y + stageNow.munakotelo.height) {

        if (!Array.isArray(stageNow.munakotelo.items)) {
            stageNow.munakotelo.items = ["Kananmuna_alt"];
        }
        // Jos inventorissa kananmuna, annetaan palaute ja palataan
        if (stageNow.munakotelo.items.length === 0) {
            console.log("Sinulla on jo kananmuna.");
            return;
        }
        const emptyIdx = inventory.indexOf(0);
        if (emptyIdx === -1) {
            console.log("Inventori täynnä.");
            return;
        }

        // Ota ensimmäinen esine roskiksesta ja poista se listalta
        const foundItem = stageNow.munakotelo.items.shift();
        inventory[emptyIdx] = foundItem;
        console.log("Löysit munakotelosta:", foundItem);
        refreshCanvas();
        return;
    }

    //klikattu seinän murtuma (crackWall) -> jos inventoriissa tyhjä potti, täytetään vesi-potioniksi
    if (stageNow.crackWall &&
        x >= stageNow.crackWall.x &&
        x <= stageNow.crackWall.x + stageNow.crackWall.width &&
        y >= stageNow.crackWall.y &&
        y <= stageNow.crackWall.y + stageNow.crackWall.height) {

        const emptyIdx = inventory.indexOf("Empty_Pot");
        if (emptyIdx !== -1) {
            // korvataan ensimmäinen Empty_Pot vesipotionilla
            inventory[emptyIdx] = "Potioni_vesi";
            console.log("Empty_Pot -> Potioni_vesi");
            refreshCanvas();
            return;
        }
        // Ei toimi ilman potionia(voi lisätä palaute/ääniefektin)
    }
    // taso 2.
    if (stageNow.kulho &&
        x >= stageNow.kulho.x &&
        x <= stageNow.kulho.x + stageNow.kulho.width &&
        y >= stageNow.kulho.y &&
        y <= stageNow.kulho.y + stageNow.kulho.height) {
        // Pelaajalla pitää olla Pitka_keppi inventoriissa
        if (inventory.includes("Pitka_keppi")) {
            const idx = inventory.indexOf("Pitka_keppi");
            if (idx !== -1) {
                // Poistetaan keppi inventoriista
                inventory[idx] = 0;

                // Poistetaan kulho kentästä (ei enää piirretä)
                stageNow.kulho = null;

                // Lisää Avain_taso2 kentän esineisiin, jos sitä ei vielä ole
                const avainExists = Array.isArray(stageNow.images) &&
                    stageNow.images.some(it => it && it.name === "Avain_taso2");
                if (!avainExists) {
                    // Aseta sopivat koordinaatit/sukupuoli, tässä sijoitetaan kulhon paikalle oikealle
                    const newKey = {
                        x: 450,
                        y: 300,
                        width: 40,
                        height: 30,
                        value: imgAvain2,
                        name: "Avain_taso2",
                        obtained: 0
                    };
                    if (!Array.isArray(stageNow.images)) stageNow.images = [];
                    stageNow.images.push(newKey);
                }

                refreshCanvas();
                return;
            }
        }
    }

    if (stageNow.lockbox &&
        x >= stageNow.lockbox.x &&
        x <= stageNow.lockbox.x + stageNow.lockbox.width &&
        y >= stageNow.lockbox.y &&
        y <= stageNow.lockbox.y + stageNow.lockbox.height) { 
        // Pelaajalla pitää olla Avain_taso2 inventoriissa
        const emptyIdx = inventory.indexOf("Avain_taso2");
        if (emptyIdx !== -1) {
            inventory[emptyIdx] = "Yarnball";
            stageNow.lockbox = null;
            refreshCanvas();
        }
    }
    
        

    //3. taso, kun klikataan vesihanasta, saadaan vettä tyhjään lasikulhoon
    if (stageNow.vesihana &&
        x >= stageNow.vesihana.x &&
        x <= stageNow.vesihana.x + stageNow.vesihana.width &&
        y >= stageNow.vesihana.y &&
        y <= stageNow.vesihana.y + stageNow.vesihana.height) {

        const emptyIdx = inventory.indexOf("Lasikulho");
        if (emptyIdx !== -1) {
            // korvataan ensimmäinen Empty_Pot vesipotionilla
            inventory[emptyIdx] = "Vesikulhossa";
            console.log("Lasikulho -> Vesikulhossa");
            refreshCanvas();
            return;
        }
    }

    //3. taso, kun klikataan uunista, saadaan juustokakku, korvaa taikinan
    if (stageNow.uuni &&
        x >= stageNow.uuni.x &&
        x <= stageNow.uuni.x + stageNow.uuni.width &&
        y >= stageNow.uuni.y &&
        y <= stageNow.uuni.y + stageNow.uuni.height) {

        const emptyIdx = inventory.indexOf("Taikina");
        if (emptyIdx !== -1) {
            // korvataan ensimmäinen Empty_Pot vesipotionilla
            inventory[emptyIdx] = "Juustokakku_alt";
            console.log("Taikina -> Juustokakku_alt");
            refreshCanvas();
            return;
        }
    }

    // Boss Poisto test
    // Check boss clicks (if applicable)
    const boss1 = locations.stages[tasoNumero - 1].boss;
    if (
        boss1.alive === true &&
        x >= boss1.x && x <= boss1.x + boss1.width &&
        y >= boss1.y && y <= boss1.y + boss1.height
    ){
        // Vaaditaan että mixing-ikkuna on suljettu JA että inventory sisältää jonkin hyödyllisistä esineistä
        if (isMixingWindowOpen === false && inventory.includes("Potioni_keltainen") || inventory.includes("Juustokakku_alt") || inventory.includes("Yarnball")){

            if (inventory.includes("Potioni_keltainen")){
                inventory = inventory.filter(item => item !== "Potioni_keltainen"); 
            }
            if (inventory.includes("Yarnball")){
                inventory = inventory.filter(item => item !== "Yarnball");
            }
            if (inventory.includes("Juustokakku_alt")){
                inventory = inventory.filter(item => item !== "Juustokakku_alt");
            }

            boss1.alive = false;
            console.log("Bossi on voitettu!");
            inventory.unshift(0);
            avainHallussa = true;
            refreshCanvas();
            return;
        }
    }

    //oven klikkaus, josta tasosta siirtyminen toiseen?
    if (
        avainHallussa === true &&
        x >= stageNow.door.x && x <= stageNow.door.x + stageNow.door.width &&
        y >= stageNow.door.y && y <= stageNow.door.y + stageNow.door.height
    ){
        inNextLevel = true;
        tasoNumero++;
        inventory = [0, 0, 0, 0, 0, 0];
        avainHallussa = false;
        formulaHallussa = false;
        refreshCanvas();
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
