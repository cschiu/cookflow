import http from "http";
import url from "url";
import { IngredientColorLookup } from "./IngredientColorLookup"; // Import the service

// Get the singleton instance of the color lookup service
const colorLookup = IngredientColorLookup.getInstance();

// HTML content with a simple UI
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ingredient Color Lookup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
            transition: background-color 0.5s ease;
        }
        form {
            margin-bottom: 20px;
        }
        input, button {
            padding: 10px;
            font-size: 16px;
        }
        p {
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Ingredient Color Lookup</h1>
    <form id="lookupForm">
        <label for="ingredient">Enter an ingredient:</label>
        <input type="text" id="ingredient" name="ingredient" required>
        <button type="submit">Submit</button>
    </form>
    <p id="result"></p>

    <script>
        const form = document.getElementById('lookupForm');
        const result = document.getElementById('result');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const ingredient = document.getElementById('ingredient').value;
            const response = await fetch(\`/lookup?ingredient=\${encodeURIComponent(ingredient)}\`);
            const color = await response.text();
            
            // Update result text
            result.textContent = \`The color of \${ingredient} is: \${color}\`;
            
            // Change background color
            document.body.style.backgroundColor = color;
        });
    </script>
</body>
</html>
`;

// Server setup
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url || "", true);
    const pathname = parsedUrl.pathname;

    if (pathname === "/") {
        // Serve the HTML page
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    } else if (pathname === "/lookup" && parsedUrl.query.ingredient) {
        // Process the ingredient lookup
        const ingredient = parsedUrl.query.ingredient as string;

        try {
            // Use the service to fetch the color (await the async call)
            const color = await colorLookup.getIngredientColor(ingredient);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(color);
        } catch (error) {
            // Handle any errors from the service
            console.error("Error fetching color:", error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error fetching color");
        }
    } else {
        // Handle 404
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
