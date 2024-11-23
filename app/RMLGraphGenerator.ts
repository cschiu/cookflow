import { Recipe, Ingredient, Component, Operation } from "./RecipeMarkupLanguage"

const isOperation = (obj: any): boolean => obj.output !== undefined

export interface Node {
    name: string;
}

export interface Link {
    source: string;
    target: string;
    value: number;
    label?: string[];
}

export class RMLGraphGenerator {
    recipeSteps: RecipeStep[] = []
    recipe: Recipe

    constructor(recipe: Recipe) {
        this.recipe = recipe
    }

    extractLinks() {
        const component = this.recipe.component

        if (isOperation(component)) {
            const operation : Operation = component as Operation
            this.extractLinksFromOperation(operation)
        }
    }

    extractLinksFromOperation(operation: Operation) {
        const instructions: string[] = operation.steps.map(step => step.time !== undefined ?
            `${step.instruction} for ${step.time?.duration} ${step.time?.timeUnit}` : `${step.instruction}`)
        
        for (const component of operation.components as Component[]) {
            if (isOperation(component)) {
                const subOp : Operation = component as Operation
                this.recipeSteps.push(new RecipeStep(subOp.output.name, operation.output.name, subOp.output.qty,  subOp.output.unit, instructions))
                this.extractLinksFromOperation(subOp)
            } else {
                const ingredient : Ingredient = component as Ingredient
                this.recipeSteps.push(new RecipeStep(ingredient.name, operation.output.name, ingredient.qty, ingredient.unit, instructions))
            }
        }
    }

    getNodes(): Node[] {
        const nodeSet : Set<string> = new Set<string>()
        for (const step of this.recipeSteps as RecipeStep[]) {
            nodeSet.add(step.source)
            nodeSet.add(step.target)
        }
        return Array.from(nodeSet, (str) => ({ name : str }))
    }

    getLinks(): Link[] {
        const links: Link[] = []
        for (const step of this.recipeSteps as RecipeStep[]) {
            links.push({
                            source : step.source,
                            target : step.target,
                            value  : step.generateLinkWeight(),
                            label : step.instructions
                        })
        }
        return links
    }
}

class RecipeStep {
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