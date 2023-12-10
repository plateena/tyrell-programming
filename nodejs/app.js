import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import formidableMiddleware from 'express-formidable';

// Get the filename and dirname using Node.js module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const port = 3000;

// Set the base URL for the external API
const API_BASE_URL = 'http://nginx';

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Use formidable middleware for handling form data
app.use(formidableMiddleware());

/**
 * @description Route for the home page.
 * @route GET /
 */
app.get('/', async (req, res) => {
    res.render('home');
});

/**
 * @description Route to deal cards to players.
 * @route ALL /dealt-cards
 * @param {number} req.fields.people - Number of players obtained from the form data.
 * @param {number} req.query.people - Number of players obtained from the query parameters.
 * @return {html|json} Rendered HTML view or JSON response based on the 'Accept' header.
 */
app.all('/dealt-cards', async (req, res) => {
    // Get the number of players from either form data or query parameters
    let numPlayers = req.fields.people ?? req.query.people;

    try {
        // Check if the input value exists and is valid
        if (!numPlayers) {
            res.status(400).json({ error: 'Input value does not exist or value is invalid' });
            return;
        }

        // Make a request to the external API to get dealt cards
        const { status, data } = await axios.get(`${API_BASE_URL}/api/card-distribution/distribute/${numPlayers}`);

        // Process the response and extract dealt cards
        const dealtCards = Object.values(data.data).map((val) => val.join(','));

        // Check the 'Accept' header to determine the response type
        const acceptHeader = req.get('Accept');

        if (acceptHeader && acceptHeader.includes('text/html')) {
            // Render the EJS template and pass the dealt cards as a variable
            res.render('deal', { cards: dealtCards });
        } else {
            // Respond with JSON if the request expects JSON
            res.json({ dealt: dealtCards });
        }
    } catch (error) {
        // Handle errors, including external API errors and internal errors
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

/**
 * @description Catch-all route for handling undefined routes.
 * @route ALL *
 */
app.use(async (req, res) => {
    try {
        // Render the 404 EJS template for undefined routes
        res.status(404).render('404');
    } catch (error) {
        // Handle internal errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * @description Start the Express server.
 */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
