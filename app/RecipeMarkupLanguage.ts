

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
    qty: number
    unit: Ingredient_Unit

    constructor(name: string, qty: number, unit: Ingredient_Unit) {
        this.name = name
        this.qty = qty
        this.unit = unit
    }    
}

export class Operation extends Ingredient{
    instruction: string
    time: Time
    ingredients : Ingredient[]

    constructor(output_name: string, qty: number, unit: Ingredient_Unit, instruction: string, time: Time, ingredients: Ingredient[]) {
        super(output_name, qty, unit)
        this.instruction = instruction
        this.time = time
        this.ingredients = ingredients
    }
}

export class Time {
    duration : number
    time_unit: Time_Unit

    constructor(duration: number, time_unit: Time_Unit) {
        this.duration = duration
        this.time_unit = time_unit
    }
}

export enum Time_Unit {
    seconds,
    minutes,
    hours,
    days
}

export enum Ingredient_Unit {
    ml,
    g,
    tsp,
    tbsp,
    cup,
    unit
}

