

class Recipe {
    constructor(ingredients, result) {
        this.ingredients = ingredients;
        this.result = result;
    }
}
// Reseptit 
const recipes = [
    new Recipe(["kuva01", "item02"], "MixTest"),
    new Recipe(["juusto", "leipa"], "nami")             
];

// Tarkistaa löytyykö kaikki ainesosat 
function canMix(ingredients) {
    return ingredients.every(item => inventory.includes(item));
}

// Poistaa käytetyt ainesosat, jos miksaus onnistuu 
function removeIngredients(ingredients) {
    ingredients.forEach(item => {
        const idx = inventory.indexOf(item);
        if (idx > -1) inventory.splice(idx, 1);
    });
}

// Miksausfunktio, joka käy kaikki reseptit läpi
function tryMix() {
    for (const recipe of recipes) {
        if (canMix(recipe.ingredients)) {
            removeIngredients(recipe.ingredients);
            inventory.push(recipe.result);
            console.log("Miksasit:", recipe.ingredients.join(" + "), "->", recipe.result);
            return recipe.result;
        }
    }
    console.log("Ei sopivaa miksausta!");
    return null;
}

