import { Recipe, Ingredient, Component, Operation } from "./RecipeMarkupLanguage.js"
import { normalizeToGrams, normalizeToGramsByName } from "./TypeConversion.js"

export interface Node {
    name: string;
    value: number;
    label: string;
}

export interface Link {
    source: string;
    target: string;
    value: number;
    label: string;
}

const isOperation = (obj: any): boolean => obj.output !== undefined

function getIngredientWeight(ingredient : Ingredient) : number {
    if (ingredient.qty && ingredient.unit) {
        return normalizeToGrams(ingredient.qty, ingredient.unit)
    } else {
        const qty = ingredient.qty ? ingredient.qty : 1;
        return normalizeToGramsByName(ingredient.name) * qty;
    }
}

export class RMLGraphGenerator {
    recipe: Recipe
    nodes: Map<String, Node>
    links: Link[]

    constructor(recipe: Recipe) {
        this.recipe = recipe;
        this.nodes = new Map<String, Node>()
        this.links = []
    }

    extractGraph() {
        const component = this.recipe.component

        if (isOperation(component)) {
            const operation : Operation = component as Operation
            this.extractGraphFromOperation(operation)
            this._computeNodeWeights(operation);
            this._computeLinkWeights();
        } else {
            const ingredient = component as Ingredient
            this.nodes.set(ingredient.name, { name : ingredient.name, value : getIngredientWeight(ingredient), label : '' })
        }
    }

    extractGraphFromOperation(operation: Operation) {
        const instructions: string[] = operation.steps.map(step => step.time !== undefined ?
            `  - ${step.instruction} for ${step.time?.duration} ${step.time?.timeUnit}` : `  - ${step.instruction}`)
        
        let target = this.getNode(operation.output.name)
        target.label = `${instructions.join('\n')}`

        for (const component of operation.components as Component[]) {
            if (isOperation(component)) {
                const subOp : Operation = component as Operation
                this.links.push({ source: subOp.output.name, target: operation.output.name, value: 0, label: '' })
                this.extractGraphFromOperation(subOp)
            } else {
                const ingredient : Ingredient = component as Ingredient
                this.links.push({ source: ingredient.name, target: operation.output.name, value: 0, label: '' })
                const node = this.getNode(ingredient.name)
                node.value += getIngredientWeight(ingredient)
            }
        }
    }

    _computeNodeWeights(component : Component) : number {
        if (isOperation(component)) {
            const op = component as Operation
            const node = this.getNode(op.output.name)
            for (const subComp of op.components as Component[]) {
                node.value += this._computeNodeWeights(subComp)
            }
            return node.value
        } else {
            const ingredient : Ingredient = component as Ingredient
            return this.getNode(ingredient.name).value
        }
    }

    _computeLinkWeights() {
        for (const link of this.links as Link[]) {
            link.value = this.getNode(link.source).value
        }
    }

    getNode(name: string): Node {
        let node = this.nodes.get(name);
        if (node === undefined) {
            node = { name, value : 0, label : '' };
            this.nodes.set(name, node);
        }
        return node;
    }
}


