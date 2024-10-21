const nodemailer = require('nodemailer');
const axios = require('axios');
const dotenv = require('dotenv').config();

// Controller function to handle suggestion creation
const createSuggestion = async (req, res) => {  // Mark function as async
  const { name, email, suggestion } = req.body;

  if (!name || !email || !suggestion) {
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

    const Message = `Suggestion submitted by: ${name}\n\nEmail of user: ${email}\n\nSuggestion: ${suggestion}`;

    const mailOptions = {
      from: 'umarqazii983@gmail.com',
      to: 'i200968@nu.edu.pk',
      subject: 'Code Converter Suggestion',
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

module.exports = {
  createSuggestion,
};
