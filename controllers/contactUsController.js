const nodemailer = require('nodemailer');
const axios = require('axios');
const dotenv = require('dotenv').config();

// Controller function to handle message submission
const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    console.log(email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'umarqazii983@gmail.com',
        pass: process.env.gmail_pass,  // Ensure you have this variable in your .env file
      },
    });

    const Message = `Suggestion submitted by: ${name}\n\nEmail of user: ${email}\n\nSuggestion: ${message}`;

    const mailOptions = {
      from: 'umarqazii983@gmail.com',
      to: 'i200968@nu.edu.pk',
      subject: 'Code Converter Contact Us',
      text: Message,
    };

    const info = await transporter.sendMail(mailOptions);  // await here requires async function

    res.status(200).json({
      message: 'Email sent successfully!',
      info: info.response,
    });
  } catch (err) {
    console.error('Error sending email:', err);

    res.status(500).json({
      message: 'Failed to send email',
      error: err.message,
    });
  }
};

// Export the function
module.exports = {
  createMessage,
};
