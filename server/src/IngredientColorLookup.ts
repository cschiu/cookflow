import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { OpenAI } from 'openai';


// Type definitions
type ColorCache = {
  [key: string]: string;
};

// Constants
const CACHE_FILE_PATH = path.join(__dirname, 'ingredientColors.json');
const DEFAULT_COLOR = '#CCCCCC';

export class IngredientColorLookup {
  private static instance: IngredientColorLookup;
  private colorCache: ColorCache;
  private openai: OpenAI;

  // Initialize with some common ingredient colors
  private readonly defaultColors: ColorCache = {
    'flour': '#F5F5F5',
    'sugar': '#FFFFFF',
    'butter': '#FFF4CC',
    'milk': '#FFFFFF',
    'egg': '#FFF5E1',
    'vanilla extract': '#8B4513',
    'chocolate': '#3B1C11',
    'cinnamon': '#8B4513',
    'salt': '#FFFFFF',
    'water': '#E6F3FF',
  };

  private constructor() {
    this.colorCache = this.loadCache();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  public static getInstance(): IngredientColorLookup {
    if (!IngredientColorLookup.instance) {
      IngredientColorLookup.instance = new IngredientColorLookup();
    }
    return IngredientColorLookup.instance;
  }

  /**
   * Get color for an ingredient, using cache if available or determining new color if needed
   */
  public async getIngredientColor(ingredient: string): Promise<string> {
    const normalizedIngredient = this.normalizeIngredientName(ingredient);

    // Check cache first
    const cachedColor = this.getCachedColor(normalizedIngredient);
    if (cachedColor) {
      return cachedColor;
    }

    try {
      // If not in cache, determine color using LLM
      const color = await this.determineIngredientColor([normalizedIngredient]);
      console.log(`saving mapping for ${color[0].ingredient} to ${color[0].color}`)
      this.saveToCache(normalizedIngredient, color[0].color);
      return color[0].color;
    } catch (error) {
      console.error(`Error determining color for ${ingredient}:`, error);
      return DEFAULT_COLOR;
    }
  }

  /**
   * Load cache from file or initialize with default values
   */
  private loadCache(): ColorCache {
    try {
      const fileContent = readFileSync(CACHE_FILE_PATH, 'utf-8');
      const loadedCache = JSON.parse(fileContent) as ColorCache;
      return { ...this.defaultColors, ...loadedCache };
    } catch (error) {
      console.log('No existing cache found, initializing with default values');
      return { ...this.defaultColors };
    }
  }

  /**
   * Save current cache to file
   */
  private saveCache(): void {
    try {
      writeFileSync(CACHE_FILE_PATH, JSON.stringify(this.colorCache, null, 2));
    } catch (error) {
      console.error('Error saving cache:', error);
    }
  }

  /**
   * Get color from cache if available
   */
  private getCachedColor(ingredient: string): string | null {
    return this.colorCache[ingredient] || null;
  }

  /**
   * Save new color to cache and persist
   */
  private saveToCache(ingredient: string, color: string): void {
    this.colorCache[ingredient] = color;
    this.saveCache();
  }

  /**
   * Normalize ingredient name for consistent lookup
   */
  private normalizeIngredientName(ingredient: string): string {
    return ingredient.toLowerCase().trim();
  }

  /**
   * Validate hex color code
   */
  private validateHexColor(color: string): boolean {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    return hexColorRegex.test(color);
  }

  private async determineIngredientColor(ingredients: string[]): Promise<{ ingredient: string, color: string }[]> {
    console.log(`invoking LLM to determine color for ingredient: ${ingredients}`)
    const prompt = `
    Generate a list of ingredient names and determine an appropriate representative color in the form of a hex code. Pair each ingredient with its corresponding hex code.
    
    - Ensure the color selection closely correlates with the ingredient's real-world color or common representation.
    - Choose colors that are simple and intuitive associations with the given ingredient (e.g., "Tomato" might be \`#FF6347\` for a tomato-red shade).
    - If the ingredient has multiple natural colors (e.g., "apple"), consider selecting the most commonly represented color variant.
    
    # Steps
    1. **Identify Ingredient Color**: For each ingredient, consider its natural visual color.
    2. **Select Hex Code Representation**: Translate that visual aspect into a color hex code that best matches its typical appearance.
    3. **Pair the Ingredient with the Hex Code**: Format the pairing as \`[ingredient]: [hex code]\`.
    
    # Output Format
    You must return a JSON object in the following format, do not wrap it in markdown code tags:

    {
      "name": "ingredient_color_pairing",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "pairings": {
            "type": "array",
            "description": "A list of ingredients paired with their corresponding hex color codes.",
            "items": {
              "type": "object",
              "properties": {
                "ingredient": {
                  "type": "string",
                  "description": "The name of the ingredient."
                },
                "color": {
                  "type": "string",
                  "description": "The hex color code representing the ingredient."
                }
              },
              "required": [
                "ingredient",
                "color"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "pairings"
        ],
        "additionalProperties": false
      }
    }

    
    Your response should look like this:

    {
      "pairings": [
        {
          "ingredient": "tomato",
          "color": "#FF6347"
        },
        {
          "ingredient": "broccoli",
          "color": "#228B22"
        }
      ]
    }

    `;


    try {
      // Request OpenAI completion
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // or use gpt-4 if available
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: `${ingredients.join(', ')}` }
        ]
      });
      // Null check to ensure response.choices[0] exists
      if (!response || !response.choices || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
        throw new Error('Invalid response from OpenAI');
      }

      // Parse the response into JSON format
      try {
        console.log(`LLM resopnse: ${response.choices[0].message.content.trim()}`)
        const result = JSON.parse(response.choices[0].message.content.trim());
        return result.pairings;
      } catch (error) {
        console.error('failed to parse ai response', error)
        console.error(`${response.choices[0].message.content.trim()}`)
        throw error
      }
    } catch (error) {
      console.error('Error generating ingredient colors:', error);
      throw new Error('Failed to fetch ingredient colors');
    }
  }
}
