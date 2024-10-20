// Import necessary modules
const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

// Controller function to handle message submission
const createMessage = (req, res) => {
  const { name, email, message } = req.body;

  // Validate the input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Define the message data
  const newMessage = { name, email, message };

  // Define the CSV file path for messages
  const csvFilePath = path.join(__dirname, '../data/messages.csv');

  // Check if the CSV file exists
  const csvExists = fs.existsSync(csvFilePath);

  // If the CSV file doesn't exist, create headers
  const fields = ['name', 'email', 'message'];
  const opts = { fields, header: !csvExists };

  try {
    // Convert message data to CSV format
    const csv = parse(newMessage, opts);

    // Append the CSV data to the file
    fs.appendFileSync(csvFilePath, csv + '\n', 'utf8');

    // Print the message data to the console
    console.log('New Message:', newMessage);

    // Send back a success response
    return res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error saving message to CSV:', error.message);
    console.error(error.stack);
    return res.status(500).json({
      error: 'Failed to save message',
    });
  }
};

// Export the function
module.exports = {
  createMessage,
};
