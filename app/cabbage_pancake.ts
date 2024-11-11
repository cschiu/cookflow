import { Recipe, Ingredient, Step, Operation, Time, Time_Unit, Ingredient_Unit} from "./RecipeMarkupLanguage"


const cabbage_pancake_premix = new Operation("Cabbage Pancake Pre-mix", [new Step("mix"), new Step("wait", new Time(10, Time_Unit.MINUTES))], [
    new Operation("Sliced Cabbage", [new Step("slice")], [new Ingredient("Cabbage", 0.5)]),
    new Operation("Sliced Onion", [new Step("slice")], [new Ingredient("Onion", 1)]),
    new Operation("Cut Chives", [new Step("cut 4\"")], [new Ingredient("Chives")]),
    new Operation("Diced Shrimp", [new Step("dice")], [new Ingredient("Shrimp", 4, Ingredient_Unit.OZ)]),
    new Ingredient("Egg", 1),
    new Ingredient("Soy Sauce", 1, Ingredient_Unit.TBSP),
    new Ingredient("Black Pepper"),
])

const cabbage_pancake_batter = new Operation("Cabbage Pancake Batter", [new Step("mix")], [cabbage_pancake_premix, new Ingredient("Flour", 0.5, Ingredient_Unit.CUP)])

const heated_oil = new Operation("Heated Oil", [new Step("heat in pan")], [new Ingredient("Vegetable Oil", 1, Ingredient_Unit.TBSP)])

const uncooked_cabbage_pancake = new Operation("Uncooked Cabbage Pancake", [new Step("pack")], [heated_oil, cabbage_pancake_batter])

const cooked_cabbage_pancake = new Operation("Cooked Cabbage Pancake", [new Step("cook", new Time(6, Time_Unit.MINUTES)), new Step("flip"), new Step("cook", new Time(3, Time_Unit.MINUTES))], [uncooked_cabbage_pancake])

const cabbage_pancake = new Recipe("Cabbage Pancake", cooked_cabbage_pancake)


// console.log(JSON.stringify(cabbage_pancake))