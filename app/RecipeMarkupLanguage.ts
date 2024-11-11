

export class Recipe {
    name: string
    ingredient: Ingredient

    constructor(name: string, ingredient: Ingredient) {
        this.name = name
        this.ingredient = ingredient
    }
}

export class Ingredient {
    name: string
    qty?: number
    unit?: Ingredient_Unit

    constructor(name: string, qty?: number, unit?: Ingredient_Unit) {
        this.name = name
        this.qty = qty
        this.unit = unit
    }
}

export class Operation extends Ingredient {
    steps: Step[]
    ingredients: Ingredient[]

    constructor(output_name: string, steps: Step[], ingredients: Ingredient[]) {
        super(output_name, 1, undefined)
        this.steps = steps
        this.ingredients = ingredients
    }
}

export class Step {
    instruction: string
    time?: Time

    constructor(instruction: string, time?: Time) {
        this.instruction = instruction
        this.time = time
    }
}

export class Time {
    duration: number
    time_unit: Time_Unit

    constructor(duration: number, time_unit: Time_Unit) {
        this.duration = duration
        this.time_unit = time_unit
    }
}

export enum Time_Unit {
    SECONDS = "seconds",
    MINUTES = "minutes",
    HOURS = "hours",
    DAYS = "days"
}

export enum Ingredient_Unit {
    ML = "ml",
    G = "g",
    OZ = "oz",
    TSP = "tsp",
    TBSP = "tbsp",
    CUP = "cup"
}
