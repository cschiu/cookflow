import { Recipe, Ingredient, Step, Operation, Time, TimeUnit, IngredientUnit, Component} from "./RecipeMarkupLanguage"

const cabbagePancakePreMix: Component = {
    output: { name : "Cabbage Pancake Pre-Mix" },
    steps : [
        { instruction: "mix" },
        { instruction: "wait", time: { duration: 10, timeUnit:"minutes" } },
    ],
    components:[
        {
            output: { name : "Sliced Cabbage" },
            steps: [ { instruction: "slice" } ],
            components:[ { name: "Cabbage"} ]
        },
        {
            output: { name : "Sliced Onion" },
            steps: [ { instruction: "slice" } ],
            components:[ { name: "Onion"} ]
        },
        {
            output: { name : "Cut Chives" },
            steps: [ { instruction: "chop to 4 in pieces" } ],
            components:[ { name: "Chives"} ]
        },
        {
            output: { name : "Diced Shrimp" },
            steps: [ { instruction: "dice to 1cm chunks" } ],
            components:[ { name: "Shrimp"} ]
        },
        { name: "Egg", qty: 1 },
        { name: "Soy Sauce" },
        { name: "Black Pepper" }
    ]
}

const cabbagePancakeBatter: Component = {
    output: { name : "Cabbage Pancake Batter" },
    steps: [ { instruction:"mix together" } ],
    components: [
        { name :"Flour", qty: 0.5, unit: "cup" },
        cabbagePancakePreMix
    ]
}

const heatedOil: Component = {
    output: { name : "Heated Oil" },
    steps: [ { instruction: "heat in pan"} ],
    components: [ { name: "Vegetable Oil"}]
}

const cabbagePancake: Recipe = {
    name: "Cabbage Pancake",
    component : {
        output: { name: "Cabbage Pancake"},
        steps : [
            {
                instruction: "cook",
                time: {
                  duration: 6,
                  timeUnit: "minutes"
                }
              },
              {
                instruction: "flip"
              },
              {
                instruction: "cook",
                time: {
                  duration: 3,
                  timeUnit: "minutes"
                }
              }
        ],
        components : [
            heatedOil,
            cabbagePancakeBatter
        ]
    }
}

console.log(JSON.stringify(cabbagePancake))