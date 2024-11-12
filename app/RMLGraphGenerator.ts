import { Recipe, Ingredient, Component, Operation, Time, TimeUnit, IngredientUnit, Step} from "./RecipeMarkupLanguage"

const isOperation = (obj: any): boolean => obj.output !== undefined

export class RMLGraphGenerator {
    links: Link[] = []
    recipe: Recipe

    constructor(recipe: Recipe) {
        this.recipe = recipe
    }

    extractLinks() {
        const component = this.recipe.component

        if (isOperation(component)) {
            const operation : Operation = component as Operation
            this.extractLinksFromOperation(operation)
        } else {
            const ingredient : Ingredient = component as Ingredient
            // this.links.push(new Link(ingredient.name, ingredient.name, ingredient.qty, ingredient.unit))
            console.log(ingredient.name)
        }
    }

    extractLinksFromOperation(operation: Operation) {
        const instructions: string[] = operation.steps.map(step => step.time !== undefined ?
            `${step.instruction} for ${step.time?.duration} ${step.time?.timeUnit}` : `${step.instruction}`)
        
        for (const component of operation.components as Component[]) {
            if (isOperation(component)) {
                const subOp : Operation = component as Operation
                this.links.push(new Link(subOp.output.name, operation.output.name, undefined, undefined, instructions))
                console.log(`operation: ${operation.output.name}`)
                this.extractLinksFromOperation(subOp)
            } else {
                const ingredient : Ingredient = component as Ingredient
                this.links.push(new Link(ingredient.name, operation.output.name, ingredient.qty, ingredient.unit, instructions))
                console.log(`ingredient: ${ingredient.name}`)
            }
        }
    }


}

class Link {
    source: string
    target: string
    qty?: number
    unit?: string
    instructions?: string[]

    constructor(source: string, target: string, qty?: number, unit?: string, instructions?: string[]){
        this.source = source
        this.target = target
        this.qty = qty
        this.unit = unit
        this.instructions = instructions
    }

    // TODO: come up with better logic to handle converting qty and units to link weights
    generateLinkWeight(): number {
        return this.qty != null ? this.qty : 1
    }
}