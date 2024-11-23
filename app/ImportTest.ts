import { Recipe, Ingredient, Operation, Component } from './RecipeMarkupLanguage.js'
import { RMLGraphGenerator } from './RMLGraphGenerator.js'
import { Database } from './Database.js'

console.log("================")

const cabbagePancakeJson = '{"name":"Cabbage Pancake","component":{"output":{"name":"Cabbage Pancake"},"steps":[{"instruction":"cook","time":{"duration":6,"timeUnit":"minutes"}},{"instruction":"flip"},{"instruction":"cook","time":{"duration":3,"timeUnit":"minutes"}}],"components":[{"output":{"name":"Cabbage Pancake Batter"},"steps":[{"instruction":"mix together"}],"components":[{"output":{"name":"Cabbage Pancake Pre-Mix"},"steps":[{"instruction":"mix"},{"instruction":"wait","time":{"duration":10,"timeUnit":"minutes"}}],"components":[{"output":{"name":"Sliced Cabbage"},"steps":[{"instruction":"slice"}],"components":[{"name":"Cabbage","qty":0.5}]},{"output":{"name":"Sliced Onion"},"steps":[{"instruction":"slice"}],"components":[{"name":"Onion"}]},{"output":{"name":"Cut Chives"},"steps":[{"instruction":"chop to 4 in pieces"}],"components":[{"name":"Chives"}]},{"output":{"name":"Diced Shrimp"},"steps":[{"instruction":"dice to 1cm chunks"}],"components":[{"name":"Shrimp","qty":100,"unit":"g"}]},{"name":"Egg","qty":1},{"name":"Soy Sauce","qty":1,"unit":"tbsp"},{"name":"Black Pepper","qty":1,"unit":"tsp"}]},{"name":"Flour","qty":0.5,"unit":"cup"}]},{"output":{"name":"Heated Oil"},"steps":[{"instruction":"heat in pan"}],"components":[{"name":"Vegetable Oil","qty":2,"unit":"tbsp"}]}]}}'
const cabbagePancakeObject: Recipe = JSON.parse(cabbagePancakeJson) as Recipe

// console.log(cabbagePancakeObject.name)
// console.log(cabbagePancakeObject.component)

// const component : Component = cabbagePancakeObject.component as Component

// console.log(typeof component)

// const isOperation = (obj: any): boolean => obj.output !== undefined

// if (isOperation(component)) {
//     const operation : Operation = component as Operation
//     console.log(operation.output.name)
//     console.log(operation.steps)
//     console.log(operation.components)
// } else {
//     const ingredient : Ingredient = component as Ingredient
//     console.log(ingredient.name)
// }


console.log("========")

const graphGenerator = new RMLGraphGenerator(cabbagePancakeObject)
graphGenerator.extractGraph()

console.log(graphGenerator.nodes)
console.log(graphGenerator.links)

console.log("========")

console.log("writing to db")
const db = new Database();
console.log(`existing recipes: ${JSON.stringify(await db.getAllRecipeNames())}`)
console.log(`inserting ${cabbagePancakeObject.name}`)
db.addRecipe(cabbagePancakeObject.name, JSON.stringify(cabbagePancakeObject)).catch((err) => console.error(err))
console.log(`existing recipes: ${JSON.stringify(await db.getAllRecipes())}`)
