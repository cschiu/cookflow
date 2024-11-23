import { IngredientUnit } from "./RecipeMarkupLanguage"

// Conversion factors
const conversionFactors: Record<IngredientUnit, number> = {
    ml: 1,             // 1 ml = 1 gram (density of water)
    g: 1,              // 1 g = 1 gram
    oz: 28.3495,       // 1 oz = 28.3495 grams
    tbsp: 15,          // 1 tablespoon = 15 grams (water-based)
    tsp: 5,            // 1 teaspoon = 5 grams (water-based)
    cup: 240,          // 1 cup = 240 grams (water-based)
    pt: 473.176,       // 1 pint = 473.176 grams (water-based)
    qt: 946.353,       // 1 quart = 946.353 grams (water-based)
};

// Grams per unit for common ingredients
const ingredientWeights: Record<string, number> = {
    egg: 100,             // Average weight of a large egg
    banana: 120,          // Average weight of a medium banana
    apple: 200,           // Average weight of a medium apple
    flour: 120,           // 1 cup of flour in grams
    sugar: 200,           // 1 cup of sugar in grams
    butter: 227,          // 1 cup of butter in grams
    cabbage: 900,         // Average weight of a medium cabbage
    onion: 150,           // Average weight of a medium onion
    chives: 15,           // Average weight of 1 bunch of chives
};

/**
 * Convert a given quantity and unit to grams.
 * 
 * @param quantity - The amount to be converted.
 * @param unit - The unit of the amount (e.g., 'ml', 'oz', etc.).
 * @returns The equivalent amount in grams.
 */
export function convertToGrams(quantity: number, unit: IngredientUnit): number {
    const factor = conversionFactors[unit];
    if (factor === undefined) {
        throw new Error(`Unsupported unit: ${unit}`);
    }
    return quantity * factor;
}

/**
 * Normalize a given quantity and unit to grams.
 * Handles unsupported cases with a default density of water.
 * 
 * @param quantity - The amount to be normalized.
 * @param unit - The unit of the amount (e.g., 'ml', 'oz', etc.).
 * @param density - Optional density in grams per ml for specific ingredients.
 * @returns The equivalent amount in grams.
 */
export function normalizeToGrams(quantity: number, unit: IngredientUnit, density: number = 1): number {
    if (unit === 'ml') {
        return quantity * density;
    }
    if (unit in conversionFactors) {
        return convertToGrams(quantity, unit);
    }
    throw new Error(`Unsupported unit for normalization: ${unit}`);
}

/**
 * Normalize a common ingredient name to its weight in grams.
 * 
 * @param name - The name of the ingredient (e.g., 'egg', 'banana', etc.).
 * @returns The weight in grams for the ingredient.
 */
export function normalizeToGramsByName(name: string): number {
    const normalizedName = name.toLowerCase();
    const weight = ingredientWeights[normalizedName];
    if (weight === undefined) {
      throw new Error(`Unsupported ingredient: ${name}`);
    }
    return weight;
  }