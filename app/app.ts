import { Recipe } from './RecipeMarkupLanguage.js'
import { RMLGraphGenerator } from './RMLGraphGenerator.js'

console.log("here 0")

function visualizeRecipe() {
    // Get input Recipe Markup
    const rmlInput = (document.getElementById('rmlInput') as HTMLInputElement).value;
    
    // Deserialize from Recipe Markup JSON to Objects
    // TODO: make a more robust deserializer and input validation
    const recipe : Recipe = JSON.parse(rmlInput) as Recipe

    const rmlOutput = document.getElementById("rmlOutput");
    if (rmlOutput) {
        rmlOutput.textContent = JSON.stringify(recipe, null, 2)
    }

    console.log("here 1")

    const graphGenerator = new RMLGraphGenerator(recipe)
    graphGenerator.extractLinks()

    const rmlLinks = document.getElementById("rmlLinks")
    if (rmlLinks) {
        console.log("here 2")
        rmlLinks.textContent = JSON.stringify(graphGenerator.links, null, 2)
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

const visualizeButton = document.getElementById('visualizeButton')
if (visualizeButton) {
    visualizeButton.addEventListener('click', visualizeRecipe);
}

const toggleRMLButton = document.getElementById('toggleRMLButton')
if (toggleRMLButton) {
    toggleRMLButton.addEventListener('click', toggleRMLTextVisiblity);
}

const toggleLinksButton = document.getElementById('toggleLinksButton')
if (toggleLinksButton) {
    toggleLinksButton.addEventListener('click', toggleLinksTextVisiblity);
}

console.log("here 1")
