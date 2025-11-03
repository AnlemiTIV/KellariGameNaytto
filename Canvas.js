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

    // Piirrä item_01, jos sitä ei ole otettu
    // Tämän voisi koodata uudelleen erilaisella tavalla, mutta saa kelvata toistaiseksi
    // Voi toimia 1. kentässä mutta ei jatkossa
    if (stageNow.images[0].obtained !== 1){
        ctx.drawImage(stageNow.images[0].value, stageNow.images[0].x, stageNow.images[0].y, stageNow.images[0].width, stageNow.images[0].height);
    }
    // Piirrä item_02, jos sitä ei ole otettu
    if (stageNow.images[1].obtained !== 1){
        ctx.drawImage(stageNow.images[1].value, stageNow.images[1].x, stageNow.images[1].y, stageNow.images[1].width, stageNow.images[1].height);
    }
     // Piirrä item_03 (formula). Pitäisi muuttaa myöhemmin omaan kuin images
    if (stageNow.images[2] && stageNow.images[2].obtained !== 1){
        ctx.drawImage(stageNow.images[2].value, stageNow.images[2].x, stageNow.images[2].y, stageNow.images[2].width, stageNow.images[2].height);
    }
    // Piirrä boss
    if (stageNow.boss.alive) { //`item_${item_number}`)
        ctx.drawImage(stageNow.boss.value, stageNow.boss.x, stageNow.boss.y, stageNow.boss.width, stageNow.boss.height);
    }

    //Piirrä avain inventorin ulkopuolelle
    if (avainHallussa === true){
        ctx.drawImage(imgavain, 90, 529, 95, 95);
    }

    // Piirrä inventaarion esineet
    // Tätä osiota kenties muokattava, jos tarkoitus edetä kentästä toiseen, ehdottomasti
    let invIndex = 0;
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
       
        if (item === "Item_01") {
            ctx.drawImage(stageNow.images[0].value, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        } else if (item === "Item_02") {
            ctx.drawImage(stageNow.images[1].value, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        } else if (item === "Item_03") {
            ctx.drawImage(stageNow.images[0].value, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        } else if (item === "Item_04") {
            ctx.drawImage(stageNow.images[1].value, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        } else if (item === "MixTest") {
            ctx.drawImage(imgMixed, (invIndex * 110) + inventoryBaseX, 615, 120, 120);
            invIndex++;
        }
      
        // Lisää muita esineitä tarvittaessa
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
    //('item_${item_number}') esim, kun tarkoitus pitää kirjaa missä kentässä mennään?

    // Boss Poisto test
    // Check boss clicks (if applicable)
    const boss1 = locations.stages[tasoNumero - 1].boss;
    if (
        boss1.alive === true &&
        x >= boss1.x && x <= boss1.x + boss1.width &&
        y >= boss1.y && y <= boss1.y + boss1.height
    ){
        
        if (isMixingWindowOpen === false && inventory.includes("MixTest")){
            inventory = inventory.filter(item => item !== "MixTest");
            boss1.alive = false;
            console.log("Bossi on voitettu!");
            inventory.unshift(0);
            //useless = inventory.pop();
            //AL 25.10.25. Tässä todennäköisesti aktivoidaan muttujan arvo, mikä lisää avaimen käyttöön
            //Ja tällä avaimella, saadaan muutokset aikaan kun ovesta painetaan, mikä vie meidät erilaiseen tasoon
            avainHallussa = true;        
            refreshCanvas();
            return;
        }}
        //else if jos erilainen tulos inventorissa, tosin tämä ei varmaan paras mahdollinen tapa
        //else if()){

        //}

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