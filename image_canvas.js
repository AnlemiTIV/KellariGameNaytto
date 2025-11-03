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
const imgavain = new Image();
const imgBackground = new Image();
const imgBackground2 = new Image();
const imgBackground3 = new Image();
const imgBackground4 = new Image();
const imgformula = new Image();
// Lisätty: erilliset formula-kuvat tasoille (Taso1Formula, Taso2Formula, Taso3Formula)
const imgFormula1 = new Image();
const imgFormula2 = new Image();
const imgFormula3 = new Image();
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
const locations = {
    stages: [
        { // Stage 1
            id: 1,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground},
            music: "tba",
            boss: { x: 400, y: 300, width: 250, height: 250, value: imgboss1, alive: true},
            door: { x: 450, y: 300, width: 170, height: 160, value: "Door_01" },
            images: [
                { x: (canvasWidth/2 - 120), y: 150, width: 150, height: 150, value: img01, name: "Item_01", obtained: 0},
                { x: (canvasWidth/2 + 220), y: 120, width: 150, height: 150, value: img02, name: "Item_02", obtained: 0},
                { x: (canvasWidth/2 + 360), y: 300, width: 75, height: 40, value: imgformula, name: "form_paperi", obtained: 0}
            ]
        },
        { // Stage 2
            id: 2,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground2},
            music: "tba",
            boss: { x: 500, y: 250, width: 250, height: 250, value: imgboss2, alive: true},
            door: { x: 800, y: 400, width: 120, height: 200, value: "Door_02" },
            images: [
                { x: 150, y: 250, width: 220, height: 180, value: img03, name: "Item_03", obtained: 0},
                { x: 350, y: 450, width: 310, height: 180, value: img04, name: "Item_04", obtained: 0}
            ]
        },
        { // Stage 3
            id: 3,
            background: { x: 0, y: 0, width: canvasWidth, height: canvasHeight, value: imgBackground3.src},
            music: "tba",
            boss: { x: 500, y: 250, width: 250, height: 250, value: "Boss_03", alive: true},
            door: { x: 800, y: 400, width: 120, height: 200, value: "Door_03" },
            images: [
                { x: 100, y: 200, width: 230, height: 190, value: "Item_05", obtained: 0},
                { x: 420, y: 470, width: 320, height: 200, value: "Item_06", obtained: 0}
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
imgMixed.src = "kuvat/Mixed_01.png";
imgavain.src = "kuvat/key_item.png";
imgBackground.src = "kuvat/taso_1_kuvat/Taso_1.png";
imgBackground2.src = "kuvat/taso_2_kuvat/Taso_2.png";
imgBackground3.src = "kuvat/taso_3_kuvat/Taso_3.png";
imgBackground4.src = "kuvat/taso_4_kuvat/Taso_4.png";
imgformula.src = "kuvat/Formula_paperi.png";
imgFormula1.src = "kuvat/taso_1_kuvat/Taso1Formula.png";
imgFormula2.src = "kuvat/taso_2_kuvat/Taso2Formula.png";
imgFormula3.src = "kuvat/taso_3_kuvat/Taso3Formula.png";

//image onload data
function genImageOnload(){
    
    document.addEventListener("DOMContentLoaded", function() {
        
        imgBackground.onload = function() { refreshCanvas(); }    
        imgBackground2.onload = function() { refreshCanvas(); }  
        img01.onload = function() { refreshCanvas(); }    
        img02.onload = function() { refreshCanvas(); }
        img03.onload = function() { refreshCanvas(); }  
        img04.onload = function() { refreshCanvas(); }    
        imgboss1.onload = function() { refreshCanvas(); }  
        imgboss2.onload = function() { refreshCanvas(); }    
        imgavain.onload = function() { refreshCanvas(); }
        imgformula.onload = function() { refreshCanvas(); }
        imgFormula1.onload = function() { refreshCanvas(); }
        imgFormula2.onload = function() { refreshCanvas(); }
        imgFormula3.onload = function() { refreshCanvas(); }
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