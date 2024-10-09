// app.js
const express = require('express');
const dotenv = require('dotenv');
const codeConverterRoutes = require('./routes/codeConverterRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use code conversion routes
app.use('/', codeConverterRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
