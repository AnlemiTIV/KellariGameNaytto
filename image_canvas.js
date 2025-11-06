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



/* const imgboss2 = new Image();
const img03 //kenttä 2
const img04 = new Image();
const img05 = new Image();
*/
//Canvas info, Canvas pohjatiedot
let body = document.width
let canvas01 = document.getElementById("canvas01");
let ctx = canvas01.getContext("2d");
let canvasWidth = canvas01.width;
let canvasHeight = canvas01.height

//Location data
/*
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
*/

/*const soundEffects = {
 stages: [
       { // All_Stages
          item_click: value: item_click.src,
          button_click: value: button_click.src,
          boss_click_fail: value: boss_click_1.src,
          boss_click_success: value: boss_click_2.src,
          door_click: value: door_click.src,
          mix_fail: value: mix_fail.src,
          mix_success: mix_success.src,
          game_over: game_over.src,
          hint_click: hint_click.src,
          minighost_click: minighost_click.src
          }
        ]
    }
*/

//1. tasosta 2. tasoon sen mukaan minkä arvoinen kenttänumero muuttuja on, numeron päivitettyä funktio uudelleen ladataan?
//Lisää sitten tarkemmat koordinaatit muokatuista tiedostoista mitkä jäsen päivittänyt



// käytä images esineihiin, mitkä menevät inventoriin!
const locations = {
    stages: [
        { // Stage 1
            id: 1,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground},
            music: "tba",
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
            music: "tba",
            boss: { x: 500, y: 250, width: 250, height: 250, value: imgboss2, alive: true},
            door: { x: 800, y: 400, width: 120, height: 200, value: "Door_02" },
            images: [
                { x: 150, y: 250, width: 220, height: 180, value: img03, name: "Item_03", obtained: 0},
                { x: 350, y: 450, width: 310, height: 180, value: img04, name: "Item_04", obtained: 0},

            ]
        },
        { // Stage 3
            id: 3,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground3},
            music: "tba",
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
                //Eli esineet joita ei näy kentässä, suurin osa roskakasasta, potionit klikkaamalla fuse tai vettä
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
imgCrackWall.src = "kuvat/taso_1_kuvat/seina_murtuma_alt.png";
imgPotEmpty.src = "kuvat/taso_1_kuvat/Potioni_01.png";
imgPotBlue.src = "kuvat/taso_1_kuvat/Potioni_vesi.png";
imgPotYellow.src = "kuvat/taso_1_kuvat/Potioni_keltainen.png";
imgPotPink.src = "kuvat/taso_1_kuvat/Potioni_pinkki.png";
imgPotGreen.src = "kuvat/taso_1_kuvat/Potioni_vihrea.png";
imgSpidWeb.src = "kuvat/taso_1_kuvat/Seitti.png";
imgMoldFood.src = "kuvat/taso_1_kuvat/mata_paprika.png";
imgTrash.src = "kuvat/taso_1_kuvat/Roskakasa_placeholder.png";

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
        imgCrackWall.onload = function() { refreshCanvas(); }
        imgPotEmpty.onload = function() { refreshCanvas(); }
        imgPotBlue.onload = function() { refreshCanvas(); }
        imgPotYellow.onload = function() { refreshCanvas(); }
        imgPotPink.onload = function() { refreshCanvas(); }
        imgPotGreen.onload = function() { refreshCanvas(); }
        imgSpidWeb.onload = function() { refreshCanvas(); }
        imgMoldFood.onload = function() { refreshCanvas(); }
        imgTrash.onload = function() { refreshCanvas(); }
        imgGlassEmpty.onload = function() { refreshCanvas(); } //Taso 3 esineet
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

/*for (const key in img) {
  img[key].onload = function() {
    refreshCanvas();
  };
}
*/

//Vaihtoehto jos tarvetta
//export {images, locations, genImageOnLoad};

//loadImages() //or genImageOnload()