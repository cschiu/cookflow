import { Recipe, Component } from "./RecipeMarkupLanguage"

const cabbagePancakePreMix: Component = {
    output: { name : "Cabbage Pancake Pre-Mix",
              qty : 7
            },
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
    output: { name : "Cabbage Pancake Batter",
              qty : 7.5
            },
    steps: [ { instruction:"mix together" } ],
    components: [
        cabbagePancakePreMix,
        { name :"Flour", qty: 0.5, unit: "cup" }
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
        output: { name: "Cabbage Pancake",
                  qty : 8.5
                },
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
            cabbagePancakeBatter,
            heatedOil
        ]
    }
}

console.log(JSON.stringify(cabbagePancake))