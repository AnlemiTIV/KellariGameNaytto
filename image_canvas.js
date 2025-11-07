//new Image() data
//module vaihtoehto - const images = {img01: new Image(),}
//const images = {kentta1: {img01: new Image(), img02 = new Image(),....}}

const img01 = new Image();
const img02 = new Image();
const img03 = new Image();
const img04 = new Image();
const imgMixed = new Image();
const imgboss1 = new Image();
const imgboss2 = new Image();
const imgboss3 = new Image();
const imgavain = new Image();
const imgBackground = new Image();
const imgBackground2 = new Image();
const imgBackground3 = new Image();
const imgBackground4 = new Image();
const imgformula = new Image();
//formulakuvat
const imgFormula1 = new Image();
const imgFormula2 = new Image();
const imgFormula3 = new Image();
// Taso 1 itemit
const imgPotEmpty = new Image();
const imgPotBlue = new Image();
const imgPotYellow = new Image();
const imgPotPink = new Image();
const imgPotGreen = new Image();
const imgSpidWeb = new Image();
const imgCrackWall = new Image();
const imgMoldFood = new Image();
const imgTrash = new Image();
// Taso 2 itemit
const imgKulho = new Image();
const imgLongStick = new Image();
const imgWoodLeg = new Image();
const imgGum = new Image();
const imgRuler = new Image();
const imgAvain2 = new Image();
const imgYarnball = new Image();
//Taso 3 itemit
const imgGlassEmpty = new Image();
const imgGlassBlue = new Image();
const imgGlassYolk = new Image();
const imgGlassDough = new Image();
const imgOneEgg = new Image();
const imgEggCarton = new Image();
const imgMilk = new Image();
const imgFlour = new Image();
const imgCheese = new Image();
const imgCheeseCake = new Image();


//Canvas info, Canvas pohjatiedot
let body = document.width
let canvas01 = document.getElementById("canvas01");
let ctx = canvas01.getContext("2d");
let canvasWidth = canvas01.width;
let canvasHeight = canvas01.height

const sounds = {};
let currentBGM = null;
const soundFiles = {
    item_click: "Musiikki/Aanieffektit/Button.mp3",            // esineen tai nappulan klikkaus
    boss_click_fail: "Musiikki/Aanieffektit/punch-04-383965.mp3",     // pomon napautus ilman aseita
    boss_click_success: "Musiikki/Aanieffektit/explosion-9-340460.mp3", // pomon kukistus
    door_click: "Musiikki/Aanieffektit/key-open-door-45516.mp3",     // oven avaus / avain käytetty
    mix_success: "Musiikki/Aanieffektit/cute-level-up-3-189853.mp3",  // oikea miksaus
    mix_fail: "Musiikki/Aanieffektit/negative_beeps-6008.mp3",       // väärä miksaus
    hint_click: "Musiikki/Aanieffektit/announcement-sound-5-21465.mp3", // formula/hint
    game_over: "Musiikki/Aanieffektit/notification-8-337830.mp3",      // end-screen
    vesihana_click: "Musiikki/Aanieffektit/pouring-water-fast-into-a-glass-107902.mp3",   // vesihana
    oven_click: "Musiikki/Aanieffektit/short-fire-whoosh_1-317280.mp3",
    taso1BGM: "Musiikki/MusiikkiKentat/fable-loop-372218.mp3",
    taso2BGM: "Musiikki/MusiikkiKentat/halloween-background-music-413525.mp3",
    taso3BGM: "Musiikki/MusiikkiKentat/just-snooping-around-funny-384399.mp3",

};

for (const key in soundFiles) {
    try {
        const a = new Audio(soundFiles[key]);
        a.preload = "auto";
        sounds[key] = a;
    } catch (e) {
        console.warn("Audio load failed:", soundFiles[key], e);
    }
}

function playSound(name, opts = {}) {

    const s = sounds[name];
    if (!s) return;
    try {
        s.currentTime = 0;
        if (typeof opts.volume === "number") s.volume = opts.volume;
        s.play().catch(err => console.warn("playSound error", name, err));
    } catch (e) {
        console.warn("playSound exception", name, e);
    }
     
}
function playBGM(name, opts = {}) {
    // Jos musiikki soi jo, pysäytetään se
    if (currentBGM && !currentBGM.paused) {
        currentBGM.pause();
        currentBGM.currentTime = 0;
    }

    const bgm = sounds[name];
    if (!bgm) return;

    bgm.loop = true; // toistetaan jatkuvasti
    bgm.volume = typeof opts.volume === "number" ? opts.volume : 0.4; // oletusvolume
    bgm.play().catch(err => console.warn("playBGM error", name, err));

    currentBGM = bgm;
}

// käytä images esineihiin, mitkä menevät inventoriin!
const locations = {
    stages: [
        { // Stage 1
            id: 1,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground},
            music: soundFiles.taso1BGM,
            boss: { x: 400, y: 300, width: 250, height: 250, value: imgboss1, alive: true},
            door: { x: 450, y: 300, width: 170, height: 160, value: "Door_01" },
            trash: { x: 60, y: 380, width: 300, height: 200, value: imgTrash},
            crackWall: { x: 650, y: 380, width: 250, height: 250, value: imgCrackWall},
            images: [
                { x: (canvasWidth/2 + 180), y: 248, width: 100, height: 100, value: imgPotEmpty, name: "Empty_Pot", obtained: 0},
                { x: (canvasWidth/2 + 360), y: 300, width: 75, height: 40, value: imgformula, name: "form_paperi", obtained: 0},
                { x: (canvasWidth/2 - 150), y: 400, width: 100, height: 100, value: imgSpidWeb, name:"seitti", obtained: 0},
                {value: imgMoldFood, name:"mata_paprika", obtained: 0},
                {value: imgPotGreen, name:"Potioni_vihrea", obtained: 0},
                {value: imgPotPink, name:"Potioni_Pinkki", obtained: 0},
                {value: imgPotYellow, name:"Potioni_keltainen", obtained: 0}
            ],
        },
        { // Stage 2
            id: 2,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground2},
            music: soundFiles.taso2BGM,
            boss: { x: 570, y: 200, width: 250, height: 250, value: imgboss2, alive: true},
            door: { x: 800, y: 200, width: 120, height: 200, value: "Door_02" },
            kulho: { x: 370, y: 145, width: 50, height: 40, value: imgKulho},
            lockbox: { x: 280, y: 450, width: 80, height:80, value: img04, name: "Item_04", obtained: 0},
            images: [
                { x: 300, y: 400, width: 20, height: 20, value: imgformula, name: "form_paperi", obtained: 0},
                { x: 800, y: 450, width: 50, height: 50, value: imgWoodLeg, name:"Puunjalka", obtained: 0},
                { x: 100, y: 550, width: 40, height: 40, value: imgGum, name:"Purkka", obtained: 0},
                { x: 330, y: 310, width: 40, height: 15, value: imgRuler, name:"Viivoitin", obtained: 0},
                {value: imgLongStick, name:"Pitka_keppi", obtained: 0},
                {value: imgYarnball, name:"Yarnball", obtained: 0}
            ]
        },
        { // Stage 3
            id: 3,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground3},
            music: soundFiles.taso3BGM,
            boss: { x: 410, y: 170, width: 185, height: 185, value: imgboss3, alive: true},
            door: { x: 380, y: 190, width: 70, height: 130, value: "Door_03" },
            vesihana : {x: 900, y: 270, width: 140, height: 110, value: "vesihana"},
            munakotelo: { x: 877, y: 252, width: 40, height: 30, value: imgEggCarton},
            uuni : {x: 760, y: 250, width: 120, height: 120, value: "uuni"},
            images: [
                { x: (canvasWidth/2 - 163), y: 363, width: 60, height: 40, value: imgGlassEmpty, name: "Lasikulho", obtained: 0}, //juusto, maito, jauho
                { x: 850, y: 353, width: 65, height: 35, value: imgformula, name:"form_paperi", obtained: 0},
                { x: 695, y: 243, width: 29, height: 29, value: imgCheese, name:"Juusto", obtained: 0},
                { x: 280, y: 325, width: 40, height: 70, value: imgMilk, name:"Maitopurkki", obtained: 0},
                { x: 819, y: 268, width: 28, height: 30, value: imgFlour, name:"Jauhot", obtained: 0},
                {value: imgOneEgg, name:"Kananmuna_alt", obtained: 0},
                {value: imgGlassBlue, name:"Vesikulhossa", obtained: 0},
                {value: imgGlassYolk, name:"Keltuainen_Sekoitus", obtained: 0},
                {value: imgGlassDough, name:"Taikina", obtained: 0},
                {value: imgCheeseCake, name:"Juustokakku_alt", obtained: 0}
            ]
        },
        { // Stage 4
            id: 4,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground4.src},
            music: "tba",
            boss: { x: 500, y: 250, width: 250, height: 250, value: "Boss_04", alive: true},
            door: { x: 800, y: 400, width: 120, height: 200, value: "Door_04" },
            images: [
                { x: 100, y: 200, width: 230, height: 190, value: "Item_07", obtained: false},
                { x: 420, y: 470, width: 320, height: 200, value: "Item_08", obtained: false }
            ]
        }
    ]
};


//alt - setImageSource(){images.img01.src = "kuvat-Item_01.png",...} then call this function on canvas
//taso 1 - taso 4 ... images.taso1.img01.src =kuvat-item01.png" 
img01.src = "kuvat/Item_01.png";
img02.src = "kuvat/Item_02.png";
img03.src = "kuvat/taso_2_kuvat/Lukittu_boxi.png";
img04.src = "kuvat/taso_2_kuvat/Lukittu_boxi_alt.png";
imgboss1.src = "kuvat/taso_1_kuvat/Boss_01.png";
imgboss2.src = "kuvat/taso_2_kuvat/Boss_02.png";
imgboss3.src = "kuvat/taso_3_kuvat/Boss_03.png";
imgMixed.src = "kuvat/Mixed_01.png";
imgavain.src = "kuvat/key_item.png";
imgBackground.src = "kuvat/taso_1_kuvat/Taso_1.png";
imgBackground2.src = "kuvat/taso_2_kuvat/Taso_2.png";
imgBackground3.src = "kuvat/taso_3_kuvat/Taso_3_alt2.png";
imgBackground4.src = "kuvat/taso_4_kuvat/Taso_4.png";
imgformula.src = "kuvat/Formula_paperi.png";
imgFormula1.src = "kuvat/taso_1_kuvat/Taso1Formula.png";
imgFormula2.src = "kuvat/taso_2_kuvat/Taso2Formula.png";
imgFormula3.src = "kuvat/taso_3_kuvat/Taso3Formula.png";
// Taso 1 itemit
imgCrackWall.src = "kuvat/taso_1_kuvat/seina_murtuma_alt.png";
imgPotEmpty.src = "kuvat/taso_1_kuvat/Potioni_01.png";
imgPotBlue.src = "kuvat/taso_1_kuvat/Potioni_vesi.png";
imgPotYellow.src = "kuvat/taso_1_kuvat/Potioni_keltainen.png";
imgPotPink.src = "kuvat/taso_1_kuvat/Potioni_pinkki.png";
imgPotGreen.src = "kuvat/taso_1_kuvat/Potioni_vihrea.png";
imgSpidWeb.src = "kuvat/taso_1_kuvat/Seitti.png";
imgMoldFood.src = "kuvat/taso_1_kuvat/mata_paprika.png";
imgTrash.src = "kuvat/taso_1_kuvat/Roskakasa_placeholder.png";
// Taso 2 itemit
imgKulho.src = "kuvat/taso_2_kuvat/Kulho_alt.png";
imgLongStick.src = "kuvat/taso_2_kuvat/Pitka_keppi.png";
imgWoodLeg.src = "kuvat/taso_2_kuvat/puunjalka.png";
imgGum.src = "kuvat/taso_2_kuvat/purkka.png";
imgRuler.src = "kuvat/taso_2_kuvat/Viivoitin.png";
imgAvain2.src = "kuvat/taso_2_kuvat/Avain_taso2.png";
imgYarnball.src = "kuvat/taso_2_kuvat/yarnball.png";
// Taso 3 itemit
imgGlassEmpty.src = "kuvat/taso_3_kuvat/Lasikulho.png";
imgGlassBlue.src = "kuvat/taso_3_kuvat/Vesikulhossa.png";
imgGlassYolk.src = "kuvat/taso_3_kuvat/Keltuainen_Sekoitus.png";
imgGlassDough.src = "kuvat/taso_3_kuvat/Taikina.png";
imgOneEgg.src = "kuvat/taso_3_kuvat/Kananmuna_alt.png";
imgEggCarton.src = "kuvat/taso_3_kuvat/Munakotelo_alt.png";
imgCheese.src = "kuvat/taso_3_kuvat/Juusto.png";
imgFlour.src = "kuvat/taso_3_kuvat/Jauhot.png";
imgMilk.src = "kuvat/taso_3_kuvat/Maitopurkki.png";
imgCheeseCake.src = "kuvat/taso_3_kuvat/Juustokakku_alt.png"; 

//image onload data
function genImageOnload(){
    
    document.addEventListener("DOMContentLoaded", function() {
        
        imgBackground.onload = function() { refreshCanvas(); }    
        imgBackground2.onload = function() { refreshCanvas(); }
        imgBackground3.onload = function() { refreshCanvas(); }   
        img01.onload = function() { refreshCanvas(); }    
        img02.onload = function() { refreshCanvas(); }
        img03.onload = function() { refreshCanvas(); }  
        img04.onload = function() { refreshCanvas(); }    
        imgboss1.onload = function() { refreshCanvas(); }  
        imgboss2.onload = function() { refreshCanvas(); }
        imgboss3.onload = function() { refreshCanvas(); }     
        imgavain.onload = function() { refreshCanvas(); }
        imgformula.onload = function() { refreshCanvas(); }
        imgFormula1.onload = function() { refreshCanvas(); }
        imgFormula2.onload = function() { refreshCanvas(); }
        imgFormula3.onload = function() { refreshCanvas(); }
        //Taso 1 esineet
        imgCrackWall.onload = function() { refreshCanvas(); }
        imgPotEmpty.onload = function() { refreshCanvas(); }
        imgPotBlue.onload = function() { refreshCanvas(); }
        imgPotYellow.onload = function() { refreshCanvas(); }
        imgPotPink.onload = function() { refreshCanvas(); }
        imgPotGreen.onload = function() { refreshCanvas(); }
        imgSpidWeb.onload = function() { refreshCanvas(); }
        imgMoldFood.onload = function() { refreshCanvas(); }
        imgTrash.onload = function() { refreshCanvas(); } 
        //Taso 2 esineet
        imgKulho.onload = function() { refreshCanvas(); }
        imgLongStick.onload = function() { refreshCanvas(); }
        imgWoodLeg.onload = function() { refreshCanvas(); }
        imgGum.onload = function() { refreshCanvas(); }
        imgRuler.onload = function() { refreshCanvas(); }
        imgAvain2.onload = function() { refreshCanvas(); }
        imgYarnball.onload = function() { refreshCanvas(); }
        //Taso 3 esineet
        imgGlassEmpty.onload = function() { refreshCanvas(); } 
        imgGlassBlue.onload = function() { refreshCanvas(); }
        imgGlassYolk.onload = function() { refreshCanvas(); }
        imgGlassDough.onload = function() { refreshCanvas(); }
        imgOneEgg.onload = function() { refreshCanvas(); }
        imgEggCarton.onload = function() { refreshCanvas(); }
        imgCheese.onload = function() { refreshCanvas(); }
        imgFlour.onload = function() { refreshCanvas(); }
        imgMilk.onload = function() { refreshCanvas(); }
        imgCheeseCake.onload = function() { refreshCanvas(); }
    
    });
};