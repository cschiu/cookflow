import { Recipe } from './RecipeMarkupLanguage.js'
import { RMLGraphGenerator } from './RMLGraphGenerator.js'
import { SankeyDiagram, SankeyData } from './Sankey.js'
// import { Database } from './Database.js';


// const db = new Database('app/cookflow.db')

const recipes : Map<string, Recipe> = new Map();
recipes.set('Cabbage Pancake', JSON.parse('{"name":"Cabbage Pancake","component":{"output":{"name":"Cabbage Pancake"},"steps":[{"instruction":"cook","time":{"duration":6,"timeUnit":"minutes"}},{"instruction":"flip"},{"instruction":"cook","time":{"duration":3,"timeUnit":"minutes"}}],"components":[{"output":{"name":"Cabbage Pancake Batter"},"steps":[{"instruction":"mix together"}],"components":[{"output":{"name":"Cabbage Pancake Pre-Mix"},"steps":[{"instruction":"mix"},{"instruction":"wait","time":{"duration":10,"timeUnit":"minutes"}}],"components":[{"output":{"name":"Sliced Cabbage"},"steps":[{"instruction":"slice"}],"components":[{"name":"Cabbage","qty":0.5}]},{"output":{"name":"Sliced Onion"},"steps":[{"instruction":"slice"}],"components":[{"name":"Onion"}]},{"output":{"name":"Cut Chives"},"steps":[{"instruction":"chop to 4 in pieces"}],"components":[{"name":"Chives"}]},{"output":{"name":"Diced Shrimp"},"steps":[{"instruction":"dice to 1cm chunks"}],"components":[{"name":"Shrimp","qty":100,"unit":"g"}]},{"name":"Egg","qty":1},{"name":"Soy Sauce","qty":1,"unit":"tbsp"},{"name":"Black Pepper","qty":1,"unit":"tsp"}]},{"name":"Flour","qty":0.5,"unit":"cup"}]},{"output":{"name":"Heated Oil"},"steps":[{"instruction":"heat in pan"}],"components":[{"name":"Vegetable Oil","qty":2,"unit":"tbsp"}]}]}}') as Recipe)
recipes.set('Simple Cake', JSON.parse('{"name":"Simple Cake","component":{"output":{"name":"Simple Cake"},"steps":[{"instruction":"Pour into 12x12 cake pan"},{"instruction":"Bake in a preheated oven at 350°F.","time":{"duration":20,"timeUnit":"minutes"}}],"components":[{"output":{"name":"Cake Batter"},"steps":[{"instruction":"mix together"}],"components":[{"output":{"name":"Dry Ingredients"},"steps":[{"instruction":"sift together"}],"components":[{"name":"Flour","qty":2,"unit":"cup"},{"name":"Sugar","qty":1,"unit":"cup"},{"name":"Baking Powder","qty":1,"unit":"tbsp"}]},{"name":"Milk","qty":0.5,"unit":"cup"},{"name":"Egg","qty":2},{"output":{"name":"Melted butter"},"steps":[{"instruction":"melt"}],"components":[{"name":"Butter","qty":4,"unit":"tbsp"}]}]}]}}') as Recipe)

// Function to populate the dropdown
function populateRecipeDropdown() {
    const select = document.getElementById('recipeSelect');
    // Clear existing options except the first one
    if (select) {
        select.innerHTML = '<option value="">Select a recipe...</option>';

        // const recipesPromise = db.getAllRecipes()
    
        // // Add new options
        // recipesPromise.then(recipes => recipes.forEach(recipe => {
        //     const option = document.createElement('option');
        //     option.value = recipe.name; // or whatever unique identifier you have
        //     option.textContent = recipe.name; // or whatever property you want to display
        //     select.appendChild(option);
        // }));
    
        // Add new options
        recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.value = recipe.name; // or whatever unique identifier you have
            option.textContent = recipe.name; // or whatever property you want to display
            select.appendChild(option);
        });
    }
}

// Function to handle recipe loading
function loadSelectedRecipe() {
    const select = (document.getElementById('recipeSelect') as HTMLSelectElement).value;
    // db.getRecipe(select).then(row => {
    //     if (row) {
    //         const recipe : Recipe = JSON.parse(row.rml) as Recipe
    //         visualizeRecipe(recipe)
    //     } else {
    //         console.error(`recipe not found: ${select}`)
    //     }
    // });
    const recipe = recipes.get(select)
    if (recipe) {
        visualizeRecipe(recipe)
    } else {
        console.error(`recipe not found: ${select}`)
    }
}

function visualizeRecipeFromInput() {
    // Get input Recipe Markup
    const rmlInput = (document.getElementById('rmlInput') as HTMLInputElement).value;
    
    // Deserialize from Recipe Markup JSON to Objects
    // TODO: make a more robust deserializer and input validation
    const recipe : Recipe = JSON.parse(rmlInput) as Recipe

    visualizeRecipe(recipe)
}

function visualizeRecipe(recipe : Recipe) {

    const rmlOutput = document.getElementById("rmlOutput");
    if (rmlOutput) {
        rmlOutput.textContent = JSON.stringify(recipe, null, 2)
    }

    const graphGenerator = new RMLGraphGenerator(recipe)
    graphGenerator.extractGraph()

    const rmlLinks = document.getElementById("rmlLinks")
    if (rmlLinks) {
        rmlLinks.textContent = JSON.stringify(graphGenerator.links, null, 2)
    }

    const sankeyData: SankeyData = {
        nodes: [...graphGenerator.nodes.values()],
        links: graphGenerator.links
    };

    generateSankey(sankeyData)
}

function generateSankey(sankeyData: SankeyData) {
    console.log(sankeyData)
    const chart = document.getElementById('chart')
    if (chart) {
        const diagram = new SankeyDiagram('#chart', 800, 600)
        diagram.render(sankeyData)
    }
}

function toggleRMLTextVisiblity() {
    const toggleRMLButton = document.getElementById("toggleRMLButton");
    const rmlOutput = document.getElementById("rmlOutput");

    if (toggleRMLButton && rmlOutput) {
        // Toggle the display style
        if (rmlOutput.style.display === "none") {
            rmlOutput.style.display = "block";
            toggleRMLButton.textContent = "Hide Recipe Markup";
        } else {
            rmlOutput.style.display = "none";
            toggleRMLButton.textContent = "Show Recipe Markup";
        }
    }
}

function toggleLinksTextVisiblity() {
    const toggleLinksButton = document.getElementById("toggleLinksButton");
    const rmlLinks = document.getElementById("rmlLinks");

    if (toggleLinksButton && rmlLinks) {
        // Toggle the display style
        if (rmlLinks.style.display === "none") {
            rmlLinks.style.display = "block";
            toggleLinksButton.textContent = "Hide Links";
        } else {
            rmlLinks.style.display = "none";
            toggleLinksButton.textContent = "Show Links";
        }
    }
}


populateRecipeDropdown()
const loadButton = document.getElementById('loadRecipeButton')
if (loadButton) {
    loadButton.addEventListener('click', loadSelectedRecipe);
}

const visualizeButton = document.getElementById('visualizeButton')
if (visualizeButton) {
    visualizeButton.addEventListener('click', visualizeRecipeFromInput);
}

const toggleRMLButton = document.getElementById('toggleRMLButton')
if (toggleRMLButton) {
    toggleRMLButton.addEventListener('click', toggleRMLTextVisiblity);
}

const toggleLinksButton = document.getElementById('toggleLinksButton')
if (toggleLinksButton) {
    toggleLinksButton.addEventListener('click', toggleLinksTextVisiblity);
}
