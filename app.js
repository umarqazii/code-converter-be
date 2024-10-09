const express = require('express');
const dotenv = require('dotenv');
const codeConverterRoutes = require('./routes/codeConverterRoutes');
const cors = require('cors'); // Import cors

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express(); // <--- Move this above the use of middleware

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use code conversion routes
app.use('/', codeConverterRoutes);


// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
