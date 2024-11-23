import { Recipe, Ingredient, Operation, Component } from './RecipeMarkupLanguage.js'
import { RMLGraphGenerator } from './RMLGraphGenerator.js'

console.log("================")

const cabbagePancakeJson = '{"name":"Cabbage Pancake","component":{"output":{"name":"Cabbage Pancake","qty":8.5},"steps":[{"instruction":"cook","time":{"duration":6,"timeUnit":"minutes"}},{"instruction":"flip"},{"instruction":"cook","time":{"duration":3,"timeUnit":"minutes"}}],"components":[{"output":{"name":"Cabbage Pancake Batter","qty":7.5},"steps":[{"instruction":"mix together"}],"components":[{"output":{"name":"Cabbage Pancake Pre-Mix","qty":7},"steps":[{"instruction":"mix"},{"instruction":"wait","time":{"duration":10,"timeUnit":"minutes"}}],"components":[{"output":{"name":"Sliced Cabbage"},"steps":[{"instruction":"slice"}],"components":[{"name":"Cabbage"}]},{"output":{"name":"Sliced Onion"},"steps":[{"instruction":"slice"}],"components":[{"name":"Onion"}]},{"output":{"name":"Cut Chives"},"steps":[{"instruction":"chop to 4 in pieces"}],"components":[{"name":"Chives"}]},{"output":{"name":"Diced Shrimp"},"steps":[{"instruction":"dice to 1cm chunks"}],"components":[{"name":"Shrimp"}]},{"name":"Egg","qty":1},{"name":"Soy Sauce"},{"name":"Black Pepper"}]},{"name":"Flour","qty":0.5,"unit":"cup"}]},{"output":{"name":"Heated Oil"},"steps":[{"instruction":"heat in pan"}],"components":[{"name":"Vegetable Oil"}]}]}}'
const cabbagePancakeObject: Recipe = JSON.parse(cabbagePancakeJson) as Recipe

console.log(cabbagePancakeObject.name)
console.log(cabbagePancakeObject.component)

const component : Component = cabbagePancakeObject.component as Component

console.log(typeof component)

const isOperation = (obj: any): boolean => obj.output !== undefined

if (isOperation(component)) {
    const operation : Operation = component as Operation
    console.log(operation.output.name)
    console.log(operation.steps)
    console.log(operation.components)
} else {
    const ingredient : Ingredient = component as Ingredient
    console.log(ingredient.name)
}


console.log("========")

const graphGenerator = new RMLGraphGenerator(cabbagePancakeObject)
graphGenerator.extractLinks()

console.log(graphGenerator.recipeSteps)

console.log("========")
