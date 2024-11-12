
export type Recipe = {
    name: string
    component: Component
}

export type Component = Ingredient | Operation

export type Ingredient = {
    name: string
    qty?: number
    unit?: IngredientUnit
}

export type Operation = {
    output: Ingredient
    steps: Step[]
    components: Component[]
}

export type Step  = {
    instruction: string
    time?: Time
}

export type Time = {
    duration: number
    timeUnit: TimeUnit
}

export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days'

export type IngredientUnit = 'ml' | 'g' | 'oz' | 'tbsp' | 'tsp' | 'cup' | 'pt' | 'qt'
