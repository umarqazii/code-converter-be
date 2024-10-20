const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

// Controller function to handle suggestion creation
const createSuggestion = (req, res) => {
  const { name, email, suggestion } = req.body;

  if (!name || !email || !suggestion) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Define the suggestion data
  const newSuggestion = { name, email, suggestion };

  // Define the CSV file path
  const csvFilePath = path.join(__dirname, '../data/suggestions.csv');

  // Check if the CSV file exists
  const csvExists = fs.existsSync(csvFilePath);

  // If the CSV file doesn't exist, create headers
  const fields = ['name', 'email', 'suggestion'];
  const opts = { fields, header: !csvExists };

  try {
    // Convert suggestion data to CSV format
    const csv = parse(newSuggestion, opts);

    // Append the CSV data to the file
    fs.appendFileSync(csvFilePath, csv + '\n', 'utf8');

    // Print the suggestion data to the console
    console.log('New Suggestion:', newSuggestion);

    // Send back a success response
    return res.status(201).json({
      message: 'Suggestion submitted successfully',
      data: newSuggestion,
    });
  } catch (error) {
    console.error('Error saving suggestion to CSV:', error);
    return res.status(500).json({
      error: 'Failed to save suggestion',
    });
  }
};

module.exports = {
  createSuggestion,
};
