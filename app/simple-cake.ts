import { Recipe } from "./RecipeMarkupLanguage"

const simpleCake: Recipe = {
    name: "Simple Cake",
    component: {
        output: { name: "Simple Cake" },
        steps: [
            {  
                instruction: "Pour into 12x12 cake pan"
            },
            {
                instruction: "Bake in a preheated oven at 350°F.",
                time: { duration: 20, timeUnit: 'minutes' }
            }
        ],
        components: [
            {
                output: { name: "Cake Batter" },
                steps: [
                    {
                        instruction : "mix together"
                    }
                ],
                components: [
                    {
                        output: { name: "Dry Ingredients" },
                        steps: [
                            {
                                instruction : "sift together"
                            }
                        ],
                        components: [
                            { name: "Flour", qty: 2, unit: "cup" },
                            { name: "Sugar", qty: 1, unit: "cup" },
                            { name: "Baking Powder", qty: 1, unit: "tbsp" },
                        ]
                    },
                    { name: "Milk", qty: 0.5, unit: "cup" },
                    { name: "Egg", qty: 2 },
                    {
                        output: { name: "Melted butter"},
                        steps : [ { instruction: "melt" } ],
                        components : [ { name : "Butter", qty: 4, unit: "tbsp"}]
                    }
                ]
            }
        ]
    }
}

console.log(JSON.stringify(simpleCake))
