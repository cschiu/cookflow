import { Recipe } from './RecipeMarkupLanguage.js'
import { RMLGraphGenerator } from './RMLGraphGenerator.js'
import { SankeyDiagram, SankeyData } from './Sankey.js'

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
