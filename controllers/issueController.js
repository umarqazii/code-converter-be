// Import necessary modules
const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

// Controller function to handle issue report creation
const createIssueReport = (req, res) => {
  const { name, email, issue } = req.body;

  // Validate the input
  if (!name || !email || !issue) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Define the issue report data
  const newIssue = { name, email, issue };

  // Define the CSV file path for issue reports
  const csvFilePath = path.join(__dirname, '../data/issues.csv');

  // Check if the CSV file exists
  const csvExists = fs.existsSync(csvFilePath);

  // If the CSV file doesn't exist, create headers
  const fields = ['name', 'email', 'issue'];
  const opts = { fields, header: !csvExists };

  try {
    // Convert issue report data to CSV format
    const csv = parse(newIssue, opts);

    // Append the CSV data to the file
    fs.appendFileSync(csvFilePath, csv + '\n', 'utf8');

    // Print the issue report data to the console
    console.log('New Issue Report:', newIssue);

    // Send back a success response
    return res.status(201).json({
      message: 'Issue reported successfully',
      data: newIssue,
    });
  } catch (error) {
    console.error('Error saving issue report to CSV:', error.message);
    console.error(error.stack);
    return res.status(500).json({
      error: 'Failed to save issue report',
    });
  }
};

// Export the function
module.exports = {
  createIssueReport,
};
