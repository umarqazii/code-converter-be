const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load API key from .env

const CodeConverter = require('../models/codeConverterModel');

// Initialize GoogleGenerativeAI client with the API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to clean the converted code
const cleanConvertedCode = (convertedCode) => {
    // Use a regex to remove ```language and trailing ```
    return convertedCode
        .replace(/```[\s\S]*?\n/, '')  // Remove the opening ``` with language
        .replace(/```$/, '')            // Remove the closing ```
        .trim();                        // Remove any extra newlines or spaces
};

// Function to handle the conversion request
exports.convertCode = async (req, res) => {
    const { code, fromLanguage, toLanguage } = req.body;

    // Create a new instance of the model
    const codeConverter = new CodeConverter(code, fromLanguage, toLanguage);

    try {
        // Construct the prompt to send to Gemini API
        const prompt = `Convert the following code from ${codeConverter.fromLanguage} to ${codeConverter.toLanguage}: \n\n${codeConverter.code} \n Provide only the code, No explaination.`;

        // Send the prompt as an array to generateContent
        const result = await model.generateContent([prompt]);  // Pass the prompt as an array
        
        // Log the full response to inspect the structure
        console.log("Full API Response:", result.response.text());

        // Extract converted code from the response
        let convertedCode = result.response.text();

        // Clean the converted code by removing backticks and other unnecessary text
        convertedCode = cleanConvertedCode(convertedCode);

        // Send the cleaned converted code as the response
        return res.status(200).json({
            success: true,
            convertedCode: convertedCode,
        });
    } catch (error) {
        console.error('Error converting code:', error);
        return res.status(500).json({
            success: false,
            message: 'Error converting code',
            error: error.message,
        });
    }
};
