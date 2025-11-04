class Recipe {
    constructor(ingredients, result) {
        this.ingredients = ingredients;
        this.result = result;
    }
}

// Reseptit (käytä samoja stringejä kuin inventory / mixingSlots: esim "Item_01")
const recipes = [
    new Recipe(["Item_01", "Item_02"], "MixTest"),
    new Recipe(["Potioni_vihrea", "seitti"], "Potioni_Pinkki"),
    new Recipe(["Potioni_Pinkki", "Potioni_vesi","mata_paprika"], "Potioni_keltainen"),
];

// apu: laskee arvon esiintymät taulukossa
function countOccurrences(arr, val) {
    return arr.reduce((c, x) => c + (x === val ? 1 : 0), 0);
}

// Tarkistaa voidaanko resepti tehdä mixingSlots:ista (ottaa huomioon määrät)
function canMixFromSlots(ingredients) {
    // kopioidaan mixingSlotsin sisältö (ei käy muutoksia läpi)
    const slotValues = mixingSlots.filter(s => s !== 0);
    // jokaisen tarvittavan ainesosan esiintymismäärä <= slotValues:n määrä
    return ingredients.every(ing => countOccurrences(slotValues, ing) >= countOccurrences(ingredients, ing));
}

// Poistaa käytetyt ainesosat mixingSlots:ista (poistaa vain tarvittavan määrän kutakin)
function removeIngredientsFromSlots(ingredients) {
    // käydään läpi jokainen ainesosa ja nollataan vastaava slot löytyessään
    const toRemove = {};
    for (const ing of ingredients) {
        toRemove[ing] = (toRemove[ing] || 0) + 1;
    }
    for (const ing in toRemove) {
        let needed = toRemove[ing];
        for (let i = 0; i < mixingSlots.length && needed > 0; i++) {
            if (mixingSlots[i] === ing) {
                mixingSlots[i] = 0;
                needed--
            };
        }
    }
    // Poiston jälkeen kompaktataan slotit vasempaan (ei aukkoja)
    if (typeof compactMixingSlots === "function") compactMixingSlots();
}

// Kompaktoi mixingSlots: siirtää kaikki ei-nollat vasempaan ja täyttää lopun nollilla
function compactMixingSlots() {
    const vals = mixingSlots.filter(s => s !== 0);
    for (let i = 0; i < mixingSlots.length; i++) {
        mixingSlots[i] = vals[i] || 0;
    }
}

// Kompaktoi inventory: siirtää kaikki ei-nollat vasempaan ja täyttää lopun nollilla
function compactInventory() {
    const vals = inventory.filter(s => s !== 0);
    for (let i = 0; i < inventory.length; i++) {
        inventory[i] = vals[i] !== undefined ? vals[i] : 0;
    }
}

// Lisää tuloksen inventoryyn: käyttää ensimmäistä tyhjää paikkaa (0) tai pushaa eteen
function addResultToInventory(result) {
    console.log("Lisätään inventoriin:", result);
    const emptyIndex = inventory.findIndex(s => s === 0);
    if (emptyIndex !== -1) {
        inventory[emptyIndex] = result;
    } else {
        inventory.unshift(result);
        inventory.pop();
    }
    // Kompaktoi invetoriota poistojen/siirtojen jälkeen
    compactInventory();
    console.log("Uusi inventori:", inventory);
}

// Poistaa ainesosia inventoriosta ja kompaktoi
function removeIngredientsFromInventory(ingredients) {
    ingredients.forEach(item => {
        const idx = inventory.indexOf(item);
        if (idx > -1) inventory[idx] = 0;
    });
    // Siirrä kaikki jäljellä olevat tavarat vasemmalle
    compactInventory();
}

// Pääfunktio: yrittää tehdä miksausta. Palauttaa tuloksen tai null jos ei onnistu. 
function tryMix() {
    for (const recipe of recipes) {
        if (canMixFromSlots(recipe.ingredients)) {
            removeIngredientsFromSlots(recipe.ingredients);
            addResultToInventory(recipe.result);
            mixingResult = recipe.result;
            console.log("Miksasit (slots):", recipe.ingredients.join(" + "), "->", recipe.result);
            // Päivitä näkymä: jos sekoitusikkuna auki, piirrä se uudelleen, muuten päivitys pääruudulle
            if (typeof createMixingWindow === "function" && isMixingWindowOpen) {
                createMixingWindow();
            } else if (typeof refreshCanvas === "function") {
                refreshCanvas();
            }
            return recipe.result;
        }
    }

    console.log("Ei sopivaa miksausta!");
    return null;
}